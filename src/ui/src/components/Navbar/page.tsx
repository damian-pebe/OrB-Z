import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw]">
      <button onClick={() => navigate("/")}>go to landing</button>
      <button onClick={() => navigate("/dashboard")}>go to dashboard</button>
      <button onClick={() => navigate("/loading")}>go to loading</button>
    </div>
  );
}
