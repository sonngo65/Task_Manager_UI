import ChildrenTask from "./ChildrenTask";
import "./_children-task-list.scss";
export default function ChildrenTaskList({ childrenTasks }) {
  return (
    childrenTasks && (
      <div className="children-task-list">
        {childrenTasks.map((childrenTask) => (
          <ChildrenTask key={childrenTask.id} childrenTask={childrenTask} />
        ))}
      </div>
    )
  );
}
