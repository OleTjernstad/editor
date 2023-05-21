import { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

const regex = /(?<paragraph>.+)(\r?\n)?/gm;

interface Block {
  key: string;
  text: string;
  type: "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
type Content = Block[];

function App() {
  const [content, setContent] = useState<Content>([
    {
      key: "dfdg",
      text: "Tittel tekst",
      type: "h1",
    },
    {
      key: "iostuhwhhth",
      text: "Dette er tekst",
      type: "paragraph",
    },
    {
      key: "iostsgbergbwhhth",
      text: "Dette er også en tekst",
      type: "paragraph",
    },
  ]);

  const isFocused = useRef<string>();
  const [resetFocus, setResetFocus] = useState<string>();

  function update(key: string, text: string) {
    setContent((prev) => {
      return prev.map((block) => {
        if (block.key === key) return { ...block, text };
        return block;
      });
    });
  }

  function addModule(keyBefore: string) {
    const createdKey = createId();
    console.log(createdKey);

    isFocused.current = createdKey;
    setContent((prev) => {
      const index = prev.findIndex((block) => block.key === keyBefore);

      const content = prev;
      content.splice(index + 1, 0, {
        key: createdKey,
        text: "",
        type: "paragraph",
      });
      return content;
    });
  }

  function removeBlock(key: string) {
    const index = content.findIndex((block) => block.key === key);
    if (content.length > 1) {
      const newIndex = index === 0 ? index + 1 : index - 1;
      isFocused.current = content[newIndex].key;
      setResetFocus(content[newIndex].key);
    }
    setContent((prev) => prev.filter((block) => block.key !== key));
  }

  function updateFocus(key: string) {
    isFocused.current = key;
    setResetFocus(key);
  }

  return (
    <div>
      {content.map((c) => {
        switch (c.type) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return (
              <TitleField
                block={c}
                update={update}
                key={c.key}
                addModule={addModule}
                isFocused={isFocused.current}
                removeBlock={removeBlock}
                resetFocus={resetFocus}
                updateFocus={updateFocus}
              />
            );

          default:
            return (
              <ParagraphField
                block={c}
                update={update}
                key={c.key}
                addModule={addModule}
                isFocused={isFocused.current}
                removeBlock={removeBlock}
                resetFocus={resetFocus}
                updateFocus={updateFocus}
              />
            );
        }
      })}
    </div>
  );
}

export default App;

interface ParagraphFieldProps {
  block: Block;
  update: (key: string, text: string) => void;
  addModule: (keyBefore: string) => void;
  isFocused: string | undefined;
  updateFocus: (key: string) => void;
  removeBlock: (key: string) => void;
  resetFocus: string | undefined;
}
function ParagraphField({
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
      addModule(block.key);
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
    if (preventChange.current) {
      preventChange.current = false;
      update(block.key, block.text);
      return;
    }
    update(block.key, e.target.value);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <IconButton
        aria-label="delete"
        disabled={resetFocus !== block.key}
        onClick={() => inputElement.current?.focus()}
      >
        <DeleteIcon />
      </IconButton>
      <TextField
        inputRef={inputElement}
        id={block.key}
        multiline
        value={block.text}
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

interface TitleFieldProps {
  block: Block;
  update: (key: string, text: string) => void;
  addModule: (keyBefore: string) => void;
  isFocused: string | undefined;
  updateFocus: (key: string) => void;
  removeBlock: (key: string) => void;
  resetFocus: string | undefined;
}
function TitleField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
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
      <IconButton
        aria-label="delete"
        disabled={resetFocus !== block.key}
        onClick={() => inputElement.current?.focus()}
      >
        <DeleteIcon />
      </IconButton>
      <TextField
        inputRef={inputElement}
        id={block.key}
        value={block.text}
        minRows={2}
        fullWidth
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: headerStyle(block.type),
        }}
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

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
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
