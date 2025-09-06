import { useNavigate } from "react-router-dom";
import { Minus, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useCustomSnackbar();
  return (
    <div className="w-full relative flex justify-between items-center px-2 select-none drag">
      <div className="flex items-center gap-3 no-drag">
        <div
          onClick={() => {
            navigate("/");
            // test for snackbar
            // const variants = [
            //   "success",
            //   "error",
            //   "warning",
            //   "info",
            //   "default",
            // ] as const;
            // const messages = [
            //   "Welcome to OrB Z! 🎉",
            //   "Something went wrong!",
            //   "Please check your settings",
            //   "New update available",
            //   "Hello from OrB Z",
            // ];

            // const randomIndex = Math.floor(Math.random() * variants.length);
            // enqueueSnackbar({
            //   message: messages[randomIndex],
            //   variant: variants[randomIndex],
            // });
          }}
          className="font-poiret text-3xl hover:tracking-widest hover:-translate-y-0.5 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 text-md my-3"
        >
          OrB Z
        </div>
      </div>

      <OptionsNavbar />
    </div>
  );
}

function OptionsNavbar() {
  return (
    <div className="flex items-center gap-5 no-drag">
      <Button variant="outline" onClick={() => window.electron.minimize()}>
        <Minus />
      </Button>
      <Button variant="outline" onClick={() => window.electron.maximize()}>
        <Square />
      </Button>
      <Button variant="outline" onClick={() => window.electron.close()}>
        <X />
      </Button>
    </div>
  );
}
