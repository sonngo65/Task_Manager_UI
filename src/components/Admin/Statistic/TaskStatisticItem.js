import { ProgressBar } from "react-bootstrap";
import "./_task-statistic-item.scss";
import ChildTaskStatisticItem from "./ChildTaskStatisticItem";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function TaskStatisticItem({
  content,
  progress,
  childrenTask,
  setPreviewChildTask,
}) {
  const [isHidden, setIsHidden] = useState(true);
  // const childrenTask =
  // const childrenTask = [
  //   {
  //     content: "lesson 1",
  //     description:
  //       "hoan thanh trc 10 ew aerew reawr ew rwe rewr werwerewre rwer wer wer wer we",
  //     createdTime: "12/12/2024",
  //     endTime: "11/12/2024",
  //     uploadedFiles: [
  //       {
  //         name: "../../../../images/feedback-3.jpg",
  //         type: "jpg",
  //       },
  //       {
  //         name: "../../../../images/feedback-4.jpg",
  //         type: "jpg",
  //       },
  //     ],
  //     memberUploadedFile: {
  //       isUploaded: true,
  //       files: [
  //         {
  //           name: "../../../../images/feedback-4.jpg",
  //           type: "jpg",
  //         },
  //         {
  //           name: "../../../../images/feedback-4.jpg",
  //           type: "jpg",
  //         },
  //       ],
  //       uploadedTime: "12/11/2024",
  //     },
  //     status: "completed",
  //   },
  //   {
  //     content: "lesson 2",
  //     description: "hoan thanh trc 12",
  //     createdTime: "12/12/2024",
  //     endTime: "11/12/2024",
  //     uploadedFiles: [
  //       {
  //         name: "../../../../images/Honors.jpg",
  //         type: "jpg",
  //       },
  //       {
  //         name: "../../../../images/img_read.jpg",
  //         type: "jpg",
  //       },
  //     ],
  //     memberUploadedFile: null,
  //     status: "completed",
  //   },
  //   {
  //     content: "lesson 3",
  //     description: "hoan thanh trc 3",
  //     createdTime: "12/107/2024",
  //     endTime: "11/12/2024",
  //     uploadedFiles: [
  //       {
  //         name: "../../../../images/feedback-3.jpg",
  //         type: "jpg",
  //       },
  //       {
  //         name: "../../../../images/feedback-4.jpg",
  //         type: "jpg",
  //       },
  //     ],
  //     memberUploadedFile: {
  //       isUploaded: true,
  //       files: [
  //         {
  //           name: "../../../../images/feedback-4.jpg",
  //           type: "jpg",
  //         },
  //         {
  //           name: "../../../../images/feedback-3.jpg",
  //           type: "jpg",
  //         },
  //       ],
  //       uploadedTime: "12/11/2024",
  //     },
  //     status: "completed",
  //   },
  // ];
  return (
    <div className="task-statistic-item">
      <h5
        className="task-statistic-item__name"
        onClick={(e) => {
          setIsHidden((state) => !state);
          setPreviewChildTask((state) => {
            return { ...state, isHidden: false };
          });
        }}
      >
        {content}
      </h5>
      <ProgressBar now={progress} label={progress} />
      <ul
        style={{ height: `${childrenTask.length * 45}px` }}
        className={`child-task-statistic-list ${isHidden ? "hidden" : ""}`}
      >
        {childrenTask.map((child) => {
          return (
            <li
              onClick={(e) => {
                setPreviewChildTask((state) => {
                  return { ...state, childTask: child };
                });
              }}
            >
              <ChildTaskStatisticItem {...child} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
