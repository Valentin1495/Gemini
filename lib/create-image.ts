export const createImage = async (prompt: string, samples: number) => {
  const response = await fetch(process.env.KAKAO_API_URL as string, {
    method: 'POST',
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY as string}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      samples,
    }),
  });

  const data = await response.json();

  return data;
};
