import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { useSnackbar } from "notistack";
import { forwardRef } from "react";

export type SnackbarVariant =
  | "default"
  | "error"
  | "success"
  | "warning"
  | "info";

const CustomSnackbar = forwardRef<
  HTMLDivElement,
  {
    message: string;
    variant: SnackbarVariant;
    onClose: () => void;
  }
>(({ message, variant, onClose }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          gradient:
            "bg-gradient-to-r from-slate-900 via-gray-800 to-emerald-900",
          border: "border-emerald-400/30",
          icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
          textColor: "text-emerald-100",
        };
      case "error":
        return {
          gradient: "bg-gradient-to-r from-slate-900 via-gray-800 to-red-900",
          border: "border-red-400/30",
          icon: <AlertCircle className="w-5 h-5 text-red-400" />,
          textColor: "text-red-100",
        };
      case "warning":
        return {
          gradient:
            "bg-gradient-to-r from-slate-900 via-gray-800 to-yellow-900",
          border: "border-yellow-400/30",
          icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
          textColor: "text-yellow-100",
        };
      case "info":
        return {
          gradient: "bg-gradient-to-r from-slate-900 via-gray-800 to-blue-900",
          border: "border-blue-400/30",
          icon: <Info className="w-5 h-5 text-blue-400" />,
          textColor: "text-blue-100",
        };
      default:
        return {
          gradient: "bg-gradient-to-r from-slate-900 via-gray-700 to-slate-800",
          border: "border-gray-400/30",
          icon: <Info className="w-5 h-5 text-gray-400" />,
          textColor: "text-gray-100",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      ref={ref}
      className={`
        ${styles.gradient} 
        ${styles.border}
        border backdrop-blur-sm
        rounded-xl p-4 min-w-[300px] max-w-[400px]
        shadow-2xl shadow-black/50
        flex items-center gap-3
        animate-in slide-in-from-right-5 duration-300
      `}
    >
      {styles.icon}
      <span className={`${styles.textColor} font-medium flex-1 text-sm`}>
        {message}
      </span>
      <Button
        onClick={onClose}
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-white/10 text-white/70 hover:text-white"
      >
        <X size={14} />
      </Button>
    </div>
  );
});

CustomSnackbar.displayName = "CustomSnackbar";

export default function useCustomSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueCustomSnackbar = ({
    message,
    variant = "default",
  }: {
    message?: string;
    variant?: SnackbarVariant;
  }) => {
    if (!message) return;

    enqueueSnackbar(message, {
      variant: "default",
      autoHideDuration: 5000,
      content: (key) => (
        <CustomSnackbar
          message={message}
          variant={variant}
          onClose={() => closeSnackbar(key)}
        />
      ),
    });
  };

  return { enqueueSnackbar: enqueueCustomSnackbar };
}
