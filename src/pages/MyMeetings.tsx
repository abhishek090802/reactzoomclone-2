// This code represents the MyMeetings component in the video conferencing application, which displays a table of meetings created by the current user. Let's go through the code:


import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import EditFlyout from "../components/EditFlyout";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/firebaseConfig";
import { MeetingType } from "../utils/types";

// Imports:

// Various UI components from @elastic/eui, including form-related components like EuiBadge, EuiBasicTable, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, and EuiPanel.

// Firestore related functions like getDocs, query, and where from firebase/firestore.

// moment library to handle date and time.

// React hooks and custom hooks like useState, useEffect, and useCallback.

// Components like Link and custom components like EditFlyout.

// Constants like meetingsRef.

// The MeetingType interface representing the structure of a meeting.


export default function MyMeetings() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
// Component function:

// This is the main functional component for the "My Meetings" page in the application.

// The component fetches data using the custom hook useAuth to ensure the user is authenticated.

// It sets up states for managing the list of meetings, controlling the edit flyout, and holding the meeting data to be edited.


  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType>();
  
// States and state update functions:

// States include meetings, showEditFlyout, and editMeeting.

// The component uses the useState hook to initialize and manage these states.

  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(
      meetingsRef,
      where("createdBy", "==", userInfo?.uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType),
        });
      });
      setMeetings(myMeetings);
    }
  }, [userInfo?.uid]);
// getMyMeetings function:

// A useCallback function to fetch the meetings created by the current user from Firestore.

// It constructs a Firestore query to filter meetings by the user's ID and retrieves the relevant documents.

// The fetched meetings are converted to an array of MeetingType objects and stored in the meetings state.

  useEffect(() => {
    if (userInfo) getMyMeetings();
  }, [userInfo, getMyMeetings]);

// useEffect:

// The useEffect hook is used to trigger the getMyMeetings function when the userInfo changes (user is authenticated).


  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };
// Helper functions:

// openEditFlyout: Sets the showEditFlyout state to true and sets the meeting data to be edited in the editMeeting state.

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };

  // closeEditFlyout: Closes the edit flyout, optionally triggering a re-fetch of meetings if the data has been changed.


  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
// meetingColumns:

// An array of objects representing the columns of the EuiBasicTable.

// Each column is configured with a field, name, and render function to define the data to be displayed and its format.

// The "Status" column displays a badge representing the status of the meeting (upcoming, ended, cancelled, or join now).

// The "Edit" and "Copy Link" columns contain buttons for editing a meeting and copying its join link, respectively.


    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
    {
      field: "",
      name: "Edit",
      width: "5%",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              moment(meeting.meetingDate).isBefore(moment().format("L")) ||
              !meeting.status
            }
            onClick={() => openEditFlyout(meeting)}
          />
        );
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      width: "5%",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={meetingColumns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      {showEditFlyout && (
        <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
      )}
    </div>
  );
}

// JSX rendering:

// The component renders a table (EuiBasicTable) with meetings displayed in rows and columns based on the meetingColumns configuration.

// The table rows represent meetings fetched from Firestore and are updated dynamically when the meetings state changes.

// The "EditFlyout" component is conditionally rendered (showEditFlyout &&) to allow editing meeting details.

// The "EditFlyout" is passed the closeEditFlyout function and the editMeeting state as props.

// The MyMeetings component allows authenticated users to view a table of their created meetings. They can edit meetings that are not yet started and copy the join link for each meeting. The component fetches meeting data from Firestore and updates the table dynamically when the data changes.
