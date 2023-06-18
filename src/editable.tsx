import { useMemo, useRef } from "react";

interface EditableProps {
  content: string;
  onChange: (val: any) => void;
}
export function Editable({ content, onChange }: EditableProps) {
  const el = useRef<HTMLDivElement>(null);
  const lastHtml = useRef<string>();

  function emitChange(originalEvt: React.KeyboardEvent<HTMLDivElement>) {
    if (!el) return;

    const html = el.current?.innerHTML;
    if (onChange && html !== lastHtml.current) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: normalizeHtml(html ?? ""),
        },
      });
      onChange(evt);
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
          onKeyDown={emitChange}
          onInput={emitChange}
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
