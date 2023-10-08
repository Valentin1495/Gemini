import { cn } from '@/lib/utils';

type LoaderProps = {
  width?: string;
  height?: string;
};

export default function Loader({ width = 'w-6', height = 'h-6' }: LoaderProps) {
  return <div className={cn('loader', width, height)}></div>;
}
