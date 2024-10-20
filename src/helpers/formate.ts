export function formatDateTime(dateTimeString: Date | undefined) {
  if (!dateTimeString) return;
  const date = new Date(dateTimeString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
}
