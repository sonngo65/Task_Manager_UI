import { Dropdown } from "react-bootstrap";

export default function CustomDropdown({ members }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Thành viên
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {members &&
          members.map((member) => (
            <Dropdown.Item>
              {member.firstName + " " + member.lastName}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
