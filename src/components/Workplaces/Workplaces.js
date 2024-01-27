import Workplace from "./Workplace";
import "./_workplace.scss";

export default function workplaces({ workplaces }) {
  const workplacesData = workplaces ? workplaces : [];
  return (
    <ul className="workplace-list">
      {workplacesData.map((workplace) => (
        <li className="workplace-item">
          <Workplace {...workplace} />
        </li>
      ))}
    </ul>
  );
}
