import { BodyMessage } from '../interfaces/body-message.interface';

export const BodyMessageMapper = {
  fromGraph(body: any): BodyMessage {
    return {
      contentType: body.contentType,
      content: body.content,
    };
  },
};
