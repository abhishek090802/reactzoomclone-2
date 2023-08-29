// The provided code snippet defines several functions to generate breadcrumb data for different pages in the video conferencing application. Each function takes the navigate function from react-router-dom as a parameter and returns an array of BreadCrumbsType objects. Each BreadCrumbsType object represents a breadcrumb item with text, optional link (href), and an optional callback (onClick) for handling breadcrumb clicks.

// The breadcrumb data is used to build a navigation path in the user interface, allowing users to easily navigate between different pages. The breadcrumb items are represented as an array, where each item contains information about the text to display and the navigation action when clicked.

// Here's a summary of what each function does:


import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./types";

export const getDashboardBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
  },
];
// getDashboardBreadCrumbs:

// Returns an array containing a single breadcrumb object with the text "Dashboard." This breadcrumb represents the dashboard page.


export const getCreateMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
  },
];
// getCreateMeetingBreadCrumbs:

// Returns an array containing two breadcrumb objects:

// The first object has the text "Dashboard" and an onClick callback that navigates to the dashboard page ("/") when clicked.

// The second object has the text "Create Meeting." This breadcrumb represents the page where users can create a new meeting.

export const getOneOnOneMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "Create 1 on 1 Meeting",
  },
];
// getOneOnOneMeetingBreadCrumbs:

// Returns an array containing three breadcrumb objects:

// The first object has the text "Dashboard" and an onClick callback that navigates to the dashboard page ("/") when clicked.

// The second object has the text "Create Meeting" and an onClick callback that navigates to the create meeting page ("/create") when clicked.

// The third object has the text "Create 1 on 1 Meeting." This breadcrumb represents the page where users can create a one-on-one meeting.


export const getVideoConferenceBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "Create Video Conference",
  },
];

// getVideoConferenceBreadCrumbs:

// Returns an array containing three breadcrumb objects:

// The first object has the text "Dashboard" and an onClick callback that navigates to the dashboard page ("/") when clicked.

// The second object has the text "Create Meeting" and an onClick callback that navigates to the create meeting page ("/create") when clicked.

// The third object has the text "Create Video Conference." This breadcrumb represents the page where users can create a video conference.


export const getMyMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "My Meetings",
  },
];
// getMyMeetingsBreadCrumbs:

// Returns an array containing two breadcrumb objects:

// The first object has the text "Dashboard" and an onClick callback that navigates to the dashboard page ("/") when clicked.

// The second object has the text "My Meetings." This breadcrumb represents the page where users can view their scheduled meetings.



export const getMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Meetings",
  },
];

// getMeetingsBreadCrumbs:

// Returns an array containing two breadcrumb objects:

// The first object has the text "Dashboard" and an onClick callback that navigates to the dashboard page ("/") when clicked.

// The second object has the text "Meetings." This breadcrumb represents the page where users can view all available meetings.

// These functions are designed to simplify the process of creating breadcrumb data for different pages in the application by providing a reusable way to generate breadcrumb arrays based on the current page and navigation context.
