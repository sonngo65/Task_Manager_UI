function SubmitButton({ onSubmit, text }) {
  return (
    <button className="form__button" type="button" onClick={onSubmit}>
      {text}
    </button>
  );
}

export default SubmitButton;
