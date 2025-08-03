import { Rnd } from "react-rnd";

export default function ResizableBox() {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 320,
        height: 200,
      }}
      bounds="window"
      minWidth={150}
      minHeight={100}
      style={{
        border: "1px solid #ccc",
        background: "#f0f0f0",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <p>This box is draggable and resizable</p>
    </Rnd>
  );
}
