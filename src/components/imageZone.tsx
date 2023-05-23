import Box from "@mui/material/Box";
import { DropZone } from "../components/uploader";

interface NewImageProps {
  setImage: (file: File[]) => void;
}
export function NewImage({ setImage }: NewImageProps) {
  return (
    <DropZone
      accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
      setFile={setImage}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* {images.map((img) => (
              <NewImageCard key={img.name} file={img} setFiles={setImages} />
            ))} */}
      </Box>
    </DropZone>
  );
}
