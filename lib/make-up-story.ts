import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export const makeUpStory = async (topic: string) => {
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const messages = [
    {
      content: `
      Make up a short story about ${topic}.
      `,
    },
  ];

  const response = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.8, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context:
      //   '',
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: {
            content: `
            Make up a short story about "Sharky", a tooth-brushing shark superhero.`,
          },
          output: {
            content: `
            Once upon a time in the deep blue sea, there lived a remarkable creature known as Sharky, the tooth-brushing shark superhero. Sharky was not your typical fearsome predator of the ocean; he had a heart as big as the ocean itself and a mission to keep all the sea creatures healthy and happy.

            Sharky's home was a cozy cave nestled in a coral reef. He had a dazzling collection of toothbrushes, toothpaste, and floss neatly organized on the shelves of his cave. Each morning, he would wake up early, grab his favorite toothbrush, and set off on his mission. Sharky's goal was to help all the sea creatures, big and small, maintain their dental hygiene.
            
            One sunny morning, Sharky received an urgent message from Ollie the octopus. Ollie had a severe case of algae buildup on his teeth, and it was causing him great discomfort. Without hesitation, Sharky donned his toothbrush cape and sped over to Ollie's den.
            
            Upon arrival, Sharky saw Ollie's tentacles swaying in pain. With a gentle smile, Sharky asked Ollie to open wide. Sharky's razor-sharp teeth may have looked menacing, but he used them with the utmost care. He began brushing Ollie's teeth with his specialized toothbrush, which had soft bristles made from the finest coral.
            
            As Sharky worked his magic, Ollie felt the algae being scrubbed away, and relief washed over him. Ollie was overjoyed and thanked Sharky profusely for his help. But Sharky wasn't done yet; he reached for his magical floss and expertly flossed between Ollie's tentacles.
            
            Word of Sharky's heroic dental deeds spread quickly throughout the ocean. Soon, a line of sea creatures formed outside Sharky's cave, each seeking his assistance. He helped Sammy the seahorse with her tiny teeth, gave Freddy the clownfish a sparkling smile, and even assisted Benny the crab in flossing his pincers.
            
            As Sharky swam from one appointment to another, he felt a sense of fulfillment like never before. His dedication to promoting dental health had made him a beloved figure in the ocean community. The sea creatures no longer feared him but looked up to him as a role model and friend.
            
            Sharky's fame as the tooth-brushing shark superhero grew, and he decided to host a grand dental hygiene event at the Great Coral Reef. It was a day filled with brushing, flossing, and smiles as sea creatures from all corners of the ocean gathered to learn about the importance of oral care.
            
            From that day forward, Sharky continued his mission to keep the sea creatures' teeth clean and healthy. He showed them that dental care could be fun and painless, and he became a symbol of kindness and generosity in the underwater world.
            
            And so, in the depths of the ocean, Sharky the tooth-brushing shark superhero swam proudly, knowing that a bright smile could make the whole ocean a happier and healthier place to live.
            `,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const answer = response[0].candidates![0].content;

  return answer;
};
