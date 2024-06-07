import { BodyMessage } from './body-message.interface';
import { Recipient } from './recipient.interface';

export interface Message {
  /**
   * The Bcc: recipients for the message.
   */
  bccRecipients: Recipient[];

  /**
   * The body of the message. It can be in HTML or text format.
   */
  body: BodyMessage;

  /**
   * The first 255 characters of the message body. It is in text format
   */
  bodyPreview: string;

  /**
   * The Cc: recipients for the message.
   */
  ccRecipients: Recipient[];

  /**
   * The version of the message.
   */
  changeKey: string;

  /**
   * The ID of the conversation the email belongs to.
   */
  conversationId: string;

  // conversationIndex: Edm.Binary;

  /**
   * The date and time the message was created.
   * The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
   */
  createdDateTime: Date;
}
