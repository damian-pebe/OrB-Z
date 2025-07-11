import { useEffect } from "react";

export default function PreviewScreens() {
  useEffect(() => {
    const unsub = window.electron.subscribeViewer((stats) =>
      console.log(stats)
    );
    return unsub;
    // window.electron.getScreenView();
  }, []);
  return <div className="text-white">preview</div>;
}
