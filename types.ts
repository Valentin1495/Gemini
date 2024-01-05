export type User = {
  name: string;
  email: string;
  image: string;
};

export type SessionType = {
  user: User;
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
  timestamp: number;
};

export type PublishedType = DraftType & {
  profilePic: string;
  karloImage: string;
};

export type ExtendedDraft = DraftType & D;

export type ExtendedPublished = PublishedType & P;

export type image = {
  id: string;
  image: string;
};
