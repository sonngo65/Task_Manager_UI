import { useEffect, useState } from "react";
import http from "../../http-commom";
import { Button, Col, Row } from "react-bootstrap";
import Input from "../commom/Input";
import Thumbnail from "../commom/Thumbnail";
import InnerTextareaTag from "../commom/InnerTextAreaTag";
import InnerInputTag from "../commom/InnerInputTag";
import InnerInput from "../commom/InnerInput";
import useUploadFile from "../../customHook/useUploadFile";
function UpdateChildrenTaskFormLeft({ taskInfo, setTaskInfo }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [innerInputs, setInnerInputs] = useState([
    {
      type: "text",
      label: "Title",
      value: taskInfo.content,
      keyId: 1,
      name: "content",
      isFocus: false,
    },
    {
      type: "textarea",
      label: "Description",
      value: taskInfo.description,
      keyId: 2,
      name: "description",
      isFocus: false,
    },
  ]);
  console.log(innerInputs);

  const handleOnchangeFileInput = (e) => {
    var formData = new FormData();

    const fileArr = [...e.target.files];
    const uploadedFiles = fileArr.map((file) => {
      formData.append("file", file);
      console.log(file);
      if (file.name.split(".").pop() === "pdf") {
        return { name: "PDF-image.jpg", type: file.type };
      }

      return { name: file.name, type: file.type };
    });
    console.log(uploadedFiles);
    setTaskInfo((prev) => {
      return { ...prev, uploadedFiles: uploadedFiles };
    });
    useUploadFile
      .upload(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFocusForm = (e) => {
    setInnerInputs((prevInnerInputs) => {
      return prevInnerInputs.map((prevInnerInput) => {
        if (e.target.id === "inner-input__input-" + prevInnerInput.keyId) {
          return {
            ...prevInnerInput,
            isFocus: true,
          };
        }
        return {
          ...prevInnerInput,
          isFocus: false,
        };
      });
    });
  };

  const handleOnchange = (e, innerInput) => {
    setTaskInfo((prev) => {
      return {
        ...prev,
        [innerInput.name]: e.target.value,
      };
    });
    setInnerInputs((prevInnerInputs) => {
      return prevInnerInputs.map((prevInnerInput) => {
        if (prevInnerInput.keyId === innerInput.keyId) {
          return {
            ...prevInnerInput,
            value: e.target.value,
          };
        }
        return prevInnerInput;
      });
    });
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleFocusForm);
  }, []);

  return (
    <div className="children-task-creation__body-left">
      <div className="children-task-creation__body-left-top">
        {innerInputs.map((innerInput) => {
          return (
            <InnerInput
              {...innerInput}
              onChange={(e) => {
                handleOnchange(e, innerInput);
              }}
              onFocus={handleFocusForm}
            >
              {innerInput.type === "textarea" ? (
                <InnerTextareaTag />
              ) : (
                <InnerInputTag />
              )}
            </InnerInput>
          );
        })}
      </div>
      {/* <div className="children-task-creation__body-left-bottom">
        <Input
          label={"Tải File"}
          type="file"
          onChange={handleOnchangeFileInput}
        />
        <div>
          {uploadedFiles && <Thumbnail uploadedFiles={uploadedFiles} />}
        </div>

        <Row>
          <Col>
            <Button style={{ padding: "10px 40px" }}>Lưu</Button>
          </Col>
          <Col>
            <Button style={{ padding: "10px 20px" }}>Hủy</Button>
          </Col>
        </Row>
      </div> */}
    </div>
  );
}

export default UpdateChildrenTaskFormLeft;
