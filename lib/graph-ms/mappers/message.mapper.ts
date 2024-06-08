import { Message } from '../interfaces';
import { BodyMessageMapper } from './body-message.mapper';
import { FlagMapper } from './flag.mapper';
import { InternetMessageHeadersMapper } from './internet-message-headers.mapper';
import { RecipientMapper } from './recipient.mapper';

export const MessageMapper = {
  fromGraph: (message: any): Message => {
    return {
      id: message.id ?? '',
      subject: message.subject ?? 'No Subject',
      body: BodyMessageMapper.fromGraph(message.body),
      from: RecipientMapper.fromGraph(message.from),
      bccRecipients: RecipientMapper.fromGraphArray(message.bccRecipients),
      ccRecipients: RecipientMapper.fromGraphArray(message.ccRecipients),
      importance: message.importance,
      isRead: message.isRead,
      isReadReceiptRequested: message.isReadReceiptRequested,
      isDeliveryReceiptRequested: message.isDeliveryReceiptRequested,
      internetMessageId: message.internetMessageId,
      inferenceClassification: message.inferenceClassification,
      internetMessageHeaders: InternetMessageHeadersMapper.fromGraphArray(
        message.internetMessageHeaders,
      ),
      lastModifiedDateTime: new Date(message.lastModifiedDateTime),
      parentFolderId: message.parentFolderId,
      receivedDateTime: new Date(message.receivedDateTime),
      replyTo: RecipientMapper.fromGraphArray(message.replyTo),
      sender: RecipientMapper.fromGraph(message.sender),
      sentDateTime: new Date(message.sentDateTime),
      // attachments: message.attachments,
      bodyPreview: message.bodyPreview,
      // categories: message.categories,
      conversationId: message.conversationId,
      isDraft: message.isDraft,
      // isReadReceiptRequested: message.isReadReceiptRequested,
      webLink: message.webLink,
      changeKey: message.changeKey,
      createdDateTime: new Date(message.createdDateTime),
      flag: FlagMapper.fromGraph(message.flag),
      hasAttachments: message.hasAttachments,
      toRecipients: RecipientMapper.fromGraphArray(message.toRecipients),
      uniqueBody: BodyMessageMapper.fromGraph(message.uniqueBody),
    };
  },
  fromGraphArray: (messages: any[]): Message[] => {
    return messages.map((message) => MessageMapper.fromGraph(message));
  },
};
