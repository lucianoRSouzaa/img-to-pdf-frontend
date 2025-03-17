"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ImageElement } from "../components/PageEditor";
import { toBase64 } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { Page } from "./usePages";

interface useImagesProps {
  pages: Page[];
  selectedPageId: string | null;
  setActivePage: any;
  setPages: Dispatch<SetStateAction<Page[]>>;
}

export function useImages({
  selectedPageId,
  pages,
  setSelectedPageId,
  setPages,
}: useImagesProps) {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(1);

  // const handleBringToFront = (pageId: string, imageId: string) => {
  //   setZCounter(zCounter + 1);
  //   setPages((prev) =>
  //     prev.map((p) => {
  //       if (p.id !== pageId) return p;
  //       return {
  //         ...p,
  //         images: p.images.map((img) =>
  //           img.id === imageId ? { ...img, zIndex: zCounter + 1 } : img
  //         ),
  //       };
  //     })
  //   );
  // };

  const bringImageToFront = (pageId: string, imageId: string) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          const maxZIndex = Math.max(
            ...page.images.map((img) => img.zIndex),
            0
          );
          return {
            ...page,
            images: page.images.map((img) =>
              img.id === imageId ? { ...img, zIndex: maxZIndex + 1 } : img
            ),
          };
        }
        return page;
      })
    );
  };

  const handleSelectImage = (pageId: string, imageId: string) => {
    setSelectedPageId(pageId);
    setSelectedImageId(imageId);
  };

  // const handleDeleteImage = (pageId: string, imageId: string) => {
  //   setPages((prev) =>
  //     prev.map((p) => {
  //       if (p.id !== pageId) return p;
  //       return {
  //         ...p,
  //         images: p.images.filter((img) => img.id !== imageId),
  //       };
  //     })
  //   );
  //   if (selectedPageId === pageId && selectedImageId === imageId) {
  //     setSelectedPageId(null);
  //     setSelectedImageId(null);
  //   }
  // };

  const deleteImage = (pageId: string, imageId: string) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          return {
            ...page,
            images: page.images.filter((img) => img.id !== imageId),
          };
        }
        return page;
      })
    );
  };

  const updateImageInPage = (pageId: string, updatedImage: ImageElement) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          return {
            ...page,
            images: page.images.map((img) =>
              img.id === updatedImage.id ? updatedImage : img
            ),
          };
        }
        return page;
      })
    );
  };

  // const handleUpdateImage = (pageId: string, updated: ImageElement) => {
  //   setPages((prev) =>
  //     prev.map((p) => {
  //       if (p.id !== pageId) return p;
  //       return {
  //         ...p,
  //         images: p.images.map((img) =>
  //           img.id === updated.id ? updated : img
  //         ),
  //       };
  //     })
  //   );
  // };

  const addImageToPage = (pageId: string, imageSrc: string) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          const maxZIndex =
            page.images.length > 0
              ? Math.max(...page.images.map((img) => img.zIndex))
              : 0;

          const newImage: ImageElement = {
            id: `image-${page.images.length + 1}-${Date.now()}`,
            src: imageSrc,
            width: 200,
            height: 200,
            x: 50,
            y: 50,
            zIndex: maxZIndex + 1,
          };
          return {
            ...page,
            images: [...page.images, newImage],
          };
        }
        return page;
      })
    );
  };

  // const handleAddImage = async (pageId: string, file: File) => {
  //   const base64 = await toBase64(file);
  //   setZCounter(zCounter + 1);
  //   const newImg: ImageElement = {
  //     id: uuidv4(),
  //     src: base64 as string,
  //     x: 50,
  //     y: 50,
  //     width: 100,
  //     height: 100,
  //     zIndex: zCounter + 1,
  //   };
  //   setPages((prev) =>
  //     prev.map((p) => {
  //       if (p.id !== pageId) return p;
  //       return {
  //         ...p,
  //         images: [...p.images, newImg],
  //       };
  //     })
  //   );
  // };

  const handleAddLinkImage = (pageId: string, link: string) => {
    setZCounter(zCounter + 1);
    const newImg: ImageElement = {
      id: uuidv4(),
      src: link,
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
    bringImageToFront,
    deleteImage,
    updateImageInPage,
    addImageToPage,
    handleAddLinkImage,
  };
}
