import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
import { useSessionStorageString } from "react-use-window-sessionstorage";
import { useEffect } from "react";

export default function useSession() {
  const dispatch = useDispatch(authActions);

  // get data from session storage
  const [isLoggedIn] = useSessionStorageString("IsLoggedIn");
  const [LoggedId] = useSessionStorageString("LoggedId");
  const [LoggedName] = useSessionStorageString("LoggedName");
  const [token] = useSessionStorageString("token");

  useEffect(() => {
    if (
      isLoggedIn === "true" &&
      LoggedId != "" &&
      LoggedName !== " " &&
      token !== ""
    ) {
      dispatch(authActions.updateUserStatus(true));
      dispatch(authActions.updateUserData({ id: LoggedId, name: LoggedName }));
      dispatch(authActions.updateToken(token));
    }
  }, [LoggedId, isLoggedIn, dispatch, token]);
}
