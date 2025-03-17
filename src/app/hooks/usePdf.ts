import { PageData } from "./usePages";

interface usePdfProps {
  pages: PageData[];
}

export function usePdf({ pages }: usePdfProps) {
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

    console.log({
      layout,
    });

    // try {
    //   const response = await fetch("http://localhost:5001/generate_pdf", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(layout),
    //   });
    //   const data = await response.json();
    //   if (data.pdf_url) {
    //     window.open(`http://localhost:5001${data.pdf_url}`, "_blank");
    //   } else {
    //     console.error(data);
    //     alert("Erro ao gerar PDF");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert("Falha na requisição");
    // }
  };

  return {
    handleGeneratePDF,
  };
}
