import { BlockDialog } from "./blockDialog";
import Box from "@mui/material/Box";
import { FieldProps } from "../types";
import GrainIcon from "@mui/icons-material/Grain";
import { ImageDialog } from "./imageDialog";
import { NewImage } from "./imageZone";
import { getImageSize } from "react-image-size";
import { useState } from "react";

type ImageFieldProps = FieldProps;
export function ImageField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
  updateBlockType,
}: ImageFieldProps) {
  const [selectImage, setSelectImage] = useState<boolean>(true);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [showImageMeta, setShowImageMeta] = useState<boolean>(false);
  const [baseSize, setBaseSize] = useState<{ height: number; width: number }>();

  async function handleImage(files: File[]) {
    setImage(files[0]);
    const imgUrl = URL.createObjectURL(files[0]);
    const dimensions = await getImageSize(imgUrl);
    setBaseSize(dimensions);
    setImageUrl(imgUrl);
    setSelectImage(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <BlockDialog
        block={block}
        isActive={resetFocus === block.key}
        updateBlockType={updateBlockType}
        deleteBlock={removeBlock}
        icon={<GrainIcon />}
      />
      {selectImage ? (
        <NewImage setImage={handleImage} />
      ) : (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <img src={imageUrl} />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
            }}
          >
            <ImageDialog baseSize={baseSize} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
