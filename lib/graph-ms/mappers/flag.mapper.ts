import { Flag } from '../interfaces/flag.interface';
import { DateTimeTimeZoneMapper } from './date-time-time-zone.mapper';

export const FlagMapper = {
  fromGraph: (flag: any): Flag => {
    return {
      completedDateTime: DateTimeTimeZoneMapper.fromGraph(
        flag.completedDateTime,
      ),
      dueDateTime: DateTimeTimeZoneMapper.fromGraph(flag.dueDateTime),
      flagStatus: flag.flagStatus,
      startDateTime: DateTimeTimeZoneMapper.fromGraph(flag.startDateTime),
    };
  },
};
