import React from "react";
import DraggableImage from "./DraggableImage";

interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageEditorProps {
  pageIndex: number;
  images: ImageElement[];
  onUpdateImage: (img: ImageElement) => void;
  onAddImage: (file: File) => void;
  onDeleteImage: (imageId: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({
  pageIndex,
  images,
  onUpdateImage,
  onAddImage,
  onDeleteImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <div className="w-[595px] h-[842px] border border-[#b1b1b1] relative my-5 mx-auto">
      <p className="text-center absolute top-[-26px] left-1/2 transform -translate-x-1/2">
        Página {pageIndex + 1}
      </p>

      {images.map((img) => (
        <DraggableImage
          key={img.id}
          src={img.src}
          x={img.x}
          y={img.y}
          width={img.width}
          height={img.height}
          onChange={(x, y, w, h) => {
            onUpdateImage({
              ...img,
              x,
              y,
              width: w,
              height: h,
            });
          }}
          onDelete={() => onDeleteImage(img.id)}
        />
      ))}

      <div style={{ position: "absolute", bottom: 10, right: 10 }}>
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default PageEditor;
