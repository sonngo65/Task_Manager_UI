import { useEffect, useState } from "react";

export default function InputTable({ id, type, value, onChange }) {
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.id.trim() !== `table-input-${id}`) {
        setIsDisable(true);
      }
    });
  }, []);
  return isDisable ? (
    <label
      className="table-input-lable"
      for={`table-input-${id}`}
      onDoubleClick={(e) => {
        setIsDisable((state) => !state);
      }}
    >
      {value}
    </label>
  ) : (
    <input
      className={`table-input ${isDisable ? "disabled" : ""}`}
      type={type}
      id={`table-input-${id}`}
      onChange={onChange}
      value={value}
    />
  );
}
