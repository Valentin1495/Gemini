export const extractPrompt = (str: string) => {
  // Use regular expressions to extract sentences labeled 1, 2, and 3
  const regex = /\d\.\s(.*?)\./g;
  const matches = str.matchAll(regex);

  // Extract and store the matched sentences in an array
  const extractedSentences = Array.from(matches, (match) => match[1]);

  return extractedSentences;
};
