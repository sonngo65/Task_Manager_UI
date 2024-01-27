import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import ForgetPasswordForm from "../ForgetPasswordForm";
import ChangePasswordForm from "../ChangePasswordForm";
import Home from "../Home";
import IntroductionPage from "../IntrodutionPage";
import CreateChildrenTaskForm from "../Tasks/CreateChildrenTaskForm";
import InnerTaskPage from "../Tasks/InnerTaskPage";
import CreateTaskForm from "../Tasks/CreateTaskForm";
import { loadUser } from "../../store/actions/UserAction";
import {
  loadDefaultWorkspace,
  loadWorkspacesByUserId,
} from "../../store/actions/WorkspaceAction";
import useLoadPage from "../../customHook/useLoadPage";
import Members from "../Members";
import FollowProgressTask from "../Tasks/FollowProgressTask";
import ProgressTaskUser from "../Tasks/FollowProgressTask/ProgressTaskUser";
import ProgressChildTask from "../Tasks/FollowProgressTask/ProgressChildTask";
import UploadedFile from "../UploadedFile";
import IntrodutionPage from "../IntrodutionPage";
import { useSelector } from "react-redux";
import { ROLE_ADMIN } from "../../store/constant";
import AdminPage from "../Admin/AdminPage";
import Statistic from "../Admin/Statistic";
function PageRouter() {
  const role = useSelector((state) => state.user.user.roleName);
  const isLogin = useSelector((state) => state.user.isLogin);
  useLoadPage(loadUser, loadWorkspacesByUserId, loadDefaultWorkspace);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isLogin ? <LoginForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="/registration"
          element={!isLogin ? <RegistrationForm /> : <Navigate to={"/"} />}
        />
        <Route
          index
          element={
            isLogin ? (
              role === ROLE_ADMIN ? (
                <AdminPage />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/forget-password" element={<ForgetPasswordForm />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route
          path="/introduction"
          element={isLogin ? <IntroductionPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/create-task"
          element={isLogin ? <CreateTaskForm /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/create-children-task"
          element={<CreateChildrenTaskForm />}
        />
        <Route
          path="/task"
          element={isLogin ? <InnerTaskPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/members"
          element={isLogin ? <Members /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/follow-progress"
          element={
            isLogin ? <FollowProgressTask /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/progress-child-task"
          element={isLogin ? <ProgressChildTask /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/uploaded-file"
          element={isLogin ? <UploadedFile /> : <Navigate to={"/login"} />}
        />
        <Route
          path="*"
          element={isLogin ? <IntrodutionPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default PageRouter;
