import { useState } from "react";
import Input from "../commom/Input";
import SubmitButton from "../commom/SubmitButton";
import ConfirmationForm from "./ConfirmationForm";
import http from "../../http-commom";
import "./_forget-password-form.scss";
import ResultMessage from "../commom/ResultMessage";

function ForgetPasswordForm() {
  const [confirmationData, setConfirmationData] = useState({
    accountId: 0,
    username: "",
    email: "",
    code: "",
    isConfirmed: false,
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSend, setIsSended] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //Send confirmation code to user's mail
  var sendConfirmationToMail = async (emailInfo) => {
    try {
      const response = await http.post(
        "/accounts/email/send-confirmation-code",
        emailInfo
      );
      if (response.status === 200) {
        setIsSubmited(false);
      } else {
        throw Error("Server happen an error");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsSubmited(true);
    }
  };

  // get email data from api
  var handleForgetPasswordSubmit = (e) => {
    e.preventDefault();
    http
      .get("/accounts/email?username=" + confirmationData.username)
      .then((response) => {
        setConfirmationData((prevData) => {
          return {
            ...prevData,
            accountId: response.data.accountId,
            code: response.data.code,
          };
        });
        sendConfirmationToMail(response.data);
        setIsSubmited(false);
        setIsSended(true);
        setErrorMessage(null);
      })
      .catch((error) => {
        setIsSubmited(true);
        setErrorMessage(error.message);
      });
  };

  return isSend ? (
    <ConfirmationForm
      confirmationData={confirmationData}
      setConfirmationData={setConfirmationData}
    />
  ) : (
    <div className="form-layout">
      <div className="forget-password-form">
        <div className="form">
          <h2 className="form__title">Forget Password</h2>
          <Input
            label="Username:"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setErrorMessage(null);
              setConfirmationData({
                ...confirmationData,
                username: e.target.value,
              });
            }}
            name="Username"
            value={confirmationData.username}
            isSubmited={isSubmited}
          />
          <SubmitButton onSubmit={handleForgetPasswordSubmit} text="Enter" />
          {errorMessage && (
            <ResultMessage type="error" message={"Sai tài khoản"} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ForgetPasswordForm;
