"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PageEditor, { ImageElement } from "./components/PageEditor";

interface PageData {
  id: string;
  images: ImageElement[];
}

export default function Home() {
  const [pages, setPages] = useState<PageData[]>([
    { id: uuidv4(), images: [] },
  ]);

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const [zCounter, setZCounter] = useState(1);

  const addPage = () => {
    setPages((prev) => [...prev, { id: uuidv4(), images: [] }]);
  };

  const handleSelectImage = (pageId: string, imageId: string) => {
    setSelectedPageId(pageId);
    setSelectedImageId(imageId);
  };

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

  const handleGeneratePDF = async () => {
    const layout = {
      pages: pages.map((page) => ({
        elements: page.images.map((img) => ({
          type: "image",
          sourceType: "upload",
          base64: img.src,
          x: img.x,
          y: img.y,
          width: img.width,
          height: img.height,
        })),
      })),
    };

    try {
      const response = await fetch("http://localhost:5001/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layout),
      });
      const data = await response.json();
      if (data.pdf_url) {
        window.open(`http://localhost:5001${data.pdf_url}`, "_blank");
      } else {
        console.error(data);
        alert("Erro ao gerar PDF");
      }
    } catch (err) {
      console.error(err);
      alert("Falha na requisição");
    }
  };

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
            <div className="border-b border-neutral-800 pb-2">
              <p className="text-neutral-600 font-semibold text-base">
                Páginas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={addPage}>Adicionar Página</button>
        <button onClick={handleGeneratePDF} style={{ marginLeft: 10 }}>
          Gerar PDF
        </button>
      </div>
    </div>
  );
}

// Helper para converter File em base64
function toBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}
