import { useState } from "react";

import MainMenu from "./pages/MainMenu";
import EarthMission from "./pages/EarthMission";
import MissionBriefing from "./pages/MissionBriefing";
import EarthExploration from "./pages/EarthExploration";
import LaunchSequence from "./pages/LaunchSequence";
import SolarSystem from "./pages/SolarSystem";
import SaturnApproach from "./pages/SaturnApproach";
import SaturnOrbit from "./pages/SaturnOrbit";
import SpaceFlight from "./pages/SpaceFlight";

function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");

  if (currentScreen === "earth") {
    return (
      <EarthMission
        onBeginMission={() => {
          setCurrentScreen("briefing");
        }}
      />
    );
  }

  if (currentScreen === "briefing") {
    return (
      <MissionBriefing
        onAcceptMission={() => {
          setCurrentScreen("exploration");
        }}
      />
    );
  }

  if (currentScreen === "exploration") {
    return (
      <EarthExploration
        onLaunch={() => {
          setCurrentScreen("launch");
        }}
      />
    );
  }

  if (currentScreen === "launch") {
    return (
      <LaunchSequence
        onComplete={() => {
          setCurrentScreen("solar-system");
        }}
      />
    );
  }

  if (currentScreen === "solar-system") {
  return (
    <SolarSystem
      onContinue={() => {
        setCurrentScreen("saturn-approach");
      }}
    />
  );
}

if (currentScreen === "saturn-approach") {
  return (
    <SaturnApproach
      onContinue={() => {
        setCurrentScreen("saturn-orbit");
      }}
    />
  );
}

if (currentScreen === "saturn-orbit") {
  return (
    <SaturnOrbit
      onContinue={() => {
        setCurrentScreen("space-flight");
      }}
    />
  );
}

if (currentScreen === "space-flight") {
  return (
    <SpaceFlight
      onAnomalyDetected={() => {
        console.log("Anomaly scan initiated!");
      }}
    />
  );
}

  return (
    <MainMenu
      onStart={() => {
        setCurrentScreen("earth");
      }}
    />
  );
}

export default App;