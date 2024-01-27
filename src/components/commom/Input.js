import ResultMessage from "./ResultMessage";
function Input({
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
  isSubmited,
}) {
  return (
    <div className="form__input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        multiple
      />
      {value === "" && isSubmited && (
        <ResultMessage type="error" message={name + " must not empty !"} />
      )}
    </div>
  );
}
export default Input;
