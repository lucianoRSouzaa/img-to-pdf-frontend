import React from "react";
import { Rnd } from "react-rnd";
import "./DraggableImage.css";

interface DraggableImageProps {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onChange: (x: number, y: number, width: number, height: number) => void;
  onDelete: () => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  x,
  y,
  width,
  height,
  onChange,
  onDelete,
}) => {
  return (
    <Rnd
      bounds="parent"
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(_, data) => {
        onChange(data.x, data.y, width, height);
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        onChange(
          position.x,
          position.y,
          parseFloat(ref.style.width),
          parseFloat(ref.style.height)
        );
      }}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        border: "1px dashed #888",
        position: "relative",
      }}
      className="draggable-image"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          border: "none",
          background: "red",
          color: "white",
          cursor: "pointer",
          width: "34px",
          height: "20px",
          fontSize: "14px",
          lineHeight: "14px",
          textAlign: "center",
        }}
        className="delete-button"
      >
        X
      </button>
    </Rnd>
  );
};

export default DraggableImage;
