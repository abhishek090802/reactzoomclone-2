// This code represents the VideoConference component in the video conferencing application. Let's break down the code and understand its functionality:


import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "../components/FormComponents/MeetingNameFIeld";
import MeetingUserField from "../components/FormComponents/MeetingUserField";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { FieldErrorType, UserType } from "../utils/types";
// Imports:

// Various UI components from @elastic/eui, including form-related components like EuiForm, EuiFormRow, and EuiSwitch.

// addDoc function from firebase/firestore to add a new document to the Firestore database.

// moment library to handle date and time.

// React hooks and custom hooks like useState, useNavigate, useAppSelector, and custom hooks like useAuth, useFetchUsers, and useToast.

// Custom components like CreateMeetingButtons, MeetingDateField, MeetingMaximumUsersField, MeetingNameField, and MeetingUserField.

// Constants like meetingsRef and the generateMeetingID function.


export default function VideoConference() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUsers: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    // Component function:

// This is the main functional component for the "Create Video Conference" page in the application.

// The component fetches data using the custom hooks (useAuth, useFetchUsers, and useToast) and sets up states for managing form inputs and errors.

    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length && !anyoneCanJoin) {
      showErrorsClone.meetingUsers.show = true;
      showErrorsClone.meetingUsers.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUsers.show = false;
      showErrorsClone.meetingUsers.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };
// States and state update functions:

// States include meetingName, selectedUser, startDate, size, showErrors, and anyoneCanJoin.

// The component uses the useState hook to initialize and manage these states.

// showErrors is an object with properties for displaying validation errors related to meeting name and invited users.

// Helper functions:

// onUserChange: Updates the selectedUser state when the selected users change in the MeetingUserField component.

// validateForm: Validates the form inputs and sets the showErrors state accordingly. Returns true if there are validation errors, otherwise false.


  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUser.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyoneCanJoin
          ? "Anyone can join meeting created successfully"
          : "Video Conference created successfully.",
        type: "success",
      });
      navigate("/");
    }
  };

// createMeeting function:

// Handles the process of creating a new meeting:

// Validates the form using the validateForm function.

// If the form is valid, generates a random meeting ID using the generateMeetingID function.

// Adds the meeting data to the Firestore database using the addDoc function with the meetingsRef reference.

// Shows a success toast using the createToast function.

// Navigates back to the dashboard page using the navigate function.


  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
            <EuiSwitch
              showLabel={false}
              label="Anyone Can Join"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>

          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />

          {anyoneCanJoin ? (
            <MeetingMaximumUsersField value={size} setSize={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}

// JSX rendering:

// The component renders a form with various form fields for creating a video conference meeting.

// It uses conditional rendering based on the value of anyoneCanJoin to display either the maximum user field or the user invitation field.

// The form fields are implemented using custom components like MeetingNameField, MeetingMaximumUsersField, MeetingUserField, and MeetingDateField.

// A set of buttons (CreateMeetingButtons) is provided to create the meeting.


// The VideoConference component allows users to create video conference meetings by filling out the form fields and submitting the form. It also handles form validation and shows appropriate error messages. Upon successful submission, the meeting data is added to the Firestore database, and a success toast is displayed before navigating back to the dashboard page.
