import { useState } from "react";
import "./_inner-input.scss";
export default function InnerTextarea({
  label,
  keyId,
  type,
  value,
  onChange,
  onFocus,
}) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <label className={"inner-input " + (isFocus || value ? "focus" : "")}>
      <span className="inner-input__label"> {label}</span>
      <textarea
        id={"inner-input__input-" + { keyId }}
        className="inner-input__input"
        onChange={onChange}
        onMouseDown={(e) => onFocus(e, keyId, setIsFocus)}
      ></textarea>

      <span className="inner-input__line-bottom"></span>
    </label>
  );
}
