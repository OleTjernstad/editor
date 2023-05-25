import { SelectBlockType, SelectBlockTypeProps } from "./selectTextType";

import { BlockType } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";

type BlockDialogProps = SelectBlockTypeProps & {
  deleteBlock: (key: string) => void;
  icon: React.ReactNode;
};
export function BlockDialog(props: BlockDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdate(key: string | undefined, type: BlockType) {
    if (props.addNewBlock) {
      props.addNewBlock(type);
      handleClose();
      return;
    }
    if (key) {
      props.updateBlockType(key, type);
    }
  }

  return (
    <div>
      <IconButton
        aria-label="open tekst edit dialog"
        disabled={!props.isActive}
        onClick={handleClickOpen}
        sx={{
          "&.Mui-disabled": {
            background: "transparent",
            color: "transparent",
          },
        }}
      >
        {props.icon}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <SelectBlockType
            {...props}
            addNewBlock={(type) => handleUpdate(undefined, type)}
          />
          {props?.block?.key ? (
            <IconButton
              aria-label="delete"
              disabled={!props.isActive}
              onClick={() => props.deleteBlock(props?.block?.key ?? "")}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}
          {props?.block?.type === "image" || props?.block === undefined ? (
            <IconButton
              aria-label="add image"
              disabled={!props.isActive}
              onClick={() => handleUpdate(undefined, "image")}
            >
              <ImageIcon />
            </IconButton>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
