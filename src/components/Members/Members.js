import { useSelector } from "react-redux";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Member from "./Member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ROLE_LEADER, ROLE_USER } from "../../store/constant";

function Members() {
  const users = useSelector((state) => state.workspace.currentWorkspace.users);
  let leaders = [];
  let members = [];
  if (users !== null) {
    leaders = users.filter((member) => member.roleName === ROLE_LEADER);
    members = users.filter((member) => member.roleName === ROLE_USER);
  }
  return (
    <div className="members">
      <Link className="pre-icon" to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="members__leader">
        <div className="members__title">
          <h2>Leader</h2>
        </div>
        <div className="members__list">
          {leaders &&
            leaders.map((leader) => (
              <Member name={leader.firstName + " " + leader.lastName} />
            ))}
        </div>
      </div>
      <div className="members__member">
        <div className="members__title">
          <h2>Thành viên</h2>
        </div>
        <div className="members__list">
          {members &&
            members.map((member) => (
              <Member name={member.firstName + " " + member.lastName} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
