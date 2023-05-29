import { BlockType, Content, Data } from "./types";
import { useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { BlockDialog } from "./components/blockDialog";
import { ImageField } from "./components/imageField";
import { ParagraphField } from "./components/paragraph";
import { TitleField } from "./components/titleField";

function App() {
  const [content, setContent] = useState<Content>([
    {
      key: "dfdg",
      data: {
        text: "Tittel tekst",
        level: "h1",
      },
      type: "text",
    },
    {
      key: "iostuhwhhth",
      data: {
        text: "Dette er tekst",
        level: "paragraph",
      },
      type: "text",
    },
    {
      key: "iostsgbergbwhhth",
      data: {
        text: "Dette er også en tekst",
        level: "paragraph",
      },
      type: "text",
    },
  ]);

  const isFocused = useRef<string>();
  const [resetFocus, setResetFocus] = useState<string>();

  function updateBlock({ data, key }: { data: Data; key: string }) {
    setContent((prev) => {
      return prev.map((block) => {
        if (block.key === key) return { ...block, data };
        return block;
      });
    });
  }

  function addModule(
    {
      reset,
      data,
      type,
    }: {
      reset?: boolean;
      type: BlockType;
      data: Data;
    },
    activeKey: string | undefined
  ) {
    const createdKey = createId();
    console.log(createdKey);

    isFocused.current = createdKey;

    setContent((prev) => {
      const index = prev.findIndex((block) => block.key === activeKey);

      const blocks = prev;
      if (type === "image") {
        blocks.splice(index + 1, 0, {
          key: createdKey,
          data: { image: data?.image },
          type: type,
        });
        return blocks;
      }
      blocks.splice(index + 1, 0, {
        key: createdKey,
        data: { level: data?.level, text: data?.text },
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

  function handleNewBlock({ data, type }: { type: BlockType; data: Data }) {
    console.log({ type });
    let key = isFocused.current;
    if (!isFocused.current) {
      if (content.length > 0) {
        key = content[content.length - 1].key;
      }
    }
    addModule(
      {
        type,
        reset: true,
        data: data,
      },
      key
    );
  }

  return (
    <div>
      <BlockDialog
        isActive
        updateBlock={updateBlock}
        deleteBlock={removeBlock}
        icon={<AddIcon />}
        addNewBlock={handleNewBlock}
      />
      {content.map((c) => {
        switch (c.type) {
          case "text":
            if (c.data?.level === "paragraph") {
              return (
                <ParagraphField
                  block={c}
                  update={updateBlock}
                  key={c.key}
                  addModule={addModule}
                  isFocused={isFocused.current}
                  removeBlock={removeBlock}
                  resetFocus={resetFocus}
                  updateFocus={updateFocus}
                />
              );
            }
            return (
              <TitleField
                block={c}
                update={updateBlock}
                key={c.key}
                addModule={addModule}
                isFocused={isFocused.current}
                removeBlock={removeBlock}
                resetFocus={resetFocus}
                updateFocus={updateFocus}
              />
            );
          case "image":
            return (
              <ImageField
                block={c}
                update={updateBlock}
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
                update={updateBlock}
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

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
}
