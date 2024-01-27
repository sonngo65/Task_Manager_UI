import "./_child-task-statistic-item.scss";
export default function ChildTaskStatisticItem({ content, status }) {
  return (
    <div className="child-task-statistic-item">
      <h5 className="child-task-statistic-item__content">{content}</h5>
      <span
        className={`child-task-statistic-item__status  ${
          status === "Complete"
            ? "completed"
            : status === "Overtime"
            ? "overtime"
            : ""
        }`}
      >
        {status}
      </span>
    </div>
  );
}
