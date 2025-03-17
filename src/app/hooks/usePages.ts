"use client";

import { useState } from "react";
import { ImageElement } from "../components/PageEditor";

export type Page = {
  id: string;
  images: ImageElement[];
};

export function usePage() {
  const [pages, setPages] = useState<Page[]>([{ id: "page-1", images: [] }]);
  const [activePage, setActivePage] = useState<string>("page-1");

  const addNewPage = () => {
    const newPageId = `page-${pages.length + 1}`;
    setPages([...pages, { id: newPageId, images: [] }]);
    setActivePage(newPageId);
  };

  return {
    pages,
    addNewPage,
    setPages,
    activePage,
    setActivePage,
  };
}
