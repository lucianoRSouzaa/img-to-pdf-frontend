"use client";

import PageEditor from "./components/PageEditor";
import { ButtonAddPage } from "./components/ButtonAddPage";
import { PageTab } from "./components/PageTab";
import { useImages, usePage, usePdf } from "./hooks";

export default function Home() {
  const { pages, selectedPageId, setSelectedPageId, addPage, setPages } =
    usePage();

  const {
    selectedImageId,
    handleSelectImage,
    handleBringToFront,
    handleDeleteImage,
    handleUpdateImage,
    handleAddImage,
  } = useImages({
    selectedPageId,
    setSelectedPageId,
    setPages,
  });

  const { handleGeneratePDF } = usePdf({ pages });

  return (
    <div style={{ padding: 40 }}>
      <div className="flex justify-center gap-[8vw]">
        {pages.map((page, pageIndex) => (
          <PageEditor
            key={page.id}
            pageIndex={pageIndex}
            images={page.images}
            selectedId={
              selectedPageId === page.id
                ? selectedImageId ?? undefined
                : undefined
            }
            onSelectImage={(imgId) => handleSelectImage(page.id, imgId)}
            onBringToFront={(imgId) => handleBringToFront(page.id, imgId)}
            onDeleteImage={(imgId) => handleDeleteImage(page.id, imgId)}
            onUpdateImage={(img) => handleUpdateImage(page.id, img)}
            onAddImage={(file) => handleAddImage(page.id, file)}
          />
        ))}

        <div className="w-[512px]">
          <div className="h-[calc(94vh-30px)] rounded-2xl w-[32vw] max-w-[512px] fixed p-6 bg-dark">
            <div className="flex flex-col gap-5">
              <div className="border-b border-neutral-800 pb-2">
                <p className="text-neutral-600 font-semibold text-base">
                  Páginas
                </p>
              </div>

              <PageTab name="Página 1" />

              <ButtonAddPage onClickAddPage={addPage} />
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
