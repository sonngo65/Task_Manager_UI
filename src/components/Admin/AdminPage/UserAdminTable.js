import { Spinner, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import InputTable from "./InputTable";
import { Link } from "react-router-dom";
import "./_user-admin-table.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  addUser,
  deleteUsers,
  getAllUser,
  setIsChoiceUser,
  setUser,
  updateOrAddUsers,
} from "../../../store/actions/AdminAction";
import { Context } from "./AdminPage";
import Static from "../Statistic/Static";
import { set } from "date-fns";
import { ROLE_ADMIN } from "../../../store/constant";
export default function UserAdminTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const processing = useSelector((state) => state.admin.processing);
  const { handleNavigate } = useContext(Context);
  const handleSaveUsersBtn = () => {
    dispatch(
      updateOrAddUsers(
        users
          .filter((user) => user.isChanged)
          .map((user) => {
            if (user.isNew) return { ...user, id: null };
            return user;
          })
      )
    );
  };

  const handleDeleteUsersBtn = () => {
    dispatch(
      deleteUsers(
        users.filter((user) => {
          if (user.isChoice) return false;
          return user.isChoice;
        })
      )
    );
  };
  const [statics, setStatics] = useState([
    {
      name: "SAVE",
      title: "Thông báo",
      isShow: false,
      content: "Bạn có muốn lưu không ?",
      handleEvent: handleSaveUsersBtn,
    },
    {
      name: "DELETE",
      title: "Thông báo",
      isShow: false,
      content: "Bạn có muốn xóa không ?",
      handleEvent: handleDeleteUsersBtn,
    },
  ]);
  const handleShowStatic = (name) => {
    setStatics((state) => {
      return state.map((staticItem) => {
        if (staticItem.name === name) {
          return { ...staticItem, isShow: !staticItem.isShow };
        }
        return staticItem;
      });
    });
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  // useEffect(() => {
  //   setStatics((state) =>
  //     state.map((staticItem) => {
  //       if (staticItem.name === "SAVE") {
  //         return { ...staticItem, handleEvent: handleSaveUsersBtn };
  //       }
  //       if (staticItem.name === "DELETE") {
  //         return { ...staticItem, handleEvent: handleDeleteUsersBtn };
  //       }
  //     })
  //   );
  // }, [users]);
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     firstName: "ngo",
  //     lastName: "son",
  //     dateOfBirth: "01/07/2002",
  //     emailAddress: "ssngotat@gmail.com",
  //     userName: "ngoson",
  //     roleName: "USER",
  //     isChanged: false,
  //     isChoice: false,
  //   },
  //   {
  //     id: 2,
  //     firstName: "ngo",
  //     lastName: "tat",
  //     dateOfBirth: "01/07/2003",
  //     emailAddress: "ssngotwqeat@gmail.com",
  //     userName: "qwe",
  //     roleName: "USER",
  //     isChanged: false,
  //     isChoice: true,
  //   },
  //   {
  //     id: 3,
  //     firstName: "ngo",
  //     lastName: "duc",
  //     dateOfBirth: "01/07/2001",
  //     emailAddress: "qwetat@gmail.com",
  //     userName: "qwe",
  //     roleName: "ADMIN",
  //     isChanged: false,
  //     isChoice: false,
  //   },
  // ]);
  // const changeState = (currentState, valueName, value) => {
  //   setUsers((states) =>
  //     states.map((state) => {
  //       if (state.id === currentState.id) {
  //         return { ...state, [`${valueName}`]: value };
  //       }
  //       return state;
  //     })
  //   );
  // };

  return processing ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <>
      {statics.map((staticItem, index) => {
        if (staticItem.name === "SAVE") {
          return (
            <Static
              {...staticItem}
              key={index}
              handleShowStatic={handleShowStatic}
              handleEvent={handleSaveUsersBtn}
            />
          );
        }
        if (staticItem.name === "DELETE") {
          return (
            <Static
              {...staticItem}
              key={index}
              handleShowStatic={handleShowStatic}
              handleEvent={handleDeleteUsersBtn}
            />
          );
        }
      })}
      <div className="user-admin-table">
        <div className="user-admin-table__control">
          <ul className="control-btn-list">
            <li className="control-btn-item">
              <button
                onClick={
                  (e) => {
                    handleShowStatic("SAVE");
                  }
                  // handleSaveUsersBtn
                }
              >
                save
              </button>
            </li>
            <li className="control-btn-item">
              <button
                onClick={(e) => {
                  dispatch(addUser());
                  // setUsers((state) => {
                  //   return [...state, { id: "new" + state.length, isNew: true }];
                  // });
                }}
              >
                add
              </button>
            </li>
            <li className="control-btn-item">
              <button
                onClick={(e) => {
                  handleShowStatic("DELETE");
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>STT</th>
              <th>ho</th>
              <th>Tên</th>

              <th>Email</th>
              <th>Ngày sinh</th>
              <th>Tài khoản</th>
              <th>Quyền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((user) => user.roleName !== ROLE_ADMIN)
                .map((user, index) => (
                  <tr className={`${user.isChoice && "choice"}`}>
                    <td
                      onClick={(e) => {
                        dispatch(setIsChoiceUser(user.id));
                        // setUsers((state) => {
                        //   return state.map((preUser) => {
                        //     if (preUser.id === user.id) {
                        //       return {
                        //         ...preUser,
                        //         isChoice: !preUser.isChoice,
                        //       };
                        //     }
                        //     return preUser;
                        //   });
                        // });
                      }}
                    >
                      {index + 1}
                    </td>
                    <td>
                      <InputTable
                        type="text"
                        id={user.id}
                        value={user.firstName}
                        onChange={(e) => {
                          // changeState(user, "firstName", e.target.value);
                          dispatch(setUser(user, "firstName", e.target.value));
                        }}
                      />
                    </td>
                    <td>
                      <InputTable
                        type="text"
                        id={user.id}
                        value={user.lastName}
                        onChange={(e) => {
                          // changeState(user, "lastName", e.target.value);
                          dispatch(setUser(user, "lastName", e.target.value));
                        }}
                      />
                    </td>

                    <td>
                      <InputTable
                        type="text"
                        id={user.id}
                        value={user.emailAddress}
                        onChange={(e) => {
                          // changeState(user, "emailAddress", e.target.value);
                          dispatch(
                            setUser(user, "emailAddress", e.target.value)
                          );
                        }}
                      />
                    </td>
                    <td>
                      <InputTable
                        type="date"
                        id={user.id}
                        value={user.dateOfBirth}
                        onChange={(e) => {
                          // changeState(user, "dateOfBirth", e.target.value);
                          dispatch(
                            setUser(user, "dateOfBirth", e.target.value)
                          );
                        }}
                      />
                    </td>
                    <td>
                      <InputTable
                        type="text"
                        id={user.id}
                        value={user.userName}
                        onChange={(e) => {
                          // changeState(user, "userName", e.target.value);
                          dispatch(setUser(user, "userName", e.target.value));
                        }}
                      />
                    </td>
                    <td>
                      <InputTable
                        type="text"
                        id={user.id}
                        value={user.roleName}
                        onChange={(e) => {
                          // changeState(user, "roleName", e.target.value);
                          dispatch(setUser(user, "roleName", e.target.value));
                        }}
                      />
                    </td>
                    <td>
                      <Link
                        onClick={(e) =>
                          handleNavigate("statistic", { id: user.id })
                        }
                      >
                        Thống kê
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
