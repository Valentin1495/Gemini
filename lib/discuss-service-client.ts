import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export const discussServiceClient = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.PALM_API_KEY as string),
});
