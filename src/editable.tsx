import { useEffect, useMemo, useRef } from "react";

interface EditableProps {
  content: string;
  onChange: (value: string) => void;
}
export function Editable({ content, onChange }: EditableProps) {
  const el = useRef<HTMLDivElement>(null);
  const lastHtml = useRef<string>();

  //   useEffect(() => {
  //     if (!el.current) return;

  //     // Perhaps React (whose VDOM gets outdated because we often prevent
  //     // rerendering) did not update the DOM. So we update it manually now.
  //     if (content !== el.current.innerHTML) {
  //       el.current.innerHTML = content;
  //     }
  //     lastHtml.current = content;
  //     replaceCaret(el.current);
  //   });

  function emitChange() {
    if (!el.current) return;

    const html = el.current?.innerHTML;
    if (onChange && html !== lastHtml.current) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"

      onChange(normalizeHtml(html ?? ""));
    }
    lastHtml.current = html;
  }
  return useMemo(
    () => (
      <div>
        <p
          ref={el}
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onBlur={emitChange}
          style={{ whiteSpace: "pre-wrap" }}
        ></p>
      </div>
    ),
    [content]
  );
}

function normalizeHtml(str: string): string {
  return (
    str && str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>")
  );
}

// function replaceCaret(el: HTMLElement) {
//   // Place the caret at the end of the element
//   const target = document.createTextNode("");
//   el.appendChild(target);
//   // do not move caret if element was not focused
//   const isTargetFocused = document.activeElement === el;
//   if (target !== null && target.nodeValue !== null && isTargetFocused) {
//     const sel = window.getSelection();
//     if (sel !== null) {
//       const range = document.createRange();
//       range.setStart(target, target.nodeValue.length);
//       range.collapse(true);
//       sel.removeAllRanges();
//       sel.addRange(range);
//     }
//     if (el instanceof HTMLElement) el.focus();
//   }
// }
