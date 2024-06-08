"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentMapper = void 0;
exports.AttachmentMapper = {
    fromGraph: (attachment) => {
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
    fromGraphArray: (attachments) => {
        return attachments.map((attachment) => exports.AttachmentMapper.fromGraph(attachment));
    },
};
