# [AIStoryteller](https://aistoryteller-nh.vercel.app/)

이야기 주제를 제시하고, 이야기와 이미지를 생성해 보세요.

![landing-page](/public/landing-page.png)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Database:** [Firebase](https://firebase.google.com/?hl=ko)
- **LLM:** [PaLM](https://developers.generativeai.google/guide/palm_api_overview)
- **Image Generation:** [Karlo](https://developers.kakao.com/product/karlo)

## Features

- 이야기 / 이미지 / 이미지 프롬프트 확인

  ![1](/public/1.png)

- 주제 입력 / 줄거리 생성 with **Server Action** & **PaLM**

  ![2](/public/2.png)

- 간단한 키워드 제공 / 디테일한 주제 생성 / 이야기 완성 with **Server Action** & **Route Handler** & **PaLM**

  ![3](/public/3.png)

  ![4](/public/4.png)

- 프롬프트 입력 / 이미지 생성 / 이야기 작성 with **Server Action** & **Karlo**

  ![5](/public/5.png)

- 구글 로그인 (OAuth)
- 이야기 쓰기 / Draft 자동 저장
- Draft 삭제
- 이야기 삭제
