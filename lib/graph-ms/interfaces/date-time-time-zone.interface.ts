export interface DateTimeTimeZone {
  /**
   * A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000).
   */
  dateTime: string;

  /**
   * Represents a time zone, for example, "Pacific Standard Time". See below for more possible values:
   * https://learn.microsoft.com/en-us/graph/api/resources/datetimetimezone?view=graph-rest-1.0#additional-time-zones
   */
  timeZone: string;
}
