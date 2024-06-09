import { Flag } from '../interfaces/flag.interface';
import { DateTimeTimeZoneMapper } from './date-time-time-zone.mapper';

export const FlagMapper = {
  fromGraph: (flag: any): Flag => {
    console.log('FlagMapper.fromGraph', flag);

    return {
      completedDateTime: flag.completedDateTime
        ? DateTimeTimeZoneMapper.fromGraph(flag.completedDateTime)
        : undefined,
      dueDateTime: flag.dueDateTime
        ? DateTimeTimeZoneMapper.fromGraph(flag.dueDateTime)
        : undefined,
      flagStatus: flag.flagStatus,
      startDateTime: flag.startDateTime
        ? DateTimeTimeZoneMapper.fromGraph(flag.startDateTime)
        : undefined,
    };
  },
};
