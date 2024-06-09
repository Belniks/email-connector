import { BodyMessage } from './body-message.interface';
import { Flag } from './flag.interface';
import { Importance } from './importance.interface';
import { InferenceClassificationType } from './inference-classification-type.interface';
import { InternetMessageHeader } from './internet-message-header.interface';
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

  /**
   * The flag value that indicates the status, start date, due date, or completion date for the message.
   */
  flag: Flag;

  /**
   * The owner of the mailbox from which the message is sent. In most cases, this value is the same as the sender property, except for sharing or delegation scenarios. The value must correspond to the actual mailbox used. Find out more about setting the from and sender properties of a message.
   */
  from: Recipient;

  /**
   * Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src="cid:image001.jpg@01D26CD8.6C05F070">.
   */
  hasAttachments: boolean;

  /**
   * Unique identifier for the message. By default, this value changes when the item is moved from one container (such as a folder or calendar) to another. To change this behavior, use the Prefer: IdType="ImmutableId" header. See Get immutable identifiers for Outlook resources for more information. Read-only.
   */
  id: string;

  /**
   * The importance of the message. The possible values are: low, normal, and high.
   */
  importance: Importance;

  /**
   * The classification of the message for the user, based on inferred relevance or importance, or on an explicit override. The possible values are: focused or other.
   */
  inferenceClassification: InferenceClassificationType;

  /**
   * A key-value pair that represents an Internet message header, as defined by RFC5322, that provides details of the network path taken by a message from the sender to the recipient.
   */
  internetMessageHeaders: InternetMessageHeader[];

  /**
   * The message ID in the format specified by RFC2822.
   */
  internetMessageId: string;

  /**
   * Indicates whether a read receipt is requested for the message.
   */
  isDeliveryReceiptRequested: boolean;

  /**
   * Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet.
   */
  isDraft: boolean;

  /**
   * Indicates whether the message has been read.
   */
  isRead: boolean;

  /**
   * Indicates whether a read receipt is requested for the message.
   */
  isReadReceiptRequested: boolean;

  /**
   * The date and time the message was last changed.
   *
   * The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
   */
  lastModifiedDateTime: Date;

  /**
   * 	The unique identifier for the message's parent mailFolder.
   */
  parentFolderId: string;

  /**
   * The date and time the message was received.
   *
   * The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
   */
  receivedDateTime: Date;

  /**
   * The email addresses to use when replying.
   */
  replyTo: Recipient[];

  /**
   * The account that is actually used to generate the message. In most cases, this value is the same as the from property. You can set this property to a different value when sending a message from a shared mailbox, for a shared calendar, or as a delegate. In any case, the value must correspond to the actual mailbox used. Find out more about setting the from and sender properties of a message.
   */
  sender: Recipient;

  /**
   * The date and time the message was sent.
   *
   * The date and time information uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
   */
  sentDateTime: Date;

  /**
   * The subject of the message.
   */
  subject: string;

  /**
   * The To: recipients for the message.
   */
  toRecipients: Recipient[];

  /**
   * The part of the body of the message that is unique to the current message. It can be in HTML or text format.
   */
  uniqueBody?: BodyMessage;

  /**
   * The URL to open the message in Outlook on the web.
   *
   * You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, the browser shows the message in the Outlook on the web review pane.
   *
   * The message opens in the browser if you are signed in to your mailbox via Outlook on the web. You are prompted to sign in if you are not already signed in with the browser.
   *
   * This URL cannot be accessed from within an iFrame.
   */
  webLink: string;
}
