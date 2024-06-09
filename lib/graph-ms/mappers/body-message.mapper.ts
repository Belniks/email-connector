import { BodyMessage } from '../interfaces/body-message.interface';

export const BodyMessageMapper = {
  fromGraph(body: any): BodyMessage {
    console.log('BodyMessageMapper.fromGraph', body);

    return {
      contentType: body.contentType,
      content: body.content,
    };
  },
};
