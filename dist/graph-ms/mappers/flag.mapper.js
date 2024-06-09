"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagMapper = void 0;
const date_time_time_zone_mapper_1 = require("./date-time-time-zone.mapper");
exports.FlagMapper = {
    fromGraph: (flag) => {
        console.log('FlagMapper.fromGraph', flag);
        return {
            completedDateTime: flag.completedDateTime
                ? date_time_time_zone_mapper_1.DateTimeTimeZoneMapper.fromGraph(flag.completedDateTime)
                : undefined,
            dueDateTime: flag.dueDateTime
                ? date_time_time_zone_mapper_1.DateTimeTimeZoneMapper.fromGraph(flag.dueDateTime)
                : undefined,
            flagStatus: flag.flagStatus,
            startDateTime: flag.startDateTime
                ? date_time_time_zone_mapper_1.DateTimeTimeZoneMapper.fromGraph(flag.startDateTime)
                : undefined,
        };
    },
};
