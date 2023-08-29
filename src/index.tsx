import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// App: This is the main component of the application. It represents the root of the component tree.

import { Provider } from "react-redux";
// Provider: This component is part of the react-redux library and allows the Redux store to be available to all components in the application.

import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
// BrowserRouter: This is a React Router component used to handle client-side routing with the browser's URL.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* The application's entry point starts by rendering the App component inside the HTML element with the ID "root." */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


// The entire application is wrapped in <React.StrictMode>. This is a development-only feature that performs additional checks and warnings to help identify potential problems in the application.

// The Provider component is used to wrap the entire application. This enables Redux's store to be accessed from any component in the app.

// The BrowserRouter is used to wrap the App component, allowing the application to utilize client-side routing with React Router.

// The ReactDOM.render() method is called to render the application in the DOM. The application is rendered inside the HTML element with the ID "root" (specified by document.getElementById("root")).
