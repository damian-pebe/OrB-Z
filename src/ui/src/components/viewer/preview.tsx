import { useEffect } from "react";

export default function PreviewScreens() {
  useEffect(() => {
    // @ts-ignore
    window.electron.subscribeViewer((stats) => console.log(stats));
    // @ts-ignore
    window.electron.getScreenView();
  }, []);
  return <div className="text-white">preview</div>;
}
