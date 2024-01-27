import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function useLoadPage(loadUser, loadWorkspacesByUserId, loadDefaultWorkspace) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const workspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const loadLoginUser = async () => {
    await dispatch(loadUser());
  };
  const loadWorkspaces = async (id) => {
    await dispatch(loadWorkspacesByUserId(id));
  };
  const loadDefaultWorkspaceByUserId = async (id) => {
    await dispatch(loadDefaultWorkspace(id));
  };
  const fetchData = async () => {
    if (!user.id) {
      await loadLoginUser();
      return;
    }
    await loadWorkspaces(user.id);
    loadDefaultWorkspaceByUserId(user.id);
  };
  useEffect(() => {
    fetchData();
  }, [user]);
}

export default useLoadPage;
