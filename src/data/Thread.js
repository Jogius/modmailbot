const bot = require('../bot');
const knex = require('../knex');
const utils = require('../utils');
const attachments = require('./attachments');

const {THREAD_MESSAGE_TYPE, THREAD_STATUS} = require('./constants');

/**
 * @property {String} id
 * @property {Number} status
 * @property {String} user_id
 * @property {String} user_name
 * @property {String} channel_id
 * @property {String} created_at
 * @property {Boolean} _wasCreated
 */
class Thread {
  constructor(props) {
    Object.assign(this, {_wasCreated: false}, props);
  }

  /**
   * @param {Eris.Member} moderator
   * @param {String} text
   * @param {Eris.Attachment[]} replyAttachments
   * @param {Boolean} isAnonymous
   * @returns {Promise<void>}
   */
  async replyToUser(moderator, text, replyAttachments = [], isAnonymous = false) {
    // Try to open a DM channel with the user
    const dmChannel = await bot.getDMChannel(this.user_id);
    if (! dmChannel) {
      const channel = bot.getChannel(this.channel_id);
      if (channel) {
        channel.createMessage('Could not send reply: couldn\'t open DM channel with user');
      }
      return;
    }

    // Username to reply with
    let modUsername, logModUsername;
    const mainRole = utils.getMainRole(moderator);

    if (isAnonymous) {
      modUsername = (mainRole ? mainRole.name : 'Moderator');
      logModUsername = `(Anonymous) (${moderator.user.username}) ${mainRole ? mainRole.name : 'Moderator'}`;
    } else {
      const name = (config.useNicknames ? moderator.nick || moderator.user.username : moderator.user.username);
      modUsername = (mainRole ? `(${mainRole.name}) ${name}` : name);
      logModUsername = modUsername;
    }

    // Build the reply message
    let dmContent = `**${modUsername}:** ${text}`;
    let threadContent = `**${logModUsername}:** ${text}`;
    let logContent = text;

    let attachmentFile = null;
    let attachmentUrl = null;

    // Prepare attachments, if any
    if (replyAttachments.length > 0) {
      fs.readFile(attachments.getPath(replyAttachments[0].id), async (err, data) => {
        attachmentFile = {file: data, name: replyAttachments[0].filename};
        attachmentUrl = await attachments.getUrl(replyAttachments[0].id, replyAttachments[0].filename);

        threadContent += `\n\n**Attachment:** ${attachmentUrl}`;
        logContent += `\n\n**Attachment:** ${attachmentUrl}`;
      });
    }

    // Send the reply DM
    dmChannel.createMessage(dmContent, attachmentFile);

    // Send the reply to the modmail thread
    const originalMessage = await this.postToThreadChannel(threadContent);

    // Add the message to the database
    await this.addThreadMessageToDB({
      message_type: THREAD_MESSAGE_TYPE.TO_USER,
      user_id: moderator.id,
      user_name: logModUsername,
      body: logContent,
      original_message_id: originalMessage.id
    });
  }

  /**
   * @param {Eris.Message} msg
   * @returns {Promise<void>}
   */
  async receiveUserReply(msg) {
    const timestamp = utils.getTimestamp();

    let threadContent = `[${timestamp}] « **${msg.author.username}#${msg.author.discriminator}:** ${msg.content}`;
    let logContent = msg.content;
    let finalThreadContent;
    let attachmentSavePromise;

    if (msg.attachments.length) {
      attachmentSavePromise = attachments.saveAttachmentsInMessage(msg);
      const formattedAttachments = await Promise.all(msg.attachments.map(utils.formatAttachment));
      const attachmentMsg = `\n\n` + formattedAttachments.reduce((str, formatted) => str + `\n\n${formatted}`);

      finalThreadContent = threadContent + attachmentMsg;
      threadContent += '\n\n*Attachments pending...*';
      logContent += attachmentMsg;
    }

    const createdMessage = await this.postToThreadChannel(threadContent);
    await this.addThreadMessageToDB({
      message_type: THREAD_MESSAGE_TYPE.FROM_USER,
      user_id: this.user_id,
      user_name: `${msg.author.username}#${msg.author.discriminator}`,
      body: logContent,
      original_message_id: msg.id
    });

    if (msg.attachments.length) {
      await attachmentSavePromise;
      await createdMessage.edit(finalThreadContent);
    }
  }

  /**
   * @param {String} text
   * @param {Eris.MessageFile} file
   * @returns {Promise<Eris.Message>}
   */
  async postToThreadChannel(text, file = null) {
    const channel = bot.getChannel(this.channel_id);
    return channel.createMessage(text, file);
  }

  /**
   * @param {String} text
   * @returns {Promise<void>}
   */
  async postSystemMessage(text) {
    const msg = await this.postToThreadChannel(text);
    await this.addThreadMessageToDB({
      message_type: THREAD_MESSAGE_TYPE.SYSTEM,
      user_id: null,
      user_name: '',
      body: text,
      original_message_id: msg.id
    });
  }

  /**
   * @param {Object} data
   * @returns {Promise<void>}
   */
  async addThreadMessageToDB(data) {
    await knex('thread_messages').insert({
      thread_id: this.id,
      created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      ...data
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async close() {
    await this.postToThreadChannel('Closing thread...');

    // Update DB status
    await knex('threads')
      .where('id', this.id)
      .update({
        status: THREAD_STATUS.CLOSED
      });

    // Delete channel
    const channel = bot.getChannel(this.channel_id);
    if (channel) {
      channel.delete('Thread closed');
    }
  }

  /**
   * @returns {Promise<String>}
   */
  getLogUrl() {
    return utils.getSelfUrl(`logs/${this.id}`);
  }
}

module.exports = Thread;