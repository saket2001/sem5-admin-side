import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
import { useSessionStorageString } from "react-use-window-sessionstorage";
import { useEffect } from "react";

export default function useSession() {
  const dispatch = useDispatch(authActions);

  // get data from session storage
  const [isLoggedIn, setLoggedStatus] = useSessionStorageString("IsLoggedIn");
  const [LoggedId, setLoggedId] = useSessionStorageString("LoggedId");
  const [LoggedName, setLoggedName] = useSessionStorageString("LoggedName");

  useEffect(() => {
    if (isLoggedIn === "true" && LoggedId != "" && LoggedName !== "") {
      dispatch(authActions.updateUserStatus(true));
      dispatch(
        authActions.updateUserData({
          id: LoggedId,
          name: LoggedName,
        })
      );
    }
  }, [LoggedId, isLoggedIn, dispatch]);
}
