import { useEffect, useState } from "react";
import Input from "../commom/Input";

function ConfirmationInput({ onChange, value, isSubmited }) {
  const [seconds, SetSeconds] = useState(60);
  useEffect(() => {
    var time = setInterval(() => {
      if (seconds > 0) {
        SetSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          clearInterval(time);
          return prevSeconds;
        });
      }
    }, 1000);
    return () => clearInterval(time);
  }, []);
  console.log("hahaaaha");
  return (
    <div>
      <Input
        type="text"
        label="Enter Confirmation Code"
        value={value}
        onChange={onChange}
        isSubmited={isSubmited}
      />
      {seconds > 0 ? (
        <p style={{ color: "green" }}>{seconds}</p>
      ) : (
        <p style={{ color: "red" }}>Expired Confirmation Code !</p>
      )}
    </div>
  );
}
export default ConfirmationInput;
