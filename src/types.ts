export type BlockType = "text" | "image";

export type TextLevel = "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type BlockImage = {
  name: string;
  height: number;
  width: number;
};

export interface Data {
  text?: string | undefined;
  level?: TextLevel | undefined;
  image?: BlockImage | undefined;
}

export type Block = {
  key: string;
  type: BlockType;
  data: Data | undefined;
};

export type Content = Block[];

export interface FieldProps {
  block: Block;
  update: (props: { data: Data; key: string }) => void;
  addModule: (
    props: {
      type: BlockType;
      data: Data;
    },
    activeKey: string | undefined
  ) => void;
  isFocused: string | undefined;
  updateFocus: (key: string) => void;
  removeBlock: (key: string) => void;
  resetFocus: string | undefined;
}
