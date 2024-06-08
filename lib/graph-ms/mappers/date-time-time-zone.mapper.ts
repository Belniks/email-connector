import { DateTimeTimeZone } from '../interfaces/date-time-time-zone.interface';

export const DateTimeTimeZoneMapper = {
  fromGraph: (dateTimeTimeZone: any): DateTimeTimeZone => {
    return {
      dateTime: dateTimeTimeZone.dateTime,
      timeZone: dateTimeTimeZone.timeZone,
    };
  },
};
