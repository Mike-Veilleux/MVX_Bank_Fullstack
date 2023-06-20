import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAccount } from "../../../interfaces/GoogleAccount";
import { IUser } from "../../../interfaces/IUser";
import { useUser_API } from "../../../stores/useUserStore";

type PrivateProps = {
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmailExistAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHaveAccountWillLoginAlert: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const GoogleSignUpButton = ({
  setShowSuccessAlert,
  setShowHaveAccountWillLoginAlert,
  setShowEmailExistAlert,
}: PrivateProps) => {
  const user_API = useUser_API();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  async function handleCallbackResponse(response: any) {
    setLoading(true);
    const jwtToken = response.credential;
    const userData: GoogleAccount = jwtDecode(jwtToken);

    const isUserExisting: boolean = await user_API.LoginGoogleUser(
      userData.email,
      userData.sub
    );

    // const getType = await user_API.LoginUserType(userData.email);

    if (isUserExisting) {
      setShowHaveAccountWillLoginAlert(true);
      setLoading(false);
    }
    // if (getType !== IUserType.NONE) {
    //   setShowEmailExistAlert(true);
    //   setLoading(false);
    // }
    else {
      const newUser: IUser = {
        name: userData.name,
        email: userData.email,
        password: "",
        googleID: userData.sub,
      };
      setShowSuccessAlert(true);
      await user_API.CreateNewUser(newUser);
      await user_API.LoginGoogleUser(userData.email, userData.sub);

      setLoading(false);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_CLIENT_ID,
      context: "signup",
      callback: handleCallbackResponse,
    });
    const googleDiv = document.getElementById("signInDiv");
    google.accounts.id.renderButton(googleDiv!, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: "350px",
      logo_alignment: "center",
      text: "signup_with",
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

export default GoogleSignUpButton;
