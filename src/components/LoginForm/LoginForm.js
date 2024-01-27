import { useEffect, useState } from "react";
import "./_login-form.scss";
import http from "../../http-commom";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
import ResultMessage from "../commom/ResultMessage";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login } from "../../store/actions/UserAction";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isError, SetIsErrror] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state);
  const submitError = useSelector((state) => state.user.error);
  const isLogin = sessionStorage.getItem("token") && true;
  const loadLogin = async () => {
    await dispatch(login(username, password));
  };
  const loadUserInfo = async () => {
    await dispatch(loadUser());
  };
  const fetch = async () => {
    await loadLogin();
    await loadUserInfo();
  };

  var handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch();
    setIsSubmited(true);
  };

  return (
    !isLogin && (
      <div className="form-layout">
        <Link className="go-back" to="/">
          <FontAwesomeIcon className="go-back__icon" icon={faArrowLeft} />
        </Link>

        <div className="login-form">
          <div className="form">
            <h2 className="form__title">Login Form</h2>
            <Input
              label="Username:"
              type="text"
              placeholder="Enter Your Username"
              onChange={(e) => setUsername(e.target.value)}
              name="Username"
              value={username}
              isSubmited={isSubmited}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              isSubmited={isSubmited}
            />
            <div style={{ margin: "10px 0" }}>
              <Link style={{ marginRight: "10px" }} to="/forget-password">
                Forget Password
              </Link>
              <Link to="/registration">registration</Link>
            </div>
            <SubmitButton onSubmit={handleLoginSubmit} text="Login" />
          </div>
          {isError && <ResultMessage type="error" message={resultMessage} />}
          {submitError && (
            <ResultMessage
              type="error"
              message={"Sai tài khoản hoặc mật khẩu"}
            />
          )}
        </div>
      </div>
    )
  );
}
export default LoginForm;
