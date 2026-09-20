function EarthExploration({ onLaunch }) {
  return (
    <main className="earth-exploration">

      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="exploration-background"></div>

      <div className="exploration-stars"></div>


      {/* ========================================
          TOP NAVIGATION
      ======================================== */}

      <header className="exploration-header">

        <div className="exploration-brand">
          BEYOND TIME
        </div>

        <div className="exploration-mission">
          MISSION 01
        </div>

      </header>


      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <section className="exploration-content">

        <p className="exploration-label">
          EARTH — LAUNCH PREPARATION
        </p>

        <h1>
          ORBITAL DEPARTURE
        </h1>

        <div className="exploration-line"></div>


        <p className="exploration-description">
          Your spacecraft is ready for departure.
          The gravitational anomaly has been detected
          beyond the outer Solar System.
        </p>


        {/* ========================================
            SHIP STATUS
        ======================================== */}

        <section className="ship-status">

          <div className="ship-status-item">

            <span>
              LOCATION
            </span>

            <strong>
              EARTH
            </strong>

          </div>


          <div className="ship-status-item">

            <span>
              ORBIT
            </span>

            <strong>
              LOW EARTH ORBIT
            </strong>

          </div>


          <div className="ship-status-item">

            <span>
              OXYGEN
            </span>

            <strong>
              98%
            </strong>

          </div>


          <div className="ship-status-item">

            <span>
              FUEL
            </span>

            <strong>
              92%
            </strong>

          </div>

        </section>


        {/* ========================================
            OBJECTIVE
        ======================================== */}

        <section className="exploration-objective">

          <span>
            CURRENT OBJECTIVE
          </span>

          <p>
            Prepare the spacecraft for departure and
            establish a trajectory toward the outer
            Solar System.
          </p>

        </section>


        {/* ========================================
            LAUNCH BUTTON
        ======================================== */}

        <button
          className="start-button"
          onClick={onLaunch}
        >
          LAUNCH SPACECRAFT
        </button>

      </section>

    </main>
  );
}

export default EarthExploration;