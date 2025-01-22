import { FileIconSVG, TrashIconSVG } from "./svg";

export function PageTab() {
  return (
    <div className="p-4 border border-neutral-700 flex items-center justify-between rounded-2xl">
      <div className="flex items-center gap-4">
        <FileIconSVG />
        <p className="text-neutral-100 text-sm">Página 1</p>
      </div>

      <TrashIconSVG />
    </div>
  )
}