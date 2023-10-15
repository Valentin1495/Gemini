import type { User } from 'next-auth';

export type UserType = {
  user?: Omit<User, 'id'>;
};

export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type D = {
  numOfDrafts: number;
  idx: number;
};

export type P = {
  numOfPublished: number;
  idx: number;
};

export type DraftType = {
  author: string;
  username: string;
  prompt: string;
  story: string;
  storyId: string;
  timestamp: Timestamp;
};

export type PublishedType = DraftType & {
  karloImage: string;
};

export type ExtendedDraft = DraftType & D;

export type ExtendedPublished = PublishedType & P;
