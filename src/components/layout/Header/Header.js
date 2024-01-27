import "./style/_header.scss";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Headers({ setJoinWorkspaceForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const workspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const user = useSelector((state) => state.user.user);
  return (
    <div className="header">
      <Navbar expand="lg">
        <Container className="header__container">
          <Navbar.Brand href="#home">Task Manager S</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!sessionStorage.getItem("token") ? (
                <>
                  <Nav.Link href="/login">login</Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  logout
                </Nav.Link>
              )}
              <NavDropdown title="Không gian làm việc" id="basic-nav-dropdown">
                {workspaces &&
                  workspaces.map((workspace) => (
                    <div
                      class={`nav-item ${
                        workspaceId === workspace.id && "active"
                      }`}
                    >
                      <Link class="nav-link" to={`/?w=${workspace.id}`}>
                        {workspace.name}
                      </Link>
                    </div>
                  ))}
              </NavDropdown>
              <Nav.Link
                onClick={(e) => {
                  setJoinWorkspaceForm((state) => {
                    return { ...state, isShow: !state.isShow };
                  });
                }}
              >
                Tham gia không gian làm việc
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text>{user.firstName + " " + user.lastName}</Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
}
