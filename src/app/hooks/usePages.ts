"use client";

import { useState } from "react";
import { ImageElement } from "../components/PageEditor";
import { v4 as uuidv4 } from "uuid";

export interface PageData {
  id: string;
  images: ImageElement[];
}

export function usePage() {
  const [pages, setPages] = useState<PageData[]>([
    { id: uuidv4(), images: [] },
  ]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const addPage = () => {
    setPages((prev) => [...prev, { id: uuidv4(), images: [] }]);
  };

  return {
    pages,
    addPage,
    setPages,
    selectedPageId,
    setSelectedPageId,
  };
}
