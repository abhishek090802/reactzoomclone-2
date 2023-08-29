// This is a React functional component named Header. It represents the header section of the application and includes navigation links, user information, theme toggler, and logout functionality. The header is designed using Elastic UI (EUI) components.

// Let's understand the component:

// The component imports the necessary dependencies:

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
// Several EUI components from the Elastic UI library (@elastic/eui).

import { signOut } from "firebase/auth";
// signOut function from firebase/auth, which is used to log out the user.

import { useEffect, useState } from "react";
// useEffect and useState from React to handle side effects and state management.

import { useDispatch } from "react-redux";
// useDispatch from react-redux to dispatch actions

import { Link, useLocation, useNavigate } from "react-router-dom";
// Link, useLocation, and useNavigate from react-router-dom for handling navigation within the app.

import { useAppSelector } from "../app/hooks";
// useAppSelector from the app/hooks file, which is a custom hook to access the app's state using useSelector.

import { changeTheme } from "../app/slices/AuthSlice";
// firebaseAuth from ../utils/firebaseConfig, which is a reference to the Firebase authentication.

import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneOnOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/firebaseConfig";
import { BreadCrumbsType } from "../utils/types";

// Inside the component, several states and state updater functions are declared to manage the header's appearance and user information:

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
    {
      text: "Dashboard",
    },
  ]);
  const dispatch = useDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

// userName: State to store the user's name fetched from the app's state using the useAppSelector hook.

// isDarkTheme: State to store the current theme mode (light or dark) fetched from the app's state using the useAppSelector hook.

// breadCrumbs: State to store the breadcrumbs for navigation in the app.

// isResponsive: State to track whether the header is displayed in responsive mode (for smaller screens).


  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

// The component uses the useEffect hook to update the breadCrumbs state based on the current location (pathname) using useLocation hook. It determines the appropriate breadcrumbs to display for different routes.


  const logout = () => {
    signOut(firebaseAuth);
  };
// The logout function is defined, which is called when the user clicks on the logout button. It uses the signOut function from Firebase authentication to log the user out.


  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };
// The invertTheme function is defined to toggle between light and dark themes. It updates the theme mode in the app's state and stores the theme preference in the browser's local storage.


  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {userName ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

// The section and responsiveSection arrays define the different sections of the header for different screen sizes. The section array includes user-specific information and the theme toggler, while the responsiveSection array omits the user-specific information to save space on smaller screens.


  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
  }, []);
// The useEffect hook is used to check the window's inner width and set the isResponsive state to true if the window width is less than 480 pixels.

  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  );
}


// The Header component renders the header UI using Elastic UI components:

// The first EuiHeader component represents the main header section and includes the app's logo (the Zoom text), user-specific information (if available), and the theme toggler and logout button.

// The second EuiHeader component is used to display breadcrumbs for navigation based on the current route.


// Overall, this component provides a reusable header for the application. It integrates with the Elastic UI library and Firebase authentication to create a visually appealing and interactive user interface for handling navigation, theme toggling, and user information in React applications.


