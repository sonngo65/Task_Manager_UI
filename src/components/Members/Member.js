import "./_member.scss";
export default function ({ name }) {
  return (
    <div className="member">
      <div className="member__avatar">
        <img src="../../../images/feedback-3.jpg" alt="avatar" />
      </div>
      <div className="member__info">
        <h5>{name}</h5>
      </div>
    </div>
  );
}
