import React, { useState } from "react";

const HostApp = () => {
  const [RemoteButton, setRemoteButton] = useState(null);

  const loadRemoteButton = async () => {
    if (!RemoteButton) {
      try {
        const module = await import("remoteApp/Button");
        setRemoteButton(module.default);
      } catch (error) {
        console.error("Failed to load remote button:", error);
      }
    }
  };

  return (
    <div>
      <h1>Host Application</h1>
      <button onClick={loadRemoteButton}>Load Remote Button</button>
      {RemoteButton && <RemoteButton />}
    </div>
  );
};

export default HostApp;
