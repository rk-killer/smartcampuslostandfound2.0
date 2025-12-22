import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-display",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-neon-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-neon-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
        lost:
          "border-destructive/50 bg-destructive/20 text-destructive shadow-[0_0_10px_hsl(var(--destructive)/0.3)]",
        found:
          "border-secondary/50 bg-secondary/20 text-secondary shadow-[0_0_10px_hsl(var(--secondary)/0.3)]",
        neon:
          "border-primary/50 bg-primary/20 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
