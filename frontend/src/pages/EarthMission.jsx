import GameHUD from "../components/GameHUD";

function EarthMission({ onBeginMission }) {
  return (
    <main className="earth-mission">

      {/* ========================================
          EARTH BACKGROUND
      ======================================== */}

      <div className="earth-overlay"></div>

      <div className="earth-scene">

        {/* Atmospheric glow */}
        <div className="earth-glow"></div>

        {/* Earth */}
        <div className="earth-planet">

          {/* Cloud layer */}
          <div className="earth-clouds"></div>

        </div>

      </div>

      {/* ========================================
          THREE-AREA GAME LAYOUT
      ======================================== */}

      <div className="earth-layout">

        {/* ======================================
            FIXED TOP HUD
        ====================================== */}

        <div className="earth-header">

          <GameHUD
            type="top"
            mission="MISSION 01"
            location="EARTH"
          />

        </div>

        {/* ======================================
            ONLY THIS AREA SCROLLS
        ====================================== */}

        <section className="mission-scroll-area">

          <div className="mission-content">

            <p className="mission-number">
              MISSION 01
            </p>

            <h1>EARTH</h1>

            <div className="earth-line"></div>

            <p className="mission-description">
              An unexplained gravitational signal has been
              detected beyond the outer Solar System.
            </p>

            <p className="mission-description">
              Your mission is to investigate its origin.
            </p>

            <button
              className="start-button"
              onClick={onBeginMission}
            >
              BEGIN MISSION
            </button>

          </div>

        </section>

        {/* ======================================
            FIXED BOTTOM HUD
        ====================================== */}

        <div className="earth-footer">

          <GameHUD
            type="bottom"
            oxygen={98}
            fuel={92}
            energy={100}
            distance="1.2 AU"
          />

        </div>

      </div>

    </main>
  );
}

export default EarthMission;
