// import MainMenu from "./pages/MainMenu";

// function App() {
//   return <MainMenu />;
// }

// export default App;

import { useState } from "react";
import MainMenu from "./pages/MainMenu";
import EarthMission from "./pages/EarthMission";

function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");

  if (currentScreen === "earth") {
    return (
      <EarthMission
        onBeginMission={() => {
          console.log("Mission started!");
        }}
      />
    );
  }

  return (
    <MainMenu
      onStart={() => setCurrentScreen("earth")}
    />
  );
}

export default App;
