import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "./button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
