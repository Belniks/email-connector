import { Recipient } from '../interfaces/recipient.interface';
import { EmailAddressMapper } from './email-address.mapper';

export const RecipientMapper = {
  fromGraph: (recipient: any): Recipient => {
    return {
      emailAddress: EmailAddressMapper.fromGraph(recipient.emailAddress),
    };
  },
  fromGraphArray: (recipients: any[]): Recipient[] => {
    return recipients.map((recipient) => RecipientMapper.fromGraph(recipient));
  },
};
