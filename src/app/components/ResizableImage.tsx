"use client";

import type React from "react";

import { useState, useRef, useEffect, type RefObject } from "react";
import Image from "next/image";
import { ImageElement } from "./PageEditor";

interface ResizableImageProps {
  image: ImageElement;
  pageRef: RefObject<HTMLDivElement>;
  onUpdate: (image: ImageElement) => void;
  onClick: () => void;
  onDelete: () => void;
  isActive: boolean;
}

type ResizeHandle =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "right"
  | "bottom"
  | "left"
  | null;

export default function ResizableImage({
  image,
  pageRef,
  onUpdate,
  onClick,
  onDelete,
  isActive,
}: ResizableImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeHandle>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [initialImagePos, setInitialImagePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isResizing) {
      setDragStartPos({
        x: e.clientX,
        y: e.clientY,
      });

      setInitialImagePos({
        x: image.x,
        y: image.y,
      });

      setIsDragging(true);

      e.preventDefault();
    }
  };

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
    setIsResizing(handle);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing) {
        const deltaX = e.clientX - dragStartPos.x;
        const deltaY = e.clientY - dragStartPos.y;

        let newX = initialImagePos.x + deltaX;
        let newY = initialImagePos.y + deltaY;

        const pageRect = pageRef.current?.getBoundingClientRect();
        if (!pageRect) return;

        newX = Math.max(0, Math.min(newX, pageRect.width - image.width));
        newY = Math.max(0, Math.min(newY, pageRect.height - image.height));

        onUpdate({
          ...image,
          x: newX,
          y: newY,
        });
      } else if (isResizing) {
        const pageRect = pageRef.current?.getBoundingClientRect();
        if (!pageRect) return;

        let newWidth = image.width;
        let newHeight = image.height;
        let newX = image.x;
        let newY = image.y;

        const mouseX = e.clientX - pageRect.left;
        const mouseY = e.clientY - pageRect.top;

        if (isResizing.includes("right")) {
          newWidth = Math.max(50, mouseX - image.x);
        }
        if (isResizing.includes("bottom")) {
          newHeight = Math.max(50, mouseY - image.y);
        }
        if (isResizing.includes("left")) {
          const deltaX = mouseX - image.x;
          newWidth = Math.max(50, image.width - deltaX);
          newX = Math.min(image.x + image.width - 50, mouseX);
        }
        if (isResizing.includes("top")) {
          const deltaY = mouseY - image.y;
          newHeight = Math.max(50, image.height - deltaY);
          newY = Math.min(image.y + image.height - 50, mouseY);
        }

        if (newX < 0) {
          newWidth += newX;
          newX = 0;
        }
        if (newY < 0) {
          newHeight += newY;
          newY = 0;
        }
        if (newX + newWidth > pageRect.width) {
          newWidth = pageRect.width - newX;
        }
        if (newY + newHeight > pageRect.height) {
          newHeight = pageRect.height - newY;
        }

        onUpdate({
          ...image,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragStartPos,
    initialImagePos,
    image,
    onUpdate,
    pageRef,
  ]);

  return (
    <div
      ref={imageRef}
      className={`absolute transition-shadow duration-200 ${
        isActive
          ? "shadow-lg ring-2 ring-primary"
          : "hover:ring-2 hover:ring-primary/50"
      }`}
      style={{
        left: `${image.x}px`,
        top: `${image.y}px`,
        width: `${image.width}px`,
        height: `${image.height}px`,
        zIndex: image.zIndex,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image.src || "/placeholder.svg"}
          alt="User uploaded image"
          fill
          unoptimized
          style={{ objectFit: "contain", pointerEvents: "none" }}
        />

        {isActive && (
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center leading-none justify-center hover:bg-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <span className="transform -translate-y-0.5">x</span>
          </button>
        )}
      </div>

      {isActive && (
        <>
          <div
            className="absolute w-2 h-2 border border-white bg-primary top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "top-left")}
          />
          <div
            className="absolute w-2 h-2 border border-white bg-primary top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "top-right")}
          />
          <div
            className="absolute w-2 h-2 border border-white bg-primary bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
          />
          <div
            className="absolute w-2 h-2 border border-white bg-primary bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
          />

          <div
            className="absolute h-2 w-4 border border-white bg-primary top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, "top")}
          />
          <div
            className="absolute h-4 w-2 border border-white bg-primary top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, "right")}
          />
          <div
            className="absolute h-2 w-4 border border-white bg-primary bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, "bottom")}
          />
          <div
            className="absolute h-4 w-2 border border-white bg-primary top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, "left")}
          />
        </>
      )}
    </div>
  );
}
