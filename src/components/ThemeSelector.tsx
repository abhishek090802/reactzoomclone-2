// This is a React functional component named ThemeSelector. It is a higher-order component (HOC) that dynamically switches between light and dark themes for the application. The component uses React.lazy to asynchronously load and render the appropriate theme based on the theme mode stored in the browser's local storage.

// Let's understand the component:

import { EuiThemeColorMode } from "@elastic/eui";
import React, { Suspense, useEffect, useState } from "react";
// EuiThemeColorMode from the Elastic UI library (@elastic/eui).

// React to create React components.

// Suspense from React to handle code-splitting and loading fallback.

const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));
// Two components, LightTheme and DarkTheme, which represent the light and dark theme components. These components are imported using dynamic import (React.lazy) to be loaded on-demand.


export default function ThemeSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  // Inside the component, the useState hook is used to manage the theme state, which stores the current theme mode (light or dark).

  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}

// The useEffect hook is used to retrieve the theme mode stored in the browser's local storage. When the component mounts, it checks for the theme mode in local storage and sets the theme state accordingly.

// The ThemeSelector component renders its children components within a Suspense component. The Suspense component is used for code-splitting, and it provides a fallback UI (an empty fragment in this case) while loading the appropriate theme.

// Inside the Suspense component, the appropriate theme component is rendered based on the theme state. If the theme is set to "dark," the DarkTheme component is loaded, and if it's set to "light," the LightTheme component is loaded.

// After rendering the theme component, the children of the ThemeSelector are rendered. These are the components that will receive the selected theme.

// Overall, this component provides a way to dynamically switch between light and dark themes for the application. It asynchronously loads and renders the appropriate theme based on the theme mode stored in the browser's local storage. By wrapping the application's components with ThemeSelector, the components can be automatically styled with the chosen theme, creating a consistent and visually appealing user interface.




