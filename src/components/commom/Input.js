function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="form__input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
export default Input;
