function LaunchSequence({ onComplete }) {
  return (
    <main className="launch-sequence">

      {/* ========================================
          SPACE BACKGROUND
      ======================================== */}

      <div className="launch-space"></div>

      <div className="launch-stars"></div>


      {/* ========================================
          LAUNCH CONTENT
      ======================================== */}

      <section className="launch-content">

        <p className="launch-label">
          MISSION 01
        </p>

        <h1>
          LAUNCH SEQUENCE
        </h1>

        <div className="launch-line"></div>


        {/* ========================================
            STATUS
        ======================================== */}

        <div className="launch-status">

          <div className="launch-status-item">

            <span>
              SPACECRAFT
            </span>

            <strong>
              READY
            </strong>

          </div>


          <div className="launch-status-item">

            <span>
              LIFE SUPPORT
            </span>

            <strong>
              NOMINAL
            </strong>

          </div>


          <div className="launch-status-item">

            <span>
              NAVIGATION
            </span>

            <strong>
              LOCKED
            </strong>

          </div>


          <div className="launch-status-item">

            <span>
              TRAJECTORY
            </span>

            <strong>
              CALCULATED
            </strong>

          </div>

        </div>


        {/* ========================================
            TRAJECTORY
        ======================================== */}

        <section className="trajectory-panel">

          <span>
            DEPARTURE TRAJECTORY
          </span>

          <strong>
            EARTH → OUTER SOLAR SYSTEM
          </strong>

          <p>
            Initial trajectory established toward
            the outer Solar System.
          </p>

        </section>


        {/* ========================================
            CONTINUE
        ======================================== */}

        <button
          className="start-button"
          onClick={onComplete}
        >
          BEGIN FLIGHT
        </button>

      </section>

    </main>
  );
}

export default LaunchSequence;