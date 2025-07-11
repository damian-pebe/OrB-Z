import { useEffect } from "react";

export default function PreviewScreens() {
  useEffect(() => {
    window.electron.subscribeViewer((stats) => console.log(stats));
    window.electron.getScreenView();
  }, []);
  return <div className="text-white">preview</div>;
}
