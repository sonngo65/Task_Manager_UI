import { useState } from "react";
import "./_login-form.scss";
import http from "../../http-commom";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  var handleLoginSubmit = (e) => {
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
    <div className="login-form">
      <div className="form">
        <h2 className="form__title">Login Form</h2>
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

        <SubmitButton onSubmit={handleLoginSubmit} text="Login" />
      </div>
    </div>
  );
}
export default LoginForm;
