import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./_admin-header.scss";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../store/actions/UserAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <div className="admin__header">
      <div className="admin__header__logo">
        <h5>
          <Link style={{ color: "white" }} className="link-nomal">
            Task Management S
          </Link>
        </h5>
        <span>ADMIN</span>
      </div>

      <ul className="admin__header__navbar">
        <li>
          <FontAwesomeIcon icon={faBell} />
        </li>
        <li
          onClick={(e) => {
            setShow((state) => !state);
          }}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          <ul className={`account-control ${show ? "show" : ""}`}>
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                }}
              >
                logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
