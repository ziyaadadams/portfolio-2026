import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-white text-black hover:bg-white/88',
        outline:  'border border-white/20 text-white hover:border-white/50 bg-transparent',
        ghost:    'text-white/70 hover:text-white hover:bg-white/5',
        link:     'text-white underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2 text-[0.8125rem] tracking-[0.05em] uppercase',
        sm:      'h-8  px-4 py-1 text-xs',
        lg:      'h-12 px-8 py-3 text-sm',
        icon:    'h-9  w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
