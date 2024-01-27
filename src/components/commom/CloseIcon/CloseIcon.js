import { Link } from "react-router-dom";
import "./_close-icon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function CloseIcon({ handleOnClose }) {
  return (
    <div className="back-icon">
      <span onClick={handleOnClose}>
        <FontAwesomeIcon icon={faClose} />
      </span>
    </div>
  );
}
