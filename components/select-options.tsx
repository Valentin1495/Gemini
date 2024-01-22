import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { amountOptions } from '@/app/(dashboard)/(routes)/image/constants';
import { Dispatch, SetStateAction } from 'react';

type SelectOptionsProps = {
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
};

export default function SelectOptions({
  amount,
  setAmount,
}: SelectOptionsProps) {
  return (
    <Select onValueChange={setAmount} value={amount} defaultValue='1'>
      <SelectTrigger className='w-[180px] focus:ring-0 focus:ring-offset-0'>
        <SelectValue defaultValue='1' placeholder='1 Photo' />
      </SelectTrigger>
      <SelectContent>
        {amountOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
