import { Attachment } from '../interfaces/attachment.interface';

export const AttachmentMapper = {
  fromGraph: (attachment: any): Attachment => {
    return {
      id: attachment.id,
      name: attachment.name,
      contentType: attachment.contentType,
      contentBytes: attachment.contentBytes
        ? Buffer.from(attachment.contentBytes, 'base64')
        : null,
      size: attachment.size,
      isInline: attachment.isInline,
      lastModifiedDateTime: new Date(attachment.lastModifiedDateTime),
    };
  },
  fromGraphArray: (attachments: any[]): Attachment[] => {
    return attachments.map((attachment) =>
      AttachmentMapper.fromGraph(attachment),
    );
  },
};
