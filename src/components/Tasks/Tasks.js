import { Container, Spinner } from "react-bootstrap";
import Task from "./Task";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
function Tasks() {
  const workspace = useSelector((state) => state.workspace);
  const tasks = useSelector(
    (state) => state.workspace.currentWorkspace.tasks || []
  );
  const processing = useSelector((state) => state.workspace.processing);
  return (
    <div className="tasks">
      {processing ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Container>
          {tasks.map((task) => (
            <Task {...task} />
          ))}
        </Container>
      )}
    </div>
  );
}
export default Tasks;
