import { EmailAddress } from '../interfaces/email-address.interface';

export const EmailAddressMapper = {
  fromGraph: (emailAddress: any): EmailAddress => {
    return {
      address: emailAddress.address,
      name: emailAddress.name,
    };
  },
};
