import { toast } from 'react-hot-toast';

export const copyToClipboard = (el: string) => {
  navigator.clipboard.writeText(el);
  toast('Topic copied to clipboard', {
    icon: '✂️',
  });
};
