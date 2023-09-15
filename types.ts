import type { User } from 'next-auth';

export type UserType = {
  user: Omit<User, 'id'>;
};
