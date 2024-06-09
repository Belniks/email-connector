"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetMessageHeadersMapper = void 0;
exports.InternetMessageHeadersMapper = {
    fromGraph(headers) {
        console.log('InternetMessageHeadersMapper.fromGraph', headers);
        return {
            name: headers.name,
            value: headers.value,
        };
    },
    fromGraphArray(headers) {
        return headers.map((header) => exports.InternetMessageHeadersMapper.fromGraph(header));
    },
};
