import React, { useState, useCallback } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { ImageElement } from "./PageEditor";

interface DraggableImageProps {
  data: ImageElement;
  isSelected?: boolean;
  onChange: (x: number, y: number, width: number, height: number) => void;
  onDelete: () => void;
  onBringToFront: () => void;
  onSelect: () => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  data,
  isSelected = false,
  onChange,
  onDelete,
  onBringToFront,
  onSelect,
}) => {
  const { src, x, y, width, height, zIndex } = data;
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart: RndDragCallback = useCallback(() => {
    onBringToFront();
    onSelect();
  }, [onBringToFront, onSelect]);

  const handleDragStop: RndDragCallback = useCallback(
    (e, d) => {
      onChange(d.x, d.y, width, height);
    },
    [onChange, width, height]
  );

  const handleResizeStop: RndResizeCallback = useCallback(
    (e, dir, ref, delta, position) => {
      onChange(
        position.x,
        position.y,
        parseFloat(ref.style.width),
        parseFloat(ref.style.height)
      );
    },
    [onChange]
  );

  return (
    <Rnd
      bounds="parent"
      position={{ x, y }}
      size={{ width, height }}
      style={{
        zIndex,
        outline: isSelected ? "2px solid #4A90E2" : "none",
      }}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStart={() => {
        onBringToFront();
        onSelect();
      }}
      onResizeStop={handleResizeStop}
      minWidth={50}
      minHeight={50}
      cancel=".delete-button"
      onClick={() => {
        onSelect();
        onBringToFront();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="drag-handle"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {(isHovered || isSelected) && (
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              border: "none",
              background: "red",
              color: "white",
              cursor: "pointer",
              width: 20,
              height: 20,
              fontSize: 12,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            X
          </button>
        )}
      </div>
    </Rnd>
  );
};

export default DraggableImage;
