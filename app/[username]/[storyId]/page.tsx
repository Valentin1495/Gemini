import RealtimePost from '@/components/realtime-post';

type Props = {
  params: {
    username: string;
    storyId: string;
  };
};

export default function Post({ params }: Props) {
  return (
    <main className='pt-16'>
      <RealtimePost storyId={params.storyId} />
    </main>
  );
}
