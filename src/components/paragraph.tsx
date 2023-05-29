import { useEffect, useRef } from "react";

import { BlockDialog } from "./blockDialog";
import { Box } from "@mui/material";
import { FieldProps } from "../types";
import GrainIcon from "@mui/icons-material/Grain";
import TextField from "@mui/material/TextField";

const regex = /(?<paragraph>.+)(\r?\n)?/gm;

type ParagraphFieldProps = FieldProps;
export function ParagraphField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
}: ParagraphFieldProps) {
  const preventChange = useRef<boolean>();
  const inputElement = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      preventChange.current = true;
      addModule(
        {
          type: "text",
          data: {
            level: "paragraph",
          },
        },
        block.key
      );
    }
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      block.data?.text &&
      block.data?.text.length === 0
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
    if (preventChange.current) {
      preventChange.current = false;

      update({
        data: {
          text: block.data?.text ?? "",
        },
        key: block.key,
      });
      return;
    }

    update({
      data: {
        text: e.target.value,
      },
      key: block.key,
    });
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
      <TextField
        inputRef={inputElement}
        id={block.key}
        multiline
        value={block.data?.text}
        minRows={1}
        fullWidth
        variant="standard"
        InputProps={{ disableUnderline: true }}
        onChange={handleUpdate}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text/plain");
          console.log(text.match(regex));
        }}
        autoFocus={isFocused === block.key}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => updateFocus(block.key)}
      />
    </Box>
  );
}
