import { useEffect, useRef } from "react";

import { BlockDialog } from "./blockDialog";
import { Box } from "@mui/material";
import { FieldProps } from "../types";
import GrainIcon from "@mui/icons-material/Grain";
import TextField from "@mui/material/TextField";

type TitleFieldProps = FieldProps;
export function TitleField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
  updateBlockType,
}: TitleFieldProps) {
  const inputElement = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      addModule(block.key);
      update(block.key, block.text + " ");
    }
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      block.text.length === 0
    ) {
      removeBlock(block.key);
    }
  }

  useEffect(() => {
    if (block.key === resetFocus) {
      inputElement.current?.focus();
    }
  }, [block.key, resetFocus]);

  function handleUpdate(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    update(block.key, e.target.value);
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
      <TextField
        inputRef={inputElement}
        id={block.key}
        value={block.text}
        fullWidth
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: headerStyle(block.type),
        }}
        onChange={handleUpdate}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text/plain");
          console.log(text);
        }}
        autoFocus={isFocused === block.key}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => updateFocus(block.key)}
      />
    </Box>
  );
}

function headerStyle(header: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | string) {
  switch (header) {
    case "h1":
      return {
        fontSize: "30px",
      };

    default:
      break;
  }
}
