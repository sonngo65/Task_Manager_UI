import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBarItem({
  avatarIcon,
  title,
  moreIcon,
  image,
  isActive,
  linkTo,
  isOpenedSidebar,
  onClick,
}) {
  const processing = useSelector((state) => state.workspace.processing);
  return (
    <Link
      onClick={onClick}
      className={"side-bar__item " + (isActive && " active")}
      to={linkTo}
      style={{ textDecoration: "none" }}
    >
      <div className="side-bar__item__avatar-icon">
        {avatarIcon ? (
          <FontAwesomeIcon className="icon" icon={avatarIcon} />
        ) : (
          <img src={image} alt={image} />
        )}
      </div>
      {isOpenedSidebar && (
        <>
          <div className="side-bar__item__title">
            {processing ? (
              <Placeholder as="div" className="d-flex ps-2" animation="glow">
                <Placeholder xs={4} />
                <Placeholder xs={3} />
              </Placeholder>
            ) : (
              <span>{title}</span>
            )}
          </div>
          <div className="side-bar__item__more-icon">
            {/* <Link onClick={onClick}>
              <FontAwesomeIcon className="icon" icon={moreIcon} />
            </Link> */}
          </div>
        </>
      )}
    </Link>
  );
}
export default SideBarItem;
