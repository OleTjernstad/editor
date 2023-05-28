import { Block, BlockType, Blocks, Content } from "./types";
import { useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { BlockDialog } from "./components/blockDialog";
import { ImageField } from "./components/imageField";
import { ParagraphField } from "./components/paragraph";
import { TitleField } from "./components/titleField";

function App() {
  const [content, setContent] = useState<Blocks>([
    {
      key: "dfdg",
      content: {
        text: "Tittel tekst",
        level: "h1",
      },
      type: "text",
    },
    {
      key: "iostuhwhhth",
      content: {
        text: "Dette er tekst",
        level: "paragraph",
      },
      type: "text",
    },
    {
      key: "iostsgbergbwhhth",
      content: {
        text: "Dette er også en tekst",
        level: "paragraph",
      },
      type: "text",
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

  function addModule({
    keyBefore,
    reset,
    content,
    type,
  }: {
    keyBefore: string | undefined;
    reset?: boolean;
    type: BlockType;
    content: Content;
  }) {
    const createdKey = createId();
    console.log(createdKey);

    isFocused.current = createdKey;

    setContent((prev) => {
      const index = prev.findIndex((block) => block.key === keyBefore);

      const blocks = prev;
      if (type === "image") {
        blocks.splice(index + 1, 0, {
          key: createdKey,
          content: { image: content?.image },
          type: type,
        });
        return blocks;
      }
      blocks.splice(index + 1, 0, {
        key: createdKey,
        content: { level: content?.level, text: content?.text },
        type: type,
      });
      return blocks;
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

  function handleNewBlock(type: BlockType, _content: Content) {
    console.log({ type });
    let key = isFocused.current;
    if (!isFocused.current) {
      if (content.length > 0) {
        key = content[content.length - 1].key;
      }
    }
    addModule({
      keyBefore: key,
      type,
      reset: true,
      content: _content,
    });
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
          case "text":
            if (c.content?.level === "paragraph") {
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

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
}
