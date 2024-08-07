import { GenerateContentStreamResult } from '@google/generative-ai';
import { Dispatch, SetStateAction } from 'react';

export type image = {
  id: string;
  image: string;
};

export type Msg = {
  role: string;
  parts: string;
};

export type chatParams = {
  chatHistory: Msg[];
  setChatHistory: Dispatch<SetStateAction<Msg[]>>;
  setModelParts: Dispatch<SetStateAction<string>>;
  getResult: () => Promise<GenerateContentStreamResult>;
  streaming: boolean;
};
