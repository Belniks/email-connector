import { DateTimeTimeZone } from './date-time-time-zone.interface';

export type FollowUpFlagStatus = 'notFlagged' | 'complete' | 'flagged';

export interface Flag {
  completedDateTime: DateTimeTimeZone;
  dueDateTime: DateTimeTimeZone;
  flagStatus: FollowUpFlagStatus;
  startDateTime: DateTimeTimeZone;
}
