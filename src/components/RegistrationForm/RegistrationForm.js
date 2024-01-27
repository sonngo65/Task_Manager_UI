import { useState } from "react";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
import http from "../../http-commom";
import "./_registration.scss";
import ResultMessage from "../commom/ResultMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";

function RegistrationForm() {
  const [accountRequest, setAccountRequest] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    dateOfBirth: "",
    emailAddress: "",
  });
  const [isConfirmPasssword, setIsConfirmPassword] = useState(true);
  const [resultMessage, setResultMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isError, SetIsErrror] = useState(false);
  var handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== accountRequest.password) {
      SetIsErrror(true);
      setResultMessage("Confirm Password Not Match !");
      return;
    }
    http
      .post("/accounts", accountRequest)
      .then((response) => {
        console.log(response);
        alert("Registration Successfully, Login Now !");
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
    <div className="form-layout">
      <Link className="go-back" to="/">
        <FontAwesomeIcon className="go-back__icon" icon={faArrowLeft} />
      </Link>
      <div className="registration-form">
        <div className="form">
          <h2 className="form__title">Registration Form</h2>
          <Row>
            <Col>
              <Input
                label="First Name:"
                type="text"
                placeholder="Enter Your First Name"
                onChange={(e) =>
                  setAccountRequest({
                    ...accountRequest,
                    firstName: e.target.value,
                  })
                }
                name="First Name"
                value={accountRequest.firstName}
                isSubmited={isSubmited}
              />
            </Col>
            <Col>
              <Input
                label="Last Name:"
                type="text"
                placeholder="Enter Your Last Name"
                onChange={(e) =>
                  setAccountRequest({
                    ...accountRequest,
                    lastName: e.target.value,
                  })
                }
                name="Last Name"
                value={accountRequest.lastName}
                isSubmited={isSubmited}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                label="Email Address:"
                type="date"
                placeholder="Enter Your Date Of Birth"
                onChange={(e) =>
                  setAccountRequest({
                    ...accountRequest,
                    dateOfBirth: e.target.value,
                  })
                }
                name="Date Of Birth"
                value={accountRequest.dateOfBirth}
                isSubmited={isSubmited}
              />
            </Col>
            <Col>
              <Input
                label="Email Address:"
                type="text"
                placeholder="Enter Your Email Address"
                onChange={(e) =>
                  setAccountRequest({
                    ...accountRequest,
                    emailAddress: e.target.value,
                  })
                }
                name="Email Address"
                value={accountRequest.emailAddress}
                isSubmited={isSubmited}
              />
            </Col>
          </Row>

          <Input
            label="Username:"
            type="text"
            placeholder="Enter Username"
            onChange={(e) =>
              setAccountRequest({ ...accountRequest, username: e.target.value })
            }
            name="Username"
            value={accountRequest.username}
            isSubmited={isSubmited}
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setAccountRequest({ ...accountRequest, password: e.target.value })
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
          <SubmitButton onSubmit={handleRegistrationSubmit} text="Login" />
        </div>
        {isError && <ResultMessage type="error" message={resultMessage} />}
      </div>
    </div>
  );
}
export default RegistrationForm;
