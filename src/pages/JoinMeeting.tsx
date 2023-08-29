// This is the JoinMeeting component, responsible for handling user participation in a meeting. It utilizes the ZegoUIKitPrebuilt library for video conferencing capabilities. The component allows users to join a meeting based on the provided params.id, and it checks whether the user is allowed to join the meeting based on meeting type, invited users, and meeting date.

// Here's a breakdown of the main functionalities:

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";

export default function JoinMeeting() {
  const params = useParams();
  // The component uses the useParams hook from react-router-dom to get the meeting ID from the URL parameters.

  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });
  // It uses the onAuthStateChanged function from Firebase to check if the user is logged in and sets the user state accordingly.

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };

     getMeetingData();
  }, [userLoaded]);
  // const appId=556361161;
  // const serverSecret="641fce7e218ee53bb32519242ec7c23e";
  
  const appId=181337744;
  const serverSecret="d2a03d5c7e640be5abbd7bf69615d581";
  
// The component fetches meeting data from Firestore based on the provided meeting ID and checks if the user is allowed to join the meeting based on meeting type, invited users, and meeting date.

  const myMeeting = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
     appId,
     serverSecret,
     params.id as string,
     user.uid?user.uid:generateMeetingID(),
     user.displayName?user.displayName:generateMeetingID()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp?.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
// If the user is allowed to join the meeting, the ZegoUIKitPrebuilt library is used to create a video conferencing room. It generates a kitToken for the user to join the room.

// The myMeeting function is responsible for creating and joining the video conferencing room using the ZegoUIKitPrebuilt library.


  return isAllowed ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  ) : (
    <></>
  );
}

// If the user is not allowed to join the meeting, nothing is rendered (an empty fragment <>).


// Please note that this component assumes that the ZegoUIKitPrebuilt library and its functions, such as generateKitTokenForTest and create, are correctly set up and functional. The specific configuration and implementation details of the ZegoUIKitPrebuilt library are not provided in the code snippet. Make sure to import the library and configure it correctly in your application.


