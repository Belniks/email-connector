import { InternetMessageHeader } from '../interfaces/internet-message-header.interface';

export const InternetMessageHeadersMapper = {
  fromGraph(headers: any): InternetMessageHeader {
    return {
      name: headers.name,
      value: headers.value,
    };
  },
  fromGraphArray(headers: any[]): InternetMessageHeader[] {
    return headers.map((header) =>
      InternetMessageHeadersMapper.fromGraph(header),
    );
  },
};
