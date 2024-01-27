import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export default function Workplace({ id, name }) {
  return (
    <Link className="workplace-link" to={`workplace?id=${id}`}>
      <div className="workplace-link__head">
        <h2 className="workplace-link__name">{name}</h2>
      </div>
    </Link>
  );
}
