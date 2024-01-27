function InnerTextareaTag({ type, keyId, value, onChange, onFocus }) {
  return (
    <textarea
      type={type}
      id={"inner-input__input-" + keyId}
      className="inner-input__input"
      onChange={onChange}
      value={value}
      onFocus={onFocus}
    ></textarea>
  );
}
export default InnerTextareaTag;
