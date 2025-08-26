import { useNavigate } from "react-router-dom";
import { ItemOption } from "../ui/item";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative flex justify-between items-center px-5 select-none drag">
      <div className="flex items-center gap-3 no-drag">
        <div
          onClick={() => navigate("/")}
          className="font-poiret text-3xl hover:tracking-widest hover:-translate-y-0.5 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 text-md my-3"
        >
          OrB Z
        </div>
      </div>
      {/* gotta fix these buttons, doesnt work */}

      <div className="flex items-center gap-5 no-drag">
        <ItemOption
          className="bg-white/10 px-2 no-drag"
          label="-"
          onClick={() => window.electron.minimize()}
        />
        <ItemOption
          className="bg-white/10 px-2 no-drag"
          label="x"
          onClick={() => window.electron.close()}
        />
      </div>
    </div>
  );
}
