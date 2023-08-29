import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";

// EuiCard: This is a component that represents a card element, commonly used to display information or content in a structured way.

// EuiFlexGroup and EuiFlexItem: These components are used to create a flexible container (EuiFlexGroup) that allows its children (EuiFlexItem) to automatically adjust their width based on the available space. This helps in building responsive layouts.

// EuiImage: This is a component for displaying images, and it likely has some additional features and optimizations for handling images in the Elastic UI framework.

import { useNavigate } from "react-router-dom";

// The import statement you provided is using the ES6 module syntax to import the useNavigate hook from the "react-router-dom" package.

// react-router-dom is a package used in React applications for handling client-side routing. It provides several hooks and components to enable navigation and routing within a single-page application.

// The useNavigate hook is one of the hooks provided by react-router-dom. It allows you to programmatically navigate to different routes within your application. The useNavigate hook is typically used when you want to trigger a navigation action based on certain events, such as a button click or form submission.


import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";

import useAuth from "../hooks/useAuth";
// The useAuth React Hook allows us to sign in, sign out, and fetch information about the user as soon u sign in,singn out and reach the dashboard page then you will get the required information or all the necessay information about that user from database firebase it is a react hook 

function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
//           In CSS, display: flex is a property that turns an element into a flexible container, enabling it to create a flexbox layout. Flexbox is a layout model that allows you to arrange elements (children) within a container in a flexible manner, either horizontally (in a row) or vertically (in a column).

// When you apply display: flex to an element, it becomes a flex container, and its direct children become flex items. The flex container controls the layout and positioning of its flex items, offering a wide range of capabilities for building responsive and dynamic layouts.

          height: "100vh",
          // The vh unit stands for "viewport height," and it represents a percentage of the total height of the viewport (the visible area of the browser window). The viewport height is the height of the browser window, and it changes when the user resizes the window.

          flexDirection: "column",
          // In CSS, flexDirection: "column" is a property used in flexbox layouts to specify the direction in which the flex items should be laid out along the main axis of the flex container.

        }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
          // In the example you provided, style={{ margin: "5vh 10vw" }}, the element will have a margin of 5% of the viewport height (vh) on the top and bottom, and 10% of the viewport width (vw) on the left and right.

          // Here's what the values "5vh" and "10vw" mean:
          
          // 5vh: This represents 5% of the viewport height. If the viewport height is 1000 pixels, then 5vh would be equal to 50 pixels (1000 * 0.05 = 50).
          
          // 10vw: This represents 10% of the viewport width. If the viewport width is 800 pixels, then 10vw would be equal to 80 pixels (800 * 0.10 = 80).

        >

          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
// dashboard1: This is likely a variable or import representing the source of the image to be used as the icon. It could be a local image file or a URL to an image.

// <EuiImage>: This is an EUI component used to display images. It's part of the Elastic UI framework.

// src={dashboard1}: This prop sets the source of the image to be displayed. The value of dashboard1 will be used as the source URL for the image.

// alt="icon": This prop sets the alternative text for the image, which is displayed when the image cannot be loaded or accessed. It is important for accessibility purposes.

// size="5rem": This prop sets the size of the image. The value "5rem" indicates that the image will have a width and height of 5 rem units.

              title={`Create Meeting`}
              description="Create a new meeting and invite people."
              onClick={() => navigate("/create")}
              paddingSize="xl"
              // EUI has a set of predefined padding sizes that you can use, and "xl" refers to the extra large size. The actual size of the padding may vary depending on the specific EUI component and its styling.
              
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
              title={`My Meetings`}
              description="View your created meetings."
              onClick={() => navigate("/mymeetings")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
              title={`Meetings`}
              description="View the meetings that you are invited to."
              onClick={() => navigate("/meetings")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}
// The EuiCard component also has an onClick prop that defines the action to be taken when the card is clicked. In this case, it uses the navigate function from react-router-dom to navigate to the specified route when the card is clicked.

// The EuiCard components have a paddingSize="xl" prop, which sets the padding size to extra large (xl).



export default Dashboard;

// Overall, the Dashboard component provides a user-friendly interface with clickable cards that allow users to navigate to different sections of the application related to meetings. The layout is responsive and adapts to different screen sizes due to the use of EUI's flexbox-based components.


