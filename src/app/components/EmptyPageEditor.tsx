import { BaseButtonEmptyState } from "./BaseButtonEmptyState";
import { FolderIconSVG, LinkIconSVG, PictureIconSVG } from "./svg";

interface EmptyPageEditorProps {
  openFileExplorer: () => void;
  handleAddLinkImage: (link: string) => void;
}

export const EmptyPageEditor = ({
  handleAddLinkImage,
  openFileExplorer,
}: EmptyPageEditorProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-10 items-center">
        <PictureIconSVG />

        <div className="flex flex-col gap-2 items-center">
          <BaseButtonEmptyState
            svg={<FolderIconSVG />}
            onClick={openFileExplorer}
            text="Navegue pelos seus arquivos"
          />

          <p className="text-neutral-500 text-base">ou</p>

          <BaseButtonEmptyState
            svg={<LinkIconSVG />}
            onClick={() =>
              handleAddLinkImage("https://placehold.co/600x400.jpg")
            }
            text="Insira o link de uma imagem"
          />
        </div>
      </div>
    </div>
  );
};
