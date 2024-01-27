import { createContext, useState } from "react";
import AdminHeader from "./AdminHeader";
import SideBar from "./SideBar";
import UserAdminTable from "./UserAdminTable";
import "./_admin-page.scss";
import Statistic from "../Statistic";
import { useContext } from "react";
export const Context = createContext();

export default function AdminPage() {
  const [navigate, SetNavigate] = useState([
    {
      component: <UserAdminTable />,
      isShow: true,
      link: "user",
    },
    {
      component: <Statistic />,
      isShow: false,
      link: "statistic",
    },
  ]);
  const handleNavigate = (link, props) => {
    SetNavigate((state) =>
      state.map((navigate) => {
        if (navigate.link === link)
          return {
            ...navigate,
            component: { ...navigate.component, props: props },
            isShow: true,
          };
        return {
          ...navigate,
          isShow: false,
        };
      })
    );
  };

  return (
    <Context.Provider value={{ handleNavigate: handleNavigate }}>
      <div className="admin">
        <AdminHeader />
        <div className="admin__body">
          <SideBar>
            <li>Tổng quan</li>
            <li
              onClick={(e) => {
                handleNavigate("user");
              }}
            >
              Người dùng
            </li>
          </SideBar>
          <div className="admin__body__content">
            {navigate.map((n) => {
              if (n.isShow) return n.component;
            })}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}
