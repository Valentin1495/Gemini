import type { User } from 'next-auth';

export type UserType = {
  user?: Omit<User, 'id'>;
};

export type Post = {
  synopsis: string;
  author: string;
  profilePic: string;
  timestamp: Date;
  title: string;
  content: string;
  karloImage: string;
};
