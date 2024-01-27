export default function SideBar({ sideBarItems, children }) {
  return (
    <div className="admin__body__side-bar">
      <ul>{children}</ul>
    </div>
  );
}
