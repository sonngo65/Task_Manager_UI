import { memo, useEffect, useState } from "react";
import "./_select.scss";
const Select = ({ values, onChange, objects }) => {
  const [isActive, setIsActive] = useState(false);
  const [isOnSelect, setIsOnSelect] = useState(false);
  const [datas, setDatas] = useState(null);

  const handleSelect = (selectedValue) => {
    const newState = datas.map((data) => {
      if (data.value === selectedValue)
        return { ...data, checked: !data.checked };
      return data;
    });
    const members = newState
      .filter((data) => data.checked)
      .map((data) => data.value);
    onChange(members);
    console.log(newState);

    setDatas(newState);
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.matches(".select-input-box__view") &&
        !e.target.matches(".select-input-box__title") &&
        !e.target.matches(".select-input-box__item") &&
        isActive === true
      ) {
        setIsActive(false);
      }
    });
  }, []);
  useEffect(() => {
    console.log("adwqeqw");
    setDatas([...values, { value: "all", display: "all", checked: false }]);
  }, [values]);
  return (
    <div className="select-input-box">
      <span
        className="select-input-box__title"
        onClick={() => setIsActive((state) => !state)}
      >
        dropdown
      </span>
      <div className="select-input-box__list">
        <ul className={"select-input-box__view " + (isActive ? "active" : "")}>
          {datas &&
            datas.map((data) => (
              <li
                className={
                  "select-input-box__item " + (data.checked ? "selected" : "")
                }
                onClick={() => {
                  handleSelect(data.value);
                }}
              >
                {data.display}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Select;
