import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bold transition',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 transition',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground font-bold transition',
        secondary:
          'bg-secondary text-secondary-foreground font-bold shadow-sm hover:bg-secondary/80 transition',
        ghost: 'hover:bg-accent hover:text-accent-foreground transition',
        link: 'text-primary underline-offset-4 hover:underline transition',
        login:
          'w-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white font-bold hover:opacity-90 transition',
        premium:
          'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
