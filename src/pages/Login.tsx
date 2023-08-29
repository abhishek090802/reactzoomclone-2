// This is the revised Login component, which remains unchanged from the previous version. It is a functional component responsible for handling user authentication using Google Sign-In. The component uses Elastic UI (EUI) components for the user interface and interacts with Firebase for authentication and Firestore for database operations.

// The main functionalities of the Login component are:

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";

import logo from "../assets/logo.png";
import animation from "../assets/animation.gif";

import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

// Listening to the authentication state with onAuthStateChanged to check if a user is already authenticated. If a user is already logged in, they are redirected to the dashboard page.


function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }

      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }


  };
  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

// The login function is triggered when the "Login with Google" button is clicked. It initiates the Google Sign-In process and handles the user authentication.

// The EuiPanel and EuiFlexGroup components are used for layout and organization of the login page.

// The EuiImage component displays the logo and animation images.

// The EuiText component displays the "One Platform to connect" text with a colored "connect" part.

// The EuiButton component is used to trigger the login process with Google.

export default Login;

// Overall, the Login component provides a user-friendly login interface that allows users to log in using their Google accounts. If the user is already authenticated, they are redirected to the dashboard page. Otherwise, they can click the "Login with Google" button to start the authentication process.



