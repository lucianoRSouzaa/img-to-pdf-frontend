import { useState } from "react";
import { ImageElement } from "../components/PageEditor";
import { v4 as uuidv4 } from "uuid";

interface PageData {
  id: string;
  images: ImageElement[];
}

export function usePage() {
  const [pages, setPages] = useState<PageData[]>([
    { id: uuidv4(), images: [] },
  ]);

  const addPage = () => {
    setPages((prev) => [...prev, { id: uuidv4(), images: [] }]);
  };

  return {
    pages,
    addPage,
    setPages,
  };
}
