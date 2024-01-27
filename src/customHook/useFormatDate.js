import {
  differenceInMilliseconds,
  intervalToDuration,
  formatDuration,
  format,
} from "date-fns";
export default function useFormatDate() {
  const customFormatDuration = (startTime, endTime) => {
    const currenTime = new Date();
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const durationInMillis = differenceInMilliseconds(startTime, currenTime);
    const duration = intervalToDuration({ start: 0, end: durationInMillis });
    if (duration.years > 0)
      return formatDuration(duration, {
        format: ["years"],
      });
    if (duration.months > 0)
      return formatDuration(duration, {
        format: ["months"],
      });
    if (duration.days > 0)
      return formatDuration(duration, {
        format: ["days"],
      });
    if (duration.minutes > 0)
      return formatDuration(duration, {
        format: ["minutes"],
      });
    if (duration.seconds > 0)
      return formatDuration(duration, {
        format: ["seconds"],
      });
  };
  const formatDate = (dateTime) => {
    dateTime = new Date(dateTime);
    return format(dateTime, "d 'thg' M, HH:mm");
  };
  const formatDateInput = (dateTime) => {
    dateTime = new Date(dateTime);
    return format(dateTime, "yyyy-MM-dd");
  };
  return {
    customFormatDuration,
    formatDate,
    formatDateInput,
  };
}
