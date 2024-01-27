import { useEffect, useState } from "react";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
import http from "../../http-commom";
import "./_change-password.scss";
import ResultMessage from "../commom/ResultMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";

function ChangePasswordForm() {
  const [accountRequest, setAccountRequest] = useState({
    accountId: sessionStorage.getItem("accountId"),
    password: "",
  });
  const [resultMessage, setResultMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isError, SetIsErrror] = useState(false);
  const navigate = useNavigate();
  console.log(accountRequest.accountId);
  useEffect(() => {
    !accountRequest.accountId && navigate("/forget-password");
  }, []);
  var handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== accountRequest.password) {
      SetIsErrror(true);
      setResultMessage("Confirm Password Not Match !");
      return;
    }
    http
      .put("/accounts/password", accountRequest)
      .then((response) => {
        console.log(response);
        alert("Change Password Successfully, Login Now !");
        window.location.href = "/login";
      })
      .catch((error) => {
        if (error.response.status === 400) {
          SetIsErrror(true);
          setResultMessage("Must not empty!!");
        }
      });
    setIsSubmited(true);
  };

  return (
    accountRequest.accountId && (
      <div className="form-layout">
        <Link className="go-back" to="/">
          <FontAwesomeIcon className="go-back__icon" icon={faArrowLeft} />
        </Link>
        <div className="registration-form">
          <div className="form">
            <h2 className="form__title">Change Password Form</h2>

            <Input
              label="Password:"
              type="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setAccountRequest({
                  ...accountRequest,
                  password: e.target.value,
                })
              }
              name="Password"
              value={accountRequest.password}
              isSubmited={isSubmited}
            />

            <Input
              label="Confirm Your Password:"
              type="password"
              placeholder="Confirm Your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="Confirm Password"
              value={confirmPassword}
              isSubmited={isSubmited}
            />
            <SubmitButton onSubmit={handleChangePasswordSubmit} text="Login" />
          </div>
          {isError && <ResultMessage type="error" message={resultMessage} />}
        </div>
      </div>
    )
  );
}
export default ChangePasswordForm;
