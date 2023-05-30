import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useUser_ACTIONS, useUser_API } from "../stores/useUserStore";
const GoogleLogin = () => {
  const user = useUser();
  const user_ACTIONS = useUser_ACTIONS();
  const user_API = useUser_API();
  const navigate = useNavigate();

  async function handleCallbackResponse(response: any) {
    const jwtToken = response.credential;
    //const userData = jwtDecode(jwtToken);
    console.log(userData);

    const res = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/token`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = res.data;

    console.log(data);

    // const isExisting = await user_API.FetchUserByEmail(user?.email!);
    // if (!isExisting) {
    //   navigate("/create-account");
    // } else {
    //   //user_ACTIONS.setActiveUser()
    // }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "309903823130-rgc51vbl3po1e753h78lhqkhrkc4h6dp.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    const googleDiv = document.getElementById("signInDiv");
    google.accounts.id.renderButton(googleDiv!, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="signInDiv"></div>;
};

export default GoogleLogin;
