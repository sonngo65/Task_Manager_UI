import { Children, cloneElement, useState } from "react";
import "./_inner-input.scss";
export default function InnerInput({
  type,
  label,
  value,
  keyId,
  name,
  isFocus,
  children,
  onChange,
  onFocus,
}) {
  const renderChildren = () => {
    return Children.map(children, (child) =>
      cloneElement(child, {
        type: type,
        onChange: onChange,
        onFocus: onFocus,
        keyId: keyId,
        value: value,
      })
    );
  };
  // children.props = { ...children.props, type, keyId, onChange, onFocus };
  return (
    <label
      className={"inner-input " + (isFocus || value !== "" ? "focus" : "")}
    >
      <span className="inner-input__label"> {label}</span>
      {renderChildren()}

      <span className="inner-input__line-bottom"></span>
    </label>
  );
}
