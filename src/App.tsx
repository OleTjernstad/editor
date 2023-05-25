import { BlockType, Content, FieldProps } from "./types";
import { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { BlockDialog } from "./components/blockDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GrainIcon from "@mui/icons-material/Grain";
import { ImageDialog } from "./components/imageDialog";
import { NewImage } from "./components/imageZone";
import { ParagraphField } from "./components/paragraph";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { TitleField } from "./components/titleField";

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
  function updateBlockType(key: string, type: BlockType) {
    setContent((prev) => {
      return prev.map((block) => {
        if (block.key === key) return { ...block, type };
        return block;
      });
    });
  }

  function addModule(
    keyBefore: string | undefined,
    type?: BlockType,
    reset?: boolean
  ) {
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
    if (reset) {
      setResetFocus(createdKey);
    }
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

  function handleNewBlock(type: BlockType) {
    console.log({ type });
    let key = isFocused.current;
    if (!isFocused.current) {
      if (content.length > 0) {
        key = content[content.length - 1].key;
      }
    }
    addModule(key, type, true);
  }

  return (
    <div>
      <BlockDialog
        isActive
        updateBlockType={updateBlockType}
        deleteBlock={removeBlock}
        icon={<AddIcon />}
        addNewBlock={handleNewBlock}
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
          case "image":
            return (
              <ImageField
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

type ImageFieldProps = FieldProps;
function ImageField({
  block,
  update,
  addModule,
  isFocused,
  removeBlock,
  resetFocus,
  updateFocus,
  updateBlockType,
}: ImageFieldProps) {
  const [selectImage, setSelectImage] = useState<boolean>(true);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [showImageMeta, setShowImageMeta] = useState<boolean>(false);

  function handleImage(files: File[]) {
    setImage(files[0]);
    setImageUrl(URL.createObjectURL(files[0]));
    setSelectImage(false);
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
      {selectImage ? (
        <NewImage setImage={handleImage} />
      ) : (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <img src={imageUrl} />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
            }}
          >
            <ImageDialog />
          </Box>
        </Box>
      )}
    </Box>
  );
}

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
}
