import { useRef, useState } from "react";

import { Editable } from "./editable";

function App() {
  // const [content, setContent] = useState<Content>([
  //   {
  //     key: "dfdg",
  //     data: {
  //       text: "Tittel tekst",
  //       level: "h1",
  //     },
  //     type: "text",
  //   },
  //   {
  //     key: "iostuhwhhth",
  //     data: {
  //       text: "Dette er tekst",
  //       level: "paragraph",
  //     },
  //     type: "text",
  //   },
  //   {
  //     key: "iostsgbergbwhhth",
  //     data: {
  //       text: "Dette er også en tekst",
  //       level: "paragraph",
  //     },
  //     type: "text",
  //   },
  // ]);

  const [text, setText] = useState<string>(
    "Tekst                                             gg"
  );

  console.log({ text });
  return <Editable content={text} onChange={console.log} />;
}

export default App;

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
}
