var ResultMessage = ({ type, message }) => {
  return <p className={"message--" + type}>{message}</p>;
};
export default ResultMessage;
