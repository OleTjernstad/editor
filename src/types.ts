export type BlockType = "text" | "image";

export type TextLevel = "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type BlockImage = {
  name: string;
  height: number;
  width: number;
};

export interface Content {
  text?: string | undefined;
  level?: TextLevel | undefined;
  image?: BlockImage | undefined;
}

export type Block = {
  key: string;
  type: BlockType;
  content: Content | undefined;
};

export type Blocks = Block[];

export interface FieldProps {
  block: Block;
  update: (key: string, text: string) => void;
  addModule: (keyBefore: string) => void;
  isFocused: string | undefined;
  updateFocus: (key: string) => void;
  removeBlock: (key: string) => void;
  resetFocus: string | undefined;
  updateBlockType: (key: string, type: BlockType) => void;
}
