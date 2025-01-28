import React from "react";
import { createRoot } from "react-dom/client";
import TestEffect from "./components/storyStyles/TestEffect";

const AppReelsList = () => <TestEffect />;

const rootElement = document.getElementById("react-app-block-root");

if (rootElement) {
  if (!rootElement._reactRoot) {
    rootElement._reactRoot = createRoot(rootElement);
  }
  rootElement._reactRoot.render(<AppReelsList />);
} else {
  console.error("Root element not found.");
}

export default AppReelsList;
