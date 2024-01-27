import { useEffect, useState } from "react";
import Input from "../commom/Input";
import http from "../../http-commom";
import { useSelector } from "react-redux";
import { all } from "axios";
import Select from "../commom/Select";
import useFormatDate from "../../customHook/useFormatDate";
function CreateTaskFormRight({ taskInfo, setTaskInfo }) {
  const [tasktypes, setTaskTypes] = useState([]);
  const formatDate = useFormatDate();
  const loadTaskTypes = async () => {
    const data = [];
    try {
      const response = await http.get("/task-type");
      data = await response.data;
    } catch (ex) {
      console.log(ex);
    }
    setTaskTypes(data);
  };
  const handleOnChange = (e, property) => {
    setTaskInfo((prev) => {
      return { ...prev, [property]: e.target.value };
    });
  };

  useEffect(() => {
    loadTaskTypes();
  }, []);
  return (
    <div className="children-task-creation__body-right">
      <Input
        type="date"
        label="Ngày bắt đầu"
        onChange={(e) => handleOnChange(e, "startTime")}
        value={formatDate.formatDateInput(taskInfo.startTime)}
      />
      <Input
        type="date"
        label="Ngày kết thúc"
        onChange={(e) => handleOnChange(e, "endTime")}
        value={formatDate.formatDateInput(taskInfo.endTime)}
      />
    </div>
  );
}
export default CreateTaskFormRight;
