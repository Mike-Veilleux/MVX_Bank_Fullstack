import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserType } from "../../../interfaces/ENUMS";
import { GoogleAccount } from "../../../interfaces/GoogleAccount";
import { useUser_ACTIONS, useUser_API } from "../../../stores/useUserStore";
const GoogleLogin = () => {
  const user_ACTIONS = useUser_ACTIONS();
  const user_API = useUser_API();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  async function handleCallbackResponse(response: any) {
    setLoading(true);
    const jwtToken = response.credential;
    const userData: GoogleAccount = jwtDecode(jwtToken);

    const userType: IUserType | null = await user_API.LoginUserType(
      userData!.email
    );
    setLoading(false);
    if (userType === IUserType.NONE) {
      user_ACTIONS.setNewUser({
        name: userData.name,
        email: userData.email,
        password: "",
        googleID: userData.sub,
      });

      navigate("/create-account");
    } else {
      if (userType !== IUserType.GOOGLE) {
        alert(
          `This email is linked to an existing MVX Bank account, Try log in with "MVX Bank Login" method!`
        );
      } else {
        await user_API.LoginGoogleUser(userData.email, userData.sub);

        navigate("/home");
      }
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_CLIENT_ID,
      context: "signin",
      callback: handleCallbackResponse,
    });
    const googleDiv = document.getElementById("signInDiv");
    google.accounts.id.renderButton(googleDiv!, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: "350px",
      logo_alignment: "center",
      locale: "en",
    });
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="spinner-border text-success" role="status"></div>
          <div style={{ textAlign: "center" }}>Verifying user...</div>
        </div>
      )}
      <div id="signInDiv"></div>
    </>
  );
};

export default GoogleLogin;
