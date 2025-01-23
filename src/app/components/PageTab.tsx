import { FileIconSVG, TrashIconSVG } from "./svg";

type PageTabProps = {
  name: string;
}

export function PageTab({ name }: PageTabProps) {
  return (
    <div className="p-3 border border-neutral-700 flex items-center justify-between rounded-2xl">
      <div className="flex items-center gap-4">
        <FileIconSVG />
        <p className="text-neutral-300 text-base">{name}</p>
      </div>

      <TrashIconSVG />
    </div>
  )
}