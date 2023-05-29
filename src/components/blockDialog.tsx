import { BlockType, Data, TextLevel } from "../types";
import { SelectBlockType, SelectBlockTypeProps } from "./selectTextType";

import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";

type BlockDialogProps = Pick<SelectBlockTypeProps, "isActive" | "block"> & {
  deleteBlock: (key: string) => void;
  icon: React.ReactNode;
  updateBlock: (props: { data: Data; key: string }) => void;
  addNewBlock?: (props: { type: BlockType; data: Data }) => void;
};
export function BlockDialog({
  deleteBlock,
  icon,
  isActive,
  block,
  addNewBlock,
  updateBlock,
}: BlockDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleTextLevel(level: TextLevel) {
    if (addNewBlock) {
      addNewBlock({
        type: "text",
        data: {
          level,
          text: "",
        },
      });
      return;
    }
    if (block)
      updateBlock({
        data: {
          level,
        },
        key: block.key,
      });
  }

  function handleUpdate(type: BlockType) {
    if (type === "image") {
      if (addNewBlock) {
        addNewBlock({
          data: {
            image: {
              height: 0,
              name: "",
              width: 0,
            },
          },
          type,
        });
        handleClose();
        return;
      }
      // if (key) {
      //   updateBlockType(key, type);
      // }}
    }
  }

  return (
    <div>
      <IconButton
        aria-label="open tekst edit dialog"
        disabled={!isActive}
        onClick={handleClickOpen}
        sx={{
          "&.Mui-disabled": {
            background: "transparent",
            color: "transparent",
          },
        }}
      >
        {icon}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <SelectBlockType
            isActive={
              isActive && (block?.type === "text" || block?.type === undefined)
            }
            updateLevel={handleTextLevel}
            block={block}
          />
          {block?.key ? (
            <IconButton
              aria-label="delete"
              disabled={!isActive}
              onClick={() => deleteBlock(block?.key ?? "")}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}
          {block?.type === "image" || block === undefined ? (
            <IconButton
              aria-label="add image"
              disabled={!isActive}
              onClick={() => handleUpdate("image")}
            >
              <ImageIcon />
            </IconButton>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
