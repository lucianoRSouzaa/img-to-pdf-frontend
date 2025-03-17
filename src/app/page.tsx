"use client";

import PageEditor, { ImageElement } from "./components/PageEditor";
import { ButtonAddPage } from "./components/ButtonAddPage";
import { PageTab } from "./components/PageTab";
import { Page, useImages, usePage, usePdf } from "./hooks";
import { ButtonExportPdf } from "./components/ButtonExportPdf";
import { useState } from "react";

export default function Home() {
  // const { pages, activePage, addNewPage, setActivePage, setPages } = usePage();

  // const {
  //   selectedImageId,
  //   handleSelectImage,
  //   addImageToPage,
  //   bringImageToFront,
  //   deleteImage,
  //   updateImageInPage,
  //   handleAddLinkImage,
  // } = useImages({
  //   pages,
  //   setActivePage,
  //   setPages,
  //   selectedPageId: activePage,
  // });

  const [pages, setPages] = useState<Page[]>([{ id: "page-1", images: [] }]);
  const [activePage, setActivePage] = useState<string>("page-1");

  const addNewPage = () => {
    const newPageId = `page-${pages.length + 1}`;
    setPages([...pages, { id: newPageId, images: [] }]);
    setActivePage(newPageId);
  };

  const addImageToPage = (pageId: string, base64: string) => {
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          const maxZIndex =
            page.images.length > 0
              ? Math.max(...page.images.map((img) => img.zIndex))
              : 0;

          const newImage: ImageElement = {
            id: `image-${page.images.length + 1}-${Date.now()}`,
            src: base64,
            width: 200,
            height: 200,
            x: 50,
            y: 50,
            zIndex: maxZIndex + 1, // Place new image on top
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

  const { handleGeneratePDF } = usePdf({ pages });

  return (
    <div style={{ padding: 40 }}>
      <div className="flex justify-center gap-[8vw]">
        <div className="flex flex-col gap-3">
          {pages.map((page, idx) => (
            <PageEditor
              key={page.id}
              page={page}
              isActive={page.id === activePage}
              onPageClick={() => setActivePage(page.id)}
              onImageUpdate={(updatedImage) =>
                updateImageInPage(page.id, updatedImage)
              }
              onImageClick={(imageId) => bringImageToFront(page.id, imageId)}
              onImageDelete={(imageId) => deleteImage(page.id, imageId)}
              onImageSelected={addImageToPage}
              pageIndex={idx}
            />
          ))}
        </div>

        <div className="w-[512px]">
          <div className="h-[calc(94vh-30px)] rounded-2xl w-[32vw] max-w-[512px] fixed p-6 bg-dark">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-5">
                <div className="border-b border-neutral-800 pb-2">
                  <p className="text-neutral-600 font-semibold text-base">
                    Páginas
                  </p>
                </div>

                <PageTab name="Página 1" />

                <ButtonAddPage onClickAddPage={addNewPage} />
              </div>

              <ButtonExportPdf onClickExportPdf={handleGeneratePDF} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={handleGeneratePDF} style={{ marginLeft: 10 }}>
          Gerar PDF
        </button>
      </div>
    </div>
  );
}
