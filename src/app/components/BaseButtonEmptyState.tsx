interface BaseButtonEmptyStateProps {
  onClick: () => void;
  text: string;
  svg?: React.ReactNode;
}

export function BaseButtonEmptyState({
  onClick,
  text,
  svg,
}: BaseButtonEmptyStateProps) {
  return (
    <div
      className="py-3 px-6 flex gap-2 items-center justify-center border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-200 rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      {svg}
      <p className="text-neutral-600 text-base">{text}</p>
    </div>
  );
}
