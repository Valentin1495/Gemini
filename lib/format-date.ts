import { Timestamp } from '@/types';

export const formatDate = (timestamp: Timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6); // Convert Firestore timestamp to Date

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);

  return formattedDate;
};
