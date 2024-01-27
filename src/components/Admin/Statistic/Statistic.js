import { useEffect, useState } from "react";
import TaskStatistic from "./TaskStatistic";
import "./_statistic.scss";
import WorkspaceList from "./WorkspaceList";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminTasksByFirstWorkspaceAndUserId,
  getAllWorkspaceByUserId,
} from "../../../store/actions/AdminAction";
import { Spinner } from "react-bootstrap";
export default function Statistic({ id }) {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.admin.workspaces);
  const statistic = useSelector((state) => state.admin.tasks.statistic);
  const roleName = useSelector((state) => state.admin.tasks.roleName);
  const processing = useSelector((state) => state.admin.processing);
  const fetchData = async () => {
    await dispatch(getAllWorkspaceByUserId(id));
    await dispatch(getAdminTasksByFirstWorkspaceAndUserId(id));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const [workspaces, setWorkspaces] = useState([
  //   {
  //     id: 1,
  //     name: "java kog",
  //   },
  //   {
  //     id: 2,
  //     name: "java kog3",
  //   },
  //   {
  //     id: 3,
  //     name: "java kog4",
  //   },
  // ]);
  const [isHidden, setIsHidden] = useState(true);
  return processing ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <div className="statistic">
      <div className="statistic__head">
        <ul className="statistic__list">
          <li
            className="statistic__item"
            onClick={(e) => {
              setIsHidden((state) => !state);
            }}
          >
            <WorkspaceList
              userId={id}
              isHidden={isHidden}
              workspaces={workspaces}
            />
            <div className="statistic__item__title">
              <h5>không gian làm việc</h5>
            </div>
            <div className="statistic__item__info">
              <span className="info__quantity">
                Số lượng: {workspaces ? workspaces.length : 0}
              </span>
            </div>
          </li>
          <li className="statistic__item">
            <div className="statistic__item__title">
              <h5>Nhiệm vụ</h5>
            </div>
            <div className="statistic__item__info">
              {statistic && (
                <div className="task-info">
                  <span className="task-info-total">
                    Tổng số: {statistic.totalTask}
                  </span>
                  <span className="task-info-completed">
                    Hoàn thành: {statistic.completedTask}
                  </span>

                  <span className="task-info-unfinished">
                    Chưa hoàn thành: {statistic.unfinishedTask}
                  </span>
                </div>
              )}
            </div>
          </li>
          <li className="statistic__item">
            <div className="statistic__item__title">
              <h5>Role : {roleName}</h5>
            </div>
          </li>
        </ul>
      </div>
      <div className="statistic__body">
        <TaskStatistic />
      </div>
    </div>
  );
}
