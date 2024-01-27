import { Link } from "react-router-dom";
import "./_back-icon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function BackIcon({ link }) {
  return (
    <div className="back-icon">
      <Link to={link}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
    </div>
  );
}
