import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-display",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--primary)/0.4)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)] hover:shadow-neon-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-neon-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.6),0_0_60px_hsl(var(--secondary)/0.4)]",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon:
          "relative bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-semibold overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:opacity-0 hover:before:opacity-100 before:transition-opacity hover:shadow-[0_0_40px_hsl(var(--primary)/0.5),0_0_80px_hsl(var(--secondary)/0.3)]",
        glass:
          "bg-card/40 backdrop-blur-lg border border-glass-border text-foreground hover:bg-card/60 hover:border-primary/30",
        "neon-outline":
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground animate-border-glow",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
