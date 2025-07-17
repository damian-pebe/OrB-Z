import { useNavigate } from "react-router-dom";
import { ItemOption } from "../ui/item";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative flex justify-between items-center px-5">
      <div className="w-[30vw] flex justify-center items-center gap-5">
        <ItemOption
          className="bg-white/10 px-3"
          label="Dashboard"
          onClick={() => navigate("/dashboard")}
        />
        <ItemOption
          className="bg-white/10 px-3"
          label="Loading"
          onClick={() => navigate("/loading")}
        />
      </div>

      <div
        onClick={() => navigate("/")}
        className="absolute left-1/2 -translate-x-1/2 font-poiret text-3xl hover:tracking-widest hover:-translate-y-0.5 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 text-center text-md my-3"
      >
        OrB Z
      </div>

      <div className="w-[30vw] flex justify-center items-center gap-5">
        <ItemOption className="bg-white/10 px-2" label="-" onClick={() => {}} />
        <ItemOption className="bg-white/10 px-2" label="x" onClick={() => {}} />
      </div>
    </div>
  );
}
