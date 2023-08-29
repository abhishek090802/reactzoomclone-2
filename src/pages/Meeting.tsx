// This code represents the Meeting component in the video conferencing application, which displays a table of meetings for the current user. Let's go through the code:


import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";

import { getDocs, query } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

import { meetingsRef } from "../utils/firebaseConfig";
import { MeetingType } from "../utils/types";

// Imports:

// Various UI components from @elastic/eui, including form-related components like EuiBadge, EuiBasicTable, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, and EuiPanel.

// Firestore related functions like getDocs and query from firebase/firestore.

// moment library to handle date and time.

// React hooks like useEffect and useState.

// Components like Link.

// Custom hooks like useAuth.

// Constants like meetingsRef.

// The MeetingType interface representing the structure of a meeting.

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
// Component function:

// This is the main functional component for the "Meetings" page in the application.

// The component fetches data using the custom hook useAuth to ensure the user is authenticated.

// It sets up a state meetings to hold the list of meetings for the current user.

  useEffect(() => {
    const getMyMeetings = async () => {
// useEffect:

// The useEffect hook is used to trigger the fetching of meetings when the userInfo changes (user is authenticated).

// getMyMeetings function:

// An async function that fetches meetings for the current user from Firestore.

// It constructs a Firestore query to retrieve all meetings and then filters the meetings based on the user's ID and the meeting's type (either "anyone-can-join" or the user is an invited user).

// The filtered meetings are stored in the meetings state.

      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === userInfo?.uid)
            myMeetings.push(meeting.data() as MeetingType);
          else if (data.meetingType === "anyone-can-join")
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              (user: string) => user === userInfo?.uid
            );
            if (index !== -1) {
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);

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
    {
      field: "",
      name: "Status",

// meetingColumns:

// An array of objects representing the columns of the EuiBasicTable.

// Each column is configured with a field, name, and render function to define the data to be displayed and its format.

// The "Status" column displays a badge representing the status of the meeting (upcoming, ended, cancelled, or join now).

// The "Copy Link" column contains a button to copy the join link for each meeting


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
      field: "meetingId",
      name: "Copy Link",
      width: "10%",
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
    </div>
  );
}


// JSX rendering:

// The component renders a table (EuiBasicTable) with meetings displayed in rows and columns based on the meetingColumns configuration.

// The table rows represent meetings fetched from Firestore and are updated dynamically when the data changes.

// The "Copy Link" button in the table uses the EuiCopy component to copy the join link for each meeting.


// The Meeting component allows authenticated users to view a table of meetings created by them or meetings they have been invited to join. It fetches meeting data from Firestore and updates the table dynamically when the data changes. The component also provides buttons to copy the join link for each meeting and displays the status of each meeting (upcoming, ended, cancelled, or join now).
