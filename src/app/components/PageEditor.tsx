import React from "react";
import DraggableImage from "./DraggableImage";

export interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface PageEditorProps {
  pageIndex: number;
  images: ImageElement[];
  selectedId?: string;
  onSelectImage: (imgId: string) => void;
  onBringToFront: (imgId: string) => void;
  onDeleteImage: (imgId: string) => void;
  onUpdateImage: (updated: ImageElement) => void;
  onAddImage: (file: File) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({
  pageIndex,
  images,
  selectedId,
  onSelectImage,
  onBringToFront,
  onDeleteImage,
  onUpdateImage,
  onAddImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <p>Página {pageIndex + 1}</p>

      <div className="w-[595px] h-[842px] border border-gray-300 relative overflow-hidden">
        {images.map((img) => (
          <DraggableImage
            key={img.id}
            data={img}
            isSelected={selectedId === img.id}
            onSelect={() => onSelectImage(img.id)}
            onBringToFront={() => onBringToFront(img.id)}
            onDelete={() => onDeleteImage(img.id)}
            onChange={(newX, newY, w, h) => {
              onUpdateImage({ ...img, x: newX, y: newY, width: w, height: h });
            }}
          />
        ))}
        {/* Botão de upload no canto */}
        <div style={{ position: "absolute", bottom: 10, right: 10 }}>
          <input type="file" onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
