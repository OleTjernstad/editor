export type BlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "image";

export type BlockImage = {
  name: string;
  height: number;
  width: number;
};

export interface Block {
  key: string;
  text: string;
  type: BlockType;
  image?: BlockImage | undefined;
}

export type Content = Block[];

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
