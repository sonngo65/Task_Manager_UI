import SideBarItem from "./SideBarItem";
import {
  faPerson,
  faPlus,
  faCog,
  faTableCells,
  faTasks,
  faCalendarAlt,
  faClock,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./_side-bar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Placeholder, Row } from "react-bootstrap";
import { ROLE_ADMIN, ROLE_LEADER } from "../../store/constant";
function SideBar({ title, code, setCreateTaskForm, setCreateWorkspaceForm }) {
  const role = useSelector(
    (state) => state.workspace.currentWorkspace.roleName
  );
  console.log(role);
  const [isOpenedSidebar, setIsOpenedSideBar] = useState(true);
  const [faChevronIcon, setFaChevronIcon] = useState(faChevronLeft);
  const processing = useSelector((state) => state.workspace.processing);
  return (
    <div className={"side-bar " + (!isOpenedSidebar && " is_open")}>
      <div className="side-bar__head">
        {isOpenedSidebar &&
          (processing ? (
            <Placeholder as="div" className="d-flex ps-2" animation="glow">
              <Placeholder xs={4} />
              <Placeholder xs={3} />
            </Placeholder>
          ) : (
            <>
              {" "}
              <h4 className="side-bar__head__title">
                {title} <p className="side-bar__head__code">code: {code}</p>
              </h4>
            </>
          ))}

        <span
          className="side-bar__head__icon"
          onClick={(e) => {
            setIsOpenedSideBar((prev) => setIsOpenedSideBar(!prev));
            isOpenedSidebar
              ? setFaChevronIcon(faChevronRight)
              : setFaChevronIcon(faChevronLeft);
          }}
        >
          <FontAwesomeIcon className="icon" icon={faChevronIcon} />
        </span>
      </div>

      <div className="side-bar__body">
        {isOpenedSidebar &&
          (processing ? (
            <Placeholder as="div" className="d-flex ps-2" animation="glow">
              <Placeholder xs={4} />
              <Placeholder xs={3} />
            </Placeholder>
          ) : (
            <div className="side-bar__body__title">Thành Viên </div>
          ))}
        <div className="divider"></div>
        <SideBarItem
          isOpenedSidebar={isOpenedSidebar}
          avatarIcon={faPerson}
          moreIcon={faPlus}
          linkTo={"/members"}
          title={"Thành Viên"}
        />
        {/* <SideBarItem
          isOpenedSidebar={isOpenedSidebar}
          avatarIcon={faClock}
          title={"Việc ưu tiên"}
        /> */}
        {isOpenedSidebar &&
          (processing ? (
            <Placeholder as="div" className="d-flex ps-2" animation="glow">
              <Placeholder xs={3} />
              <Placeholder xs={1} />
              <Placeholder xs={5} />

              <Placeholder xs={2} />
            </Placeholder>
          ) : (
            <div className="side-bar__body__title">Nhiệm Vụ</div>
          ))}
        <div className="divider"></div>
        {(role === ROLE_ADMIN || role === ROLE_LEADER) && (
          <SideBarItem
            isOpenedSidebar={isOpenedSidebar}
            avatarIcon={faTasks}
            moreIcon={faPlus}
            title={"Thêm Task"}
            onClick={(e) =>
              setCreateTaskForm((state) => {
                return { ...state, isShow: !state.isShow };
              })
            }
          />
        )}

        {/* <SideBarItem
          isOpenedSidebar={isOpenedSidebar}
          avatarIcon={faCalendarAlt}
          moreIcon={faPlus}
          title={"Lịch"}
          isActive={true}
        /> */}
        {isOpenedSidebar &&
          (processing ? (
            <Placeholder as="div" className="d-flex ps-2" animation="glow">
              <Placeholder xs={2} />
              <Placeholder xs={8} />
            </Placeholder>
          ) : (
            <div className="side-bar__body__title">Các không gian làm việc</div>
          ))}
        <div className="divider"></div>
        <SideBarItem
          isOpenedSidebar={isOpenedSidebar}
          avatarIcon={faTableCells}
          moreIcon={faPlus}
          title={"Thêm không gian làm việc"}
          onClick={(e) =>
            setCreateWorkspaceForm((state) => {
              return { ...state, isShow: !state.isShow };
            })
          }
        />
        {/* <SideBarItem
          isOpenedSidebar={isOpenedSidebar}
          avatarIcon={faCog}
          title={"Setting"}
        /> */}
      </div>
    </div>
  );
}
export default SideBar;
