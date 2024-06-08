"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMapper = void 0;
const body_message_mapper_1 = require("./body-message.mapper");
const flag_mapper_1 = require("./flag.mapper");
const internet_message_headers_mapper_1 = require("./internet-message-headers.mapper");
const recipient_mapper_1 = require("./recipient.mapper");
exports.MessageMapper = {
    fromGraph: (message) => {
        return {
            id: message.id ?? '',
            subject: message.subject ?? 'No Subject',
            body: body_message_mapper_1.BodyMessageMapper.fromGraph(message.body),
            from: recipient_mapper_1.RecipientMapper.fromGraph(message.from),
            bccRecipients: recipient_mapper_1.RecipientMapper.fromGraphArray(message.bccRecipients),
            ccRecipients: recipient_mapper_1.RecipientMapper.fromGraphArray(message.ccRecipients),
            importance: message.importance,
            isRead: message.isRead,
            isReadReceiptRequested: message.isReadReceiptRequested,
            isDeliveryReceiptRequested: message.isDeliveryReceiptRequested,
            internetMessageId: message.internetMessageId,
            inferenceClassification: message.inferenceClassification,
            internetMessageHeaders: internet_message_headers_mapper_1.InternetMessageHeadersMapper.fromGraphArray(message.internetMessageHeaders),
            lastModifiedDateTime: new Date(message.lastModifiedDateTime),
            parentFolderId: message.parentFolderId,
            receivedDateTime: new Date(message.receivedDateTime),
            replyTo: recipient_mapper_1.RecipientMapper.fromGraphArray(message.replyTo),
            sender: recipient_mapper_1.RecipientMapper.fromGraph(message.sender),
            sentDateTime: new Date(message.sentDateTime),
            bodyPreview: message.bodyPreview,
            conversationId: message.conversationId,
            isDraft: message.isDraft,
            webLink: message.webLink,
            changeKey: message.changeKey,
            createdDateTime: new Date(message.createdDateTime),
            flag: flag_mapper_1.FlagMapper.fromGraph(message.flag),
            hasAttachments: message.hasAttachments,
            toRecipients: recipient_mapper_1.RecipientMapper.fromGraphArray(message.toRecipients),
            uniqueBody: body_message_mapper_1.BodyMessageMapper.fromGraph(message.uniqueBody),
        };
    },
    fromGraphArray: (messages) => {
        return messages.map((message) => exports.MessageMapper.fromGraph(message));
    },
};
