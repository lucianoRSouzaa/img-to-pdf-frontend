import { AddIconSVG } from "./svg";

interface ButtonAddPageProps {
  onClickAddPage: () => void;
}

export function ButtonAddPage({ onClickAddPage }: ButtonAddPageProps) {
  return (
    <div
      className="p-4 flex gap-2 items-center justify-center hover:bg-neutral-800 transition-all duration-200 rounded-2xl cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23B3B3B3FF' stroke-width='3' stroke-dasharray='8%2c 14' stroke-dashoffset='13' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
      onClick={onClickAddPage}
    >
      <AddIconSVG height="24" width="24" />
      <p className="text-neutral-300 text-base">Nova página</p>
    </div>
  );
}
