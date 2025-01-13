"use client";

import { useState } from "react";
import PageEditor from "./components/PageEditor";
import { randomBytes } from "crypto";

interface ImageElement {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageData {
  id: string;
  images: ImageElement[];
}

export default function Home() {
  const [pages, setPages] = useState<PageData[]>([
    { id: randomBytes(2).toString(), images: [] },
  ]);

  const addPage = () => {
    setPages([...pages, { id: "nsknsaknaskas", images: [] }]);
  };

  const handleUpdateImage = (pageId: string, updatedImage: ImageElement) => {
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

  const handleDeleteImage = (pageId: string, imageId: string) => {
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

  const handleAddImage = async (pageId: string, file: File) => {
    const base64 = await toBase64(file);
    const newImg: ImageElement = {
      id: randomBytes(2).toString(),
      src: base64 as string,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    };
    setPages(
      pages.map((page) => {
        if (page.id === pageId) {
          return {
            ...page,
            images: [...page.images, newImg],
          };
        }
        return page;
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
      console.log({
        layout,
      });

      // Supondo que seu backend Python esteja rodando em http://localhost:5001
      // const response = await fetch("http://localhost:5001/generate_pdf", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(layout),
      // });
      // const data = await response.json();
      // if (data.pdf_url) {
      //   // Abrir o PDF numa nova aba, por ex:
      //   window.open(`http://localhost:5001${data.pdf_url}`, "_blank");
      // } else {
      //   console.error(data);
      //   alert("Erro ao gerar PDF");
      // }
    } catch (err) {
      console.error(err);
      alert("Falha na requisição");
    }
  };

  return (
    <div>
      <header className="w-full flex justify-center mt-4">
        <h1 className="text-4xl">Conversor - IMG para PDF</h1>
      </header>

      <main className="mt-9">
        {pages.map((page, idx) => (
          <PageEditor
            key={page.id}
            pageIndex={idx}
            images={page.images}
            onUpdateImage={(updatedImg) =>
              handleUpdateImage(page.id, updatedImg)
            }
            onAddImage={(file) => handleAddImage(page.id, file)}
            onDeleteImage={(imageId) => handleDeleteImage(page.id, imageId)}
          />
        ))}
      </main>

      <button onClick={addPage}>Adicionar Página</button>
      <button onClick={handleGeneratePDF}>Gerar PDF</button>
    </div>
  );
}

function toBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
