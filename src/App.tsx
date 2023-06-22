import { Editable } from "./editable";
import { useRef } from "react";

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

  // const [text, setText] = useState<string>(
  //   "Tekst                                             gg"
  // );
  const text = useRef<string>("");

  console.log({ text });
  return (
    <>
      <button onClick={() => (text.current = text.current + " bla bla bal")}>
        Addddd
      </button>
      <Editable
        content={text.current}
        onChange={(e) => {
          text.current = e;
          console.log(e);
        }}
      />
    </>
  );
}

export default App;

function createId() {
  const time = new Date().getTime();
  return time.toString(36);
}
