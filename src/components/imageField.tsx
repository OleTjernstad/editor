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
}: ImageFieldProps) {
  const [selectImage, setSelectImage] = useState<boolean>(true);
  const [image, setImage] = useState<File>();

  const [showImageMeta, setShowImageMeta] = useState<boolean>(false);
  const [baseSize, setBaseSize] = useState<{ height: number; width: number }>();

  async function handleImage(files: File[]) {
    setImage(files[0]);
    const imgUrl = URL.createObjectURL(files[0]);
    const dimensions = await getImageSize(imgUrl);
    setBaseSize(dimensions);
    update({
      data: {
        image: {
          ...dimensions,
          name: imgUrl,
        },
      },
      key: block.key,
    });
    setSelectImage(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <BlockDialog
        block={block}
        isActive={resetFocus === block.key}
        updateBlock={update}
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
          <img
            src={block.data?.image?.name}
            width={block.data?.image?.width}
            height={block.data?.image?.height}
          />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
            }}
          >
            <ImageDialog
              baseSize={baseSize}
              updateDimensions={(dim) =>
                update({
                  data: {
                    image: {
                      name: block.data?.image?.name ?? "",
                      ...dim,
                    },
                  },
                  key: block.key,
                })
              }
              blockImage={{ image: block.data?.image }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
