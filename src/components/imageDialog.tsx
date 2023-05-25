import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useState } from "react";

interface ImageDialogProps {
  any?: unknown;
}
export function ImageDialog(props: ImageDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function handleUpdate(key: string | undefined, type: BlockType) {
  //   if (props.addNewBlock) {
  //     props.addNewBlock(type);
  //     handleClose();
  //     return;
  //   }
  //   if (key) {
  //     props.updateBlockType(key, type);
  //   }
  // }

  return (
    <div>
      <Button
        aria-label="open image meta form"
        variant="contained"
        onClick={handleClickOpen}
      >
        <SettingsSuggestIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
