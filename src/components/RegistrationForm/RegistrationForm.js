import { useState } from "react";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
import http from "../../http-commom";
import "./_registration.scss";
function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  var handleRegistrationSubmit = (e) => {
    e.preventDefault();
    http
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div className="registration-form">
      <div className="form">
        <h2 className="form__title">Registration Form</h2>
        <Input
          label="Username:"
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password:"
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm Your Password:"
          type="password"
          placeholder="Confirm Your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton onSubmit={handleRegistrationSubmit} text="Login" />
      </div>
    </div>
  );
}
export default RegistrationForm;
