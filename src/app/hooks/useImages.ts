"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { PageData } from "./usePages";
import { ImageElement } from "../components/PageEditor";
import { toBase64 } from "../utils";
import { v4 as uuidv4 } from "uuid";

interface useImagesProps {
  selectedPageId: string | null;
  setSelectedPageId: (pageId: string | null) => void;
  setPages: Dispatch<SetStateAction<PageData[]>>;
}

export function useImages({
  selectedPageId,
  setSelectedPageId,
  setPages,
}: useImagesProps) {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(1);

  const handleBringToFront = (pageId: string, imageId: string) => {
    setZCounter(zCounter + 1);
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          images: p.images.map((img) =>
            img.id === imageId ? { ...img, zIndex: zCounter + 1 } : img
          ),
        };
      })
    );
  };

  const handleSelectImage = (pageId: string, imageId: string) => {
    setSelectedPageId(pageId);
    setSelectedImageId(imageId);
  };

  const handleDeleteImage = (pageId: string, imageId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          images: p.images.filter((img) => img.id !== imageId),
        };
      })
    );
    if (selectedPageId === pageId && selectedImageId === imageId) {
      setSelectedPageId(null);
      setSelectedImageId(null);
    }
  };

  const handleUpdateImage = (pageId: string, updated: ImageElement) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          images: p.images.map((img) =>
            img.id === updated.id ? updated : img
          ),
        };
      })
    );
  };

  const handleAddImage = async (pageId: string, file: File) => {
    const base64 = await toBase64(file);
    setZCounter(zCounter + 1);
    const newImg: ImageElement = {
      id: uuidv4(),
      src: base64 as string,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      zIndex: zCounter + 1,
    };
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          images: [...p.images, newImg],
        };
      })
    );
  };

  return {
    selectedImageId,
    handleSelectImage,
    handleBringToFront,
    handleDeleteImage,
    handleUpdateImage,
    handleAddImage,
  };
}
