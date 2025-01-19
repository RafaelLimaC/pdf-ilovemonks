import { Upload } from "lucide-react";
import { useCallback } from "react";

interface FileDropzoneProps {
  onFilesDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

const FileDropzone = ({
  onFilesDrop,
  accept = ".pdf",
  multiple = false,
}: FileDropzoneProps) => {
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onFilesDrop(files);
    },
    [onFilesDrop]
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesDrop(files);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-gray-500"
    >
      <input
        type="file"
        onChange={onFileSelect}
        accept={accept}
        multiple={multiple}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-500" />
        <p className="text-lg font-medium text-gray-900">
          Arraste e solte seus arquivos aqui
        </p>
        <p className="mt-2 text-sm text-gray-600">ou clique para selecionar</p>
      </label>
    </div>
  );
};

export default FileDropzone;
