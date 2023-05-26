import { useEffect, useState } from "react";

import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import LockIcon from "@mui/icons-material/Lock";
import OutlinedInput from "@mui/material/OutlinedInput";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

interface ImageDialogProps {
  baseSize: { height: number; width: number } | undefined;
}
export function ImageDialog({ baseSize }: ImageDialogProps) {
  const [open, setOpen] = useState(false);

  const [height, setHeight] = useState<number>();

  const [width, setWidth] = useState<number>();
  const [aspectRatioLock, setAspectRatioLock] = useState<boolean>(true);

  useEffect(() => {
    setHeight(baseSize?.height);
    setWidth(baseSize?.width);
  }, [baseSize]);

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
        <DialogContent>
          <form>
            <FormControl variant="outlined" fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="width-input">Bredde</InputLabel>
              <OutlinedInput
                fullWidth
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                id="width-input"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setAspectRatioLock(!aspectRatioLock)}
                      edge="start"
                    >
                      {aspectRatioLock ? <LockIcon /> : <AspectRatioIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Bredde"
              />
            </FormControl>

            <FormControl
              variant="outlined"
              fullWidth
              sx={{ m: 1 }}
              disabled={aspectRatioLock}
            >
              <InputLabel htmlFor="height-input">Høyde</InputLabel>
              <OutlinedInput
                value={height}
                fullWidth
                onChange={(e) => setHeight(Number(e.target.value))}
                id="height-input"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setAspectRatioLock(!aspectRatioLock)}
                      edge="start"
                    >
                      {aspectRatioLock ? <LockIcon /> : <AspectRatioIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Høyde"
              />
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
