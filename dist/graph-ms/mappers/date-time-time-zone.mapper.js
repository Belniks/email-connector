"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeTimeZoneMapper = void 0;
exports.DateTimeTimeZoneMapper = {
    fromGraph: (dateTimeTimeZone) => {
        return {
            dateTime: dateTimeTimeZone.dateTime,
            timeZone: dateTimeTimeZone.timeZone,
        };
    },
};
