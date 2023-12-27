import { cn } from "@/lib/utils";

const Button = ({
  className,
  children,
  ...restProps
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(
        "bg-[--btn-bg] text-[--btn-fg] rounded-md px-2 py-1",
        "border border-default hover:border-[--btn-hover-border]",
        "focus-within:border-[--btn-border-hover]",
        className,
      )}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
