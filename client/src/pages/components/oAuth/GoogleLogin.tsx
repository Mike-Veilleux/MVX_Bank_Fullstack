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

    const isExistingUser: IUserType | null = await user_API.CheckExistingUser(
      userData!.email
    );
    setLoading(false);
    if (isExistingUser === IUserType.NONE) {
      user_ACTIONS.setNewUser({
        name: userData.name,
        email: userData.email,
        password: "",
        googleID: userData.sub,
      });

      navigate("/create-account");
    } else {
      if (isExistingUser !== IUserType.GOOGLE) {
        alert(
          `This email is linked to an existing MVX account, Try log in with "MVX Bank Login" method!`
        );
      } else {
        await user_API.AuthenticateGoogleUser(userData.email, userData.sub);

        navigate("/home");
      }
    }
    // user_API.MailMessage(
    //   userData.email,
    //   `Hi ${userData.given_name}, You just login MVX Bank!`
    // );
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
      text: "signin_with",
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
