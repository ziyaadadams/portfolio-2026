import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-0.5 text-[0.6875rem] font-medium tracking-[0.04em] transition-colors',
  {
    variants: {
      variant: {
        default:  'border border-white/12 text-white/70',
        outline:  'border border-white/20 text-white/60',
        solid:    'bg-white/10 text-white/80',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
