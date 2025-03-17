import React, { useRef, useState } from "react";
import DraggableImage from "./DraggableImage";
import { EmptyPageEditor } from "./EmptyPageEditor";
import ResizableImage from "./ResizableImage";
import { Page } from "../hooks";
import { toBase64 } from "../utils";
import { FolderIconSVG, LinkIconSVG } from "./svg";

export interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

// interface PageEditorProps {
//   pageIndex: number;
//   images: ImageElement[];
//   selectedId?: string;
//   onSelectImage: (imgId: string) => void;
//   onBringToFront: (imgId: string) => void;
//   onDeleteImage: (imgId: string) => void;
//   onUpdateImage: (updated: ImageElement) => void;
//   onAddImage: (file: File) => void;
//   onAddLinkImage: (link: string) => void;
// }

interface DocumentPageProps {
  page: Page;
  isActive: boolean;
  onPageClick: () => void;
  onImageUpdate: (image: ImageElement) => void;
  onImageClick: (imageId: string) => void;
  onImageDelete: (imageId: string) => void;
  onImageSelected: (pageId: string, base64: string) => void;
  pageIndex: number;
}

const PageEditor = ({
  page,
  isActive = false,
  onPageClick,
  onImageUpdate,
  onImageSelected,
  onImageClick,
  onImageDelete,
  pageIndex,
}: DocumentPageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    setActiveImageId(imageId);
    onImageClick(imageId);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("O arquivo selecionado não é uma imagem.");
        return;
      }

      const base64 = await toBase64(file);

      onImageSelected(page.id, base64 as string);

      fileInputRef.current!.value = "";
    }
  };

  // const handleAddLinkImage = (link: string) => {
  //   onAddLinkImage(link);
  // };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  const renderImages = () => {
    if (!page.images || page.images.length === 0) {
      return (
        <EmptyPageEditor
          handleAddLinkImage={() =>
            onImageSelected(page.id, "https://placehold.co/600x400.jpg")
          }
          openFileExplorer={openFileExplorer}
        />
      );
    }

    return page.images.map((image) => (
      <ResizableImage
        key={image.id}
        image={image}
        pageRef={pageRef}
        onUpdate={onImageUpdate}
        onClick={() => handleImageClick(image.id)}
        onDelete={() => onImageDelete(image.id)}
        isActive={activeImageId === image.id}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Página {pageIndex + 1}</p>

      <div
        ref={pageRef}
        onClick={onPageClick}
        className={`w-[595px] h-[842px] border border-gray-300 relative bg-white shadow-md mx-auto ${
          isActive ? "ring-2 ring-primary" : ""
        }`}
        style={{ aspectRatio: "8.5/11" }}
      >
        {renderImages()}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        <div className="absolute top-1/2 left-[-68px] flex flex-col justify-between items-center border border-neutral-400 rounded-xl">
          <div
            onClick={openFileExplorer}
            className="hover:bg-neutral-800/30 cursor-pointer px-3 pt-3 pb-2.5 rounded-xl"
          >
            <FolderIconSVG fill="#030303" height="20" width="20" />
          </div>
          <div className="hover:bg-neutral-800/30 cursor-pointer px-3 pb-3 pt-2.5 rounded-xl">
            <LinkIconSVG fill="#030303" height="20" width="20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
