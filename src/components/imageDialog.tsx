import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Button from "@mui/material/Button";
import { Data } from "../types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import LockIcon from "@mui/icons-material/Lock";
import OutlinedInput from "@mui/material/OutlinedInput";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useState } from "react";

interface ImageDialogProps {
  baseSize: { height: number; width: number } | undefined;
  blockImage: Pick<Data, "image">;
  updateDimensions: (dim: { height: number; width: number }) => void;
}
export function ImageDialog({
  baseSize,
  updateDimensions,
  blockImage,
}: ImageDialogProps) {
  const [open, setOpen] = useState(false);

  const [aspectRatioLock, setAspectRatioLock] = useState<boolean>(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdateWidth(width: number) {
    if (aspectRatioLock) {
      if (baseSize) {
        updateDimensions({
          height: Math.ceil(
            determineNewHeight(baseSize.height, baseSize.width, width)
          ),
          width,
        });
      }
      return;
    }
    updateDimensions({
      height: blockImage.image?.height ?? 0,
      width,
    });
  }

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
                value={blockImage.image?.width ?? 0}
                onChange={(e) => handleUpdateWidth(Number(e.target.value))}
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
                value={blockImage.image?.height ?? 0}
                fullWidth
                onChange={(e) =>
                  updateDimensions({
                    height: Number(e.target.value),
                    width: blockImage.image?.width ?? 0,
                  })
                }
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

function determineNewHeight(
  originalHeight: number,
  originalWidth: number,
  newWidth: number
) {
  return (originalHeight / originalWidth) * newWidth;
}
