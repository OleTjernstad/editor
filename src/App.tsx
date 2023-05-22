import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import GrainIcon from "@mui/icons-material/Grain";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const regex = /(?<paragraph>.+)(\r?\n)?/gm;

type BlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "image";
interface Block {
  key: string;
  text: string;
  type: BlockType;
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
  function updateBlockType(key: string | undefined, type: BlockType) {
    if (key === undefined) {
      addModule(isFocused.current, type);
    }
    setContent((prev) => {
      return prev.map((block) => {
        if (block.key === key) return { ...block, type };
        return block;
      });
    });
  }

  function addModule(keyBefore: string | undefined, type?: BlockType) {
    const createdKey = createId();
    console.log(createdKey);

    isFocused.current = createdKey;
    setContent((prev) => {
      const index = prev.findIndex((block) => block.key === keyBefore);

      const content = prev;
      content.splice(index + 1, 0, {
        key: createdKey,
        text: "",
        type: type ?? "paragraph",
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
      <BlockDialog
        isActive
        updateBlockType={updateBlockType}
        deleteBlock={removeBlock}
        icon={<AddIcon />}
      />
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
                updateBlockType={updateBlockType}
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
                updateBlockType={updateBlockType}
              />
            );
        }
      })}
    </div>
  );
}

export default App;

interface FieldProps {
  block: Block;
  update: (key: string, text: string) => void;
  addModule: (keyBefore: string) => void;
  isFocused: string | undefined;
  updateFocus: (key: string) => void;
  removeBlock: (key: string) => void;
  resetFocus: string | undefined;
  updateBlockType: (key: string | undefined, type: BlockType) => void;
}

type ParagraphFieldProps = FieldProps;
function ParagraphField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
  updateBlockType,
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

type TitleFieldProps = FieldProps;
function TitleField({
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

interface SelectBlockTypeProps {
  isActive: boolean;
  block?: Block;
  updateBlockType: (key: string | undefined, type: BlockType) => void;
}
function SelectBlockType({
  isActive,
  block,
  updateBlockType,
}: SelectBlockTypeProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (block) updateBlockType(block.key, event.target.value as BlockType);
  };

  return (
    <FormControl
      sx={{ mt: 2, minWidth: 120 }}
      disabled={!isActive}
      size="small"
      fullWidth
    >
      <InputLabel id="demo-simple-select-label">Tekst</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={block?.type}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={"paragraph"}>Tekst</MenuItem>
        <MenuItem value={"h1"}>Tittel 1</MenuItem>
        <MenuItem value={"h2"}>Tittel 2</MenuItem>
        <MenuItem value={"h3"}>Tittel 3</MenuItem>
        <MenuItem value={"h4"}>Tittel 4</MenuItem>
        <MenuItem value={"h5"}>Tittel 5</MenuItem>
        <MenuItem value={"h6"}>Tittel 6</MenuItem>
      </Select>
    </FormControl>
  );
}

type BlockDialogProps = SelectBlockTypeProps & {
  deleteBlock: (key: string) => void;
  icon: React.ReactNode;
};
function BlockDialog(props: BlockDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
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
          <SelectBlockType {...props} />
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
              onClick={() => props.updateBlockType(undefined, "image")}
            >
              <ImageIcon />
            </IconButton>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
