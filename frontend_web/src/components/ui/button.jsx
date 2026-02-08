import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors duration-200",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-colors duration-200",
        outline:
          "border border-border bg-transparent text-foreground shadow-sm hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors duration-200",
        ghost: "text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200",
        link: "text-primary underline-offset-4 hover:underline",
        premium:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors duration-200",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 transition-colors duration-200",
        sos:
          "bg-destructive text-destructive-foreground shadow-lg animate-pulse hover:animate-none hover:bg-destructive/90 transition-colors duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
