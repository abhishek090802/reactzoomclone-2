// This code represents the OneOnOneMeeting component in the video conferencing application, which allows users to create one-on-one meetings. Let's go through the code:


import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
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

// Various UI components from @elastic/eui, including form-related components like EuiForm and EuiFlexGroup.

// addDoc function from firebase/firestore to add a new document to the Firestore database.

// moment library to handle date and time.

// React hooks and custom hooks like useState, useNavigate, useAppSelector, and custom hooks like useAuth, useFetchUsers, and useToast.

// Custom components like CreateMeetingButtons, MeetingDateField, MeetingNameField, and MeetingUserField.

// Constants like meetingsRef and the generateMeetingID function.


export default function OneOnOneMeeting() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();
  //  Component function:

// This is the main functional component for the "Create One-on-One Meeting" page in the application.

// The component fetches data using the custom hooks (useAuth, useFetchUsers, and useToast) and sets up states for managing form inputs and errors.

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

// States and state update functions:

// States include meetingName, selectedUser, startDate, and showErrors.

// The component uses the useState hook to initialize and manage these states.

// showErrors is an object with properties for displaying validation errors related to meeting name and invited user.

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };
// Helper functions:

// onUserChange: Updates the selectedUser state when the selected user changes in the MeetingUserField component.

// validateForm: Validates the form inputs and sets the showErrors state accordingly. Returns true if there are validation errors, otherwise false.


  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Successfully",
        type: "success",
      });
      navigate("/");
    }
  };
// createMeeting function:

// Handles the process of creating a new one-on-one meeting:

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
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
// JSX rendering:

// The component renders a form with various form fields for creating a one-on-one meeting.

// The form fields are implemented using custom components like MeetingNameField, MeetingUserField, and MeetingDateField.

// A set of buttons (CreateMeetingButtons) is provided to create the meeting.


// The OneOnOneMeeting component allows users to create one-on-one meetings by filling out the form fields and submitting the form. It also handles form validation and shows appropriate error messages. Upon successful submission, the meeting data is added to the Firestore database, and a success toast is displayed before navigating back to the dashboard page.





