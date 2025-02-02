import React, { useRef } from "react";
import DraggableImage from "./DraggableImage";
import { EmptyPageEditor } from "./EmptyPageEditor";

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
  onAddLinkImage: (link: string) => void;
}

const PageEditor = ({
  pageIndex,
  images,
  selectedId,
  onSelectImage,
  onBringToFront,
  onDeleteImage,
  onUpdateImage,
  onAddImage,
  onAddLinkImage,
}: PageEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("O arquivo selecionado não é uma imagem.");
        return;
      }

      onAddImage(e.target.files[0]);

      fileInputRef.current!.value = "";
    }
  };

  const handleAddLinkImage = (link: string) => {
    onAddLinkImage(link);
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  const renderImages = () => {
    if (!images || images.length === 0) {
      return (
        <EmptyPageEditor
          handleAddLinkImage={() =>
            handleAddLinkImage("https://placehold.co/600x400.jpg")
          }
          openFileExplorer={openFileExplorer}
        />
      );
    }

    return images.map((img) => (
      <DraggableImage
        key={img.id}
        data={img}
        isSelected={selectedId === img.id}
        onSelect={() => onSelectImage(img.id)}
        onBringToFront={() => onBringToFront(img.id)}
        onDelete={() => onDeleteImage(img.id)}
        onChange={(newX, newY, w, h) => {
          onUpdateImage({
            ...img,
            x: newX,
            y: newY,
            width: w,
            height: h,
          });
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Página {pageIndex + 1}</p>

      <div className="w-[595px] h-[842px] border border-gray-300 relative overflow-hidden">
        {renderImages()}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default PageEditor;
