interface ButtonExportPdfProps {
  onClickExportPdf: () => void;
}

export function ButtonExportPdf({ onClickExportPdf }: ButtonExportPdfProps) {
  return (
    <button
      className="px-6 py-5 bg-light hover:bg-neutral-300 transition-all duration-200 rounded-2xl cursor-pointer"
      onClick={onClickExportPdf}
    >
      <p className="text-dark font-semibold text-base">Exportar PDF</p>
    </button>
  );
}
