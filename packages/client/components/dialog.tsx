import { cn } from "@/lib/utils";
import { AlertIcon, CheckCircleIcon } from "@primer/octicons-react";

const Dialog = ({
  variant = "success",
  children,
  className,
}: {
  variant: "error" | "success";
  children: React.ReactNode;
  className?: string;
}) => {
  const styles = {
    error:
      "bg-[--danger-bg] border-[--danger-bg-muted] [&>svg]:text-[--danger-fg]",
    success:
      "bg-[--success-bg] border-[--success-bg-muted] [&>svg]:text-[--success-fg]",
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-md [&>svg]:mr-4",
        variant === "error" ? styles.error : styles.success,
        className,
      )}>
      {variant === "error" ? <AlertIcon /> : <CheckCircleIcon />}
      {children}
    </div>
  );
};

export default Dialog;
