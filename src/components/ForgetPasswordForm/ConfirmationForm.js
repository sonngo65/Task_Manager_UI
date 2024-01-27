import { useState } from "react";
import http from "../../http-commom";
import { Row, Col } from "react-bootstrap";
import SubmitButton from "../commom/SubmitButton";
import ConfirmationInput from "./ConfirmationInput";
import { useNavigate } from "react-router";
function ConfirmationForm({ confirmationData, setConfirmationData }) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isConfirmedError, setIsConfirmedError] = useState(false);
  const navigate = useNavigate();
  //send confirmation code has received from user's mail
  var hanldeConfirmCodeSubmit = (e) => {
    e.preventDefault();
    http
      .post("/accounts/email/confirm-code", {
        accountId: confirmationData.accountId,
        code: confirmationData.code,
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          sessionStorage.setItem("accountId", confirmationData.accountId);
          navigate("/change-password");
          // alert("Confirm Email Successfully");
          // window.location.href = "/login";
        } else {
          setIsConfirmedError(true);
        }
        setIsSubmited(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmited(true);
      });
  };

  //send confirmtation code to user's mail when click 'Send' Button
  var handleSendConfirmationCodeToMailSubmit = (e) => {
    e.preventDefault();
    http
      .post("/accounts/email/send-confirmation-code", {
        accountId: confirmationData.acccountId,
        email: confirmationData.email,
      })
      .then((response) => {
        console.log(response);
        setIsSubmited(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmited(true);
      });
  };

  return (
    <div className="form-layout">
      <div className="forget-password-form">
        <div className="form">
          <h2 className="form__title">Forget Password</h2>
          <>
            <Row>
              <Col xs={9}>
                <ConfirmationInput
                  isSubmited={isSubmited}
                  value={confirmationData.code}
                  onChange={(e) =>
                    setConfirmationData((prevData) => {
                      return {
                        ...prevData,
                        code: e.target.value,
                      };
                    })
                  }
                />
              </Col>
              <Col style={{ marginTop: "30px" }}>
                <SubmitButton
                  onSubmit={handleSendConfirmationCodeToMailSubmit}
                  text="Send"
                />
              </Col>
            </Row>

            {isConfirmedError && <p style={{ color: "red" }}>Confirm error</p>}
            <SubmitButton onSubmit={hanldeConfirmCodeSubmit} text="Confirm" />
          </>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationForm;
