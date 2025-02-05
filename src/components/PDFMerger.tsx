import { Button } from "@/components/ui/button";
import { mergePDFs } from "@/utils/pdfUtils";
import { File, GripVertical, X } from "lucide-react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "sonner";
import FileDropzone from "./FileDropzone";

const PDFMerger = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesDrop = (newFiles: File[]) => {
    const pdfFiles = newFiles.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length !== newFiles.length) {
      toast.error("Apenas arquivos PDF são permitidos");
      return;
    }
    setFiles([...files, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("Selecione pelo menos 2 arquivos para juntar");
      return;
    }

    try {
      const mergedPDF = await mergePDFs(files);
      const blob = new Blob([mergedPDF], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDFs unidos com sucesso!");
    } catch (error) {
      toast.error("Erro ao unir os PDFs");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <FileDropzone onFilesDrop={handleFilesDrop} multiple />

      {files.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pdf-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {files.map((file, index) => (
                  <Draggable
                    key={`${file.name}-${index}`}
                    draggableId={`${file.name}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <div {...provided.dragHandleProps} className="mr-3">
                          <GripVertical className="text-gray-400" />
                        </div>
                        <File className="mr-2 h-5 w-5 text-red-500" />
                        <span className="flex-1 truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {files.length >= 2 && (
        <Button onClick={handleMerge} className="w-full hover:bg-accent">
          Juntar PDFs
        </Button>
      )}
    </div>
  );
};

export default PDFMerger;
