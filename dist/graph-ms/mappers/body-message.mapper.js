"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMessageMapper = void 0;
exports.BodyMessageMapper = {
    fromGraph(body) {
        console.log('BodyMessageMapper.fromGraph', body);
        return {
            contentType: body.contentType,
            content: body.content,
        };
    },
};
