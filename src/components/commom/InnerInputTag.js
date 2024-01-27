function InnerInputTag({ type, keyId, value, onChange, onFocus }) {
  return (
    <input
      type={type}
      id={"inner-input__input-" + keyId}
      value={value}
      className="inner-input__input"
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}
export default InnerInputTag;
