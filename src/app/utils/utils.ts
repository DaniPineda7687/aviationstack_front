export const getLocalTime = (timezone?: string): string => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };