// These are TypeScript interfaces defining the data types used in the video conferencing application. Let's go through each interface:


export interface ToastType {
  id: string;
  title: string;
  color: "success" | "primary" | "warning" | "danger" | undefined;
}
// ToastType:

// id: A unique identifier for the toast message.

// title: The title or main content of the toast message.

// color: A string specifying the color of the toast, which can be one of the following values: "success", "primary", "warning", "danger", or undefined.

export interface BreadCrumbsType {
  text: string;
  href?: string;
  onClick?: () => void;
}
// BreadCrumbsType:

// text: The text to display for the breadcrumb.

// href (optional): The URL or link to navigate when the breadcrumb is clicked.

// onClick (optional): A callback function to execute when the breadcrumb is clicked.

export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

// MeetingJoinType:

// A union type defining three possible values for the type of meeting join settings:

// "anyone-can-join": Anyone can join the meeting without restrictions.

// "video-conference": Only invited participants can join the video conference.

// "1-on-1": The meeting is a one-on-one meeting between two participants.

export interface MeetingType {
  docId?: string;
  createdBy: string;
  invitedUsers: Array<string>;
  maxUsers: number;
  meetingDate: string;
  meetingId: string;
  meetingName: string;
  meetingType: MeetingJoinType;
  status: boolean;
}
// MeetingType:

// docId (optional): A unique identifier for the meeting document.

// createdBy: The user ID of the meeting creator.

// invitedUsers: An array of user IDs of participants invited to the meeting.

// maxUsers: The maximum number of users allowed in the meeting.

// meetingDate: The date of the meeting in string format.

// meetingId: A unique identifier for the meeting.

// meetingName: The name or title of the meeting.

// meetingType: The type of meeting join settings (as defined in MeetingJoinType).

// status: A boolean indicating the status of the meeting (e.g., active or inactive).

export interface UserType {
  email: string;
  name: string;
  uid: string;
  label?: string;
}
// UserType:

// email: The email address of the user.

// name: The name of the user.

// uid: A unique identifier for the user.

// label (optional): An additional label for the user (not specified in the interface).

export interface FieldErrorType {
  show: boolean;
  message: Array<string>;
}
// FieldErrorType:

// show: A boolean indicating whether to show the error or not.

// message: An array of strings containing error messages.


// These interfaces help maintain type safety and consistency in the application by defining the expected shapes of various data objects used throughout the code.
