import { useState } from "react";
import TaskStatisticItem from "./TaskStatisticItem";
import "./_task-statistic.scss";
import PreviewChildTask from "./PreviewChildTask";
import { useSelector } from "react-redux";
export default function TaskStatistic() {
  const tasks = useSelector((state) => state.admin.tasks.list);
  // const tasks = [
  //   {
  //     content: "Java task",
  //     progress: 40,
  //   },
  //   {
  //     content: "Java task",
  //     progress: 10,
  //   },
  //   {
  //     content: "Java task",
  //     progress: 80,
  //   },
  // ];
  const [previewChildTask, setPreviewChildTask] = useState({
    childTask: null,
    isHidden: true,
  });
  return (
    tasks && (
      <div className="task-statistic">
        <ul className="task-statistic-list">
          {tasks.map((task) => {
            return (
              <li>
                <TaskStatisticItem
                  {...task.parentTask}
                  childrenTask={task.childTask.childrenTask}
                  setPreviewChildTask={setPreviewChildTask}
                />
              </li>
            );
          })}
        </ul>
        <div
          className={`preview-task-child ${
            previewChildTask.isHidden ? "hidden" : ""
          }`}
        >
          {previewChildTask.childTask && (
            <PreviewChildTask {...previewChildTask.childTask} />
          )}
        </div>
      </div>
    )
  );
}
