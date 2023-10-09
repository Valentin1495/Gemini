import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export const textServiceClient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.PALM_API_KEY as string),
});
