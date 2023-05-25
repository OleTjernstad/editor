import { Block, BlockType } from "../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export interface SelectBlockTypeProps {
  isActive: boolean;
  block?: Block;
  updateBlockType: (key: string, type: BlockType) => void;
  addNewBlock?: (type: BlockType) => void;
}
export function SelectBlockType({
  isActive,
  block,
  updateBlockType,
  addNewBlock,
}: SelectBlockTypeProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (block) {
      updateBlockType(block.key, event.target.value as BlockType);
      return;
    }
    if (addNewBlock) {
      addNewBlock(event.target.value as BlockType);
    }
  };

  return (
    <FormControl
      sx={{ mt: 2, minWidth: 120 }}
      disabled={!isActive}
      size="small"
      fullWidth
    >
      <InputLabel id="block-type-select-label">Tekst</InputLabel>
      <Select
        labelId="block-type-select-label"
        id="block-type-select"
        value={block?.type ?? ""}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={""}></MenuItem>
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
