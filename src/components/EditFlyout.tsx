// This is a React functional component named EditFlyout, which represents a flyout (a type of modal) used to edit a meeting's details. It uses Elastic UI (EUI) components and interacts with Firebase to update meeting data. The component receives two props:

// closeFlyout: A function to close the flyout.

// meeting: An object containing the meeting details that need to be edited.

// Let's understand the component:

// The component imports the necessary dependencies:

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from "@elastic/eui";
// Several EUI components from the Elastic UI library (@elastic/eui).

import { doc, updateDoc } from "firebase/firestore";
// Functions doc and updateDoc from firebase/firestore, which are used to interact with Firebase Firestore.

import moment from "moment";
// moment is imported to work with dates and times in JavaScript.

import React, { useEffect, useState } from "react";
// React is imported to use JSX and create React components.

import useFetchUsers from "../hooks/useFetchUsers";
// Custom hooks useFetchUsers and useToast, which are used to fetch users' data and display toast notifications.

import useToast from "../hooks/useToast";

import { firebaseDB } from "../utils/firebaseConfig";
// firebaseDB is a reference to the Firebase Firestore database.


import { FieldErrorType, MeetingType, UserType } from "../utils/types";
// FieldErrorType, MeetingType, and UserType are custom types defined elsewhere.

import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "./FormComponents/MeetingNameFIeld";
import MeetingUserField from "./FormComponents/MeetingUserField";

// The EditFlyout function is defined, taking an object as a parameter that contains two properties as described above.

// Inside the component, several states and state updater functions are declared to manage various form inputs and error handling:

export default function EditFlyout({
  closeFlyout,
  meeting,
}: {
  closeFlyout: any;
  meeting: MeetingType;
}) {
  const [users] = useFetchUsers();
  // users: The fetched list of users using the useFetchUsers hook.

  const [createToast] = useToast();
//  createToast: A function obtained from the useToast hook to display toast notifications.

  const [meetingName, setMeetingName] = useState(meeting.meetingName);
// meetingName: State for managing the meeting name input.

  const [meetingType] = useState(meeting.meetingType);
// meetingType: State for managing the meeting type input.

  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  // selectedUser: State for managing the selected users in the combo box.

  const [startDate, setStartDate] = useState(moment(meeting.meetingDate));
// startDate: State for managing the selected meeting date using moment library.

  const [size, setSize] = useState(1);
  // size: State for managing the maximum number of people allowed in the meeting.
  
  const [status, setStatus] = useState(false);
  // status: State for managing the status of the meeting (whether it's canceled or not).

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };
// showErrors: State for handling and displaying form validation errors for meeting name and selected users.

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = [];
      meeting.invitedUsers.forEach((user: string) => {
        const findUser = users.find(
          (tempUser: UserType) => tempUser.uid === user
        );
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUser(foundUsers);
    }
  }, [users, meeting]);
// The component uses the useEffect hook to update the selectedUser state with the already invited users when the users data is fetched. It filters the users array based on the meeting.invitedUsers array to find the already invited users.


  const [showErrors] = useState<{
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

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUser.map((user: UserType) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format("L"),
      status: !status,
    };

    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, "meetings", meeting.docId!);
    await updateDoc(docRef, editedMeeting);
    createToast({ title: "Meeting updated successfully.", type: "success" });
    closeFlyout(true);
  };
// The editMeeting function is defined, which is called when the "Edit Meeting" button is clicked. This function creates an updated meeting object with the modified data and performs the update operation in Firebase using the updateDoc function.


  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meeting.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      {/* The component renders the flyout UI using Elastic UI components:

The EuiFlyout component represents the flyout modal, and the onClose prop is set to the closeFlyout function to close the flyout when the user clicks outside or on the close button.

The EuiFlyoutHeader component contains the header of the flyout, which displays the current meeting name as a title.
 */}


{/* The EuiFlyoutBody component contains the body of the flyout, which wraps the form. */}

      <EuiFlyoutBody>
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meetingType === "anyone-can-join" ? (
            <MeetingMaximumUsersField value={size} setSize={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              singleSelection={
                meetingType === "1-on-1" ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />

            {/* Inside the form, various form components are used to capture meeting details: MeetingNameField, MeetingMaximumUsersField, MeetingUserField, and MeetingDateField. */}

          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButtons
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
// The EuiSpacer component adds space between form elements.

// The CreateMeetingButtons component is used to render the "Edit Meeting" button, which calls the editMeeting function, and the "Cancel" button, which calls the closeFlyout function.


// Overall, this component provides a reusable flyout for editing meeting details. It integrates with the Elastic UI library and Firebase Firestore to create a visually appealing and interactive user interface for editing meeting information in React applications.









