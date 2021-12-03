import { useEffect, useState } from "react";
import {
  MDBDropdown as Dropdown,
  MDBDropdownItem as DropdownItem,
  MDBDropdownMenu as DropdownMenu,
  MDBDropdownToggle as DropdownToggle,
  MDBIcon as Icon,
} from "mdbreact";
import api, { auth } from "../utils/Endpoints";
import { useGeneralContext } from "../contexts/GeneralContext";

function Login() {
  const [authId, setAuthId] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { generalDispatch } = useGeneralContext();

  useEffect(() => {
    setAuthId(localStorage.getItem("SQUADID") || "");
    if (!authId) setLoading(false);
  }, []);

  useEffect(() => {
    generalDispatch({
      type: "updateDiscordIdContext",
      payload: userData.discordId,
    });
  }, [userData]);

  useEffect(() => {
    if (!!authId) {
      auth
        .auth(authId)
        .get("/users/@me")
        .then(res => res.json())
        .then(data => {
          data.discordId = data.id;
          delete data.id;
          setUserData(data);
          generalDispatch({
            type: "updateDiscordIdContext",
            payload: data.discordId,
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [authId]);

  function syncBackend() {
    api.user
      .get(userData.discordId)
      .then(res => {
        let { data } = res;
        let diff = [];
        Object.keys(data).forEach(key => {
          if (data[key] !== userData[key]) diff.push(key);
        });
        if (diff.length > 0) {
          let body = {};
          diff.forEach(key => (body[key] = diff[key]));
          api.user
            .update(userData.discordId, body)
            .then()
            .catch(err => console.error(err.message));
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          api.user
            .create(userData)
            .then()
            .catch(err => console.error(err.message));
        } else {
          console.error(err.message);
        }
      });
  }

  function login() {
    auth
      .connect()
      .then(({ authId }) => {
        setAuthId(authId);
        localStorage.setItem("SQUADID", authId);
        generalDispatch({
          type: "updateAuthIdContext",
          payload: authId,
        });
        syncBackend();
      })
      .catch(console.error);
  }

  function logout() {
    setAuthId("");
    localStorage.removeItem("SQUADID");
  }

  return (
    <Dropdown>
      <DropdownToggle nav caret>
        {authId ? (
          <>
            <img
              src={`https://cdn.discordapp.com/avatars/${userData.discordId}/${userData.avatar}.png`}
              alt=""
              className="img-fluid rounded-circle mx-2"
              width="40"
            />
            {!loading && `${userData.username}#${userData.discriminator}`}
          </>
        ) : (
          <Icon icon="user" />
        )}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem href="#!" onClick={authId ? logout : login} className="white-text">
          {authId ? "Logout" : "Login with Discord"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Login;
