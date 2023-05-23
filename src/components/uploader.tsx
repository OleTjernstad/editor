import { Accept, useDropzone } from "react-dropzone";

import BackupIcon from "@mui/icons-material/Backup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface DropZoneProps {
  accept: Accept;

  setFile: (file: File[]) => void;
  children?: React.ReactNode;
  files?: File[];
  multiple?: boolean;
}
export function DropZone({
  accept,
  setFile,
  children,
  files,
  multiple = false,
}: DropZoneProps) {
  function duplicateFileValidator(file: File) {
    const simFile = files?.filter((f) => f.name === file.name);
    if (simFile && simFile?.length > 0) {
      return {
        code: "duplicate-name",
        message: "Fil er allerede lagt til.",
      };
    }

    return null;
  }
  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple,
    accept,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles);
    },
    validator: duplicateFileValidator,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <Box
        {...getRootProps()}
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          borderWidth: 2,
          borderRadius: 2,
          borderColor: "#eeeeee",
          borderStyle: "dashed",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          outline: "none",
          transition: "border .24s ease-in-out",
          ...(isDragActive ? { borderColor: theme.palette.info.main } : {}),
          ...(isDragAccept ? { borderColor: theme.palette.success.main } : {}),
          ...(isDragReject ? { borderColor: theme.palette.error.main } : {}),
        })}
      >
        <input {...getInputProps()} />
        <Button color="primary" startIcon={<BackupIcon />}>
          Dra og slipp fil(er) her, eller klikk og velg
        </Button>
      </Box>
      <aside>
        {fileRejections.length > 0 && (
          <>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
        {children}
      </aside>
    </section>
  );
}
