import { useToast } from '@/components/ui/use-toast';

const useCopy = (str: string) => {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(str);
    toast({ title: '✂️ Copied to clipboard.' });
  };

  return copyToClipboard;
};

export default useCopy;
