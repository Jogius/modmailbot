/**
 * @typedef {object} ModmailConfig
 * @property {string} [token]
 * @property {array} [mainServerId]
 * @property {string} [inboxServerId]
 * @property {string} [logChannelId]
 * @property {array} [mainGuildId]
 * @property {string} [mailGuildId]
 * @property {string} [prefix="!"]
 * @property {string} [snippetPrefix="!!"]
 * @property {string} [snippetPrefixAnon="!!!"]
 * @property {string} [status="Message me for help!"]
 * @property {"playing"|"watching"|"listening"} [statusType="playing"]
 * @property {string} [responseMessage="Thank you for your message! Our mod team will reply to you here as soon as possible."]
 * @property {string} [closeMessage]
 * @property {boolean} [allowUserClose=false]
 * @property {string} [newThreadCategoryId]
 * @property {string} [mentionRole="none"]
 * @property {boolean} [pingOnBotMention=true]
 * @property {string} [botMentionResponse]
 * @property {array} [inboxServerPermission=["manageMessages"]]
 * @property {boolean} [alwaysReply=false]
 * @property {boolean} [alwaysReplyAnon=false]
 * @property {boolean} [useNicknames=false]
 * @property {boolean} [anonymizeChannelName=false]
 * @property {boolean} [ignoreAccidentalThreads=false]
 * @property {boolean} [threadTimestamps=false]
 * @property {boolean} [allowMove=false]
 * @property {boolean} [syncPermissionsOnMove=true]
 * @property {boolean} [typingProxy=false]
 * @property {boolean} [typingProxyReverse=false]
 * @property {boolean} [mentionUserInThreadHeader=false]
 * @property {boolean} [rolesInThreadHeader=false]
 * @property {boolean} [allowStaffEdit=true]
 * @property {boolean} [allowStaffDelete=true]
 * @property {boolean} [allowBlock=true]
 * @property {boolean} [allowSuspend=true]
 * @property {boolean} [allowSnippets=true]
 * @property {boolean} [enableGreeting=false]
 * @property {string} [greetingMessage]
 * @property {string} [greetingAttachment]
 * @property {*} [serverGreetings={}]
 * @property {*} [guildGreetings]
 * @property {number} [requiredAccountAge] Required account age to message Modmail, in hours
 * @property {string} [accountAgeDeniedMessage="Your Discord account is not old enough to contact modmail."]
 * @property {number} [requiredTimeOnServer] Required time on server to message Modmail, in minutes
 * @property {string} [timeOnServerDeniedMessage="You haven't been a member of the server for long enough to contact modmail."]
 * @property {boolean} [relaySmallAttachmentsAsAttachments=false]
 * @property {number} [smallAttachmentLimit=2097152] Max size of attachment to relay directly. Default is 2MB.
 * @property {string} [attachmentStorage="original"]
 * @property {string} [attachmentStorageChannelId]
 * @property {*} [categoryAutomation={}]
 * @property {boolean} [updateNotifications=true]
 * @property {boolean} [updateNotificationsForBetaVersions=false]
 * @property {array} [plugins=[]]
 * @property {*} [commandAliases]
 * @property {boolean} [reactOnSeen=false]
 * @property {string} [reactOnSeenEmoji="📨"]
 * @property {boolean} [createThreadOnMention=false]
 * @property {boolean} [notifyOnMainServerLeave=true]
 * @property {boolean} [notifyOnMainServerJoin=true]
 * @property {boolean} [allowInlineSnippets=true]
 * @property {string} [inlineSnippetStart="{{"]
 * @property {string} [inlineSnippetEnd="}}"]
 * @property {boolean} [errorOnUnknownInlineSnippet=true]
 * @property {boolean} [allowChangingDisplayRole=true]
 * @property {string} [fallbackRoleName=null]
 * @property {boolean} [autoAlert=false]
 * @property {string} [autoAlertDelay="2m"] Delay before auto-alert kicks in. Uses the same format as timed close; for example 1m30s for 1 minute and 30 seconds.
 * @property {boolean} [pinThreadHeader=false]
 * @property {boolean} [showResponseMessageInThreadChannel=true]
 * @property {string} [logStorage="local"]
 * @property {object} [logOptions]
 * @property {string} logOptions.attachmentDirectory
 * @property {*} [logOptions.allowAttachmentUrlFallback=false]
 * @property {number} [port=8890]
 * @property {string} [url]
 * @property {boolean} [useGitForGitHubPlugins=false]
 * @property {array} [extraIntents=[]]
 * @property {*} [dbType="sqlite"]
 * @property {object} [sqliteOptions]
 * @property {string} sqliteOptions.filename
 * @property {object} [mysqlOptions]
 * @property {string} mysqlOptions.host
 * @property {number} mysqlOptions.port
 * @property {string} mysqlOptions.user
 * @property {string} mysqlOptions.password
 * @property {string} mysqlOptions.database
 * @property {string} [mysqlOptions.timezone]
 * @property {array} [ignoreError=[]]
 */
