function MissionBriefing({ onAcceptMission }) {
  return (
    <main className="mission-briefing">

      <div className="briefing-overlay"></div>

      <div className="briefing-content">

        <p className="briefing-label">
          MISSION 01
        </p>

        <h1>MISSION BRIEFING</h1>

        <div className="briefing-line"></div>

        <p className="briefing-text">
          An unexplained gravitational anomaly has been
          detected beyond the orbit of Saturn.
        </p>

        <p className="briefing-text">
          Preliminary observations indicate that the
          signal does not match any known natural source.
        </p>


        <section className="briefing-section">

          <h2>OBJECTIVE</h2>

          <p>
            Investigate the source of the gravitational
            signal and determine its origin.
          </p>

        </section>


        <section className="briefing-details">

          <div className="briefing-detail">

            <span>LOCATION</span>

            <strong>
              EARTH → OUTER SOLAR SYSTEM
            </strong>

          </div>


          <div className="briefing-detail">

            <span>MISSION TYPE</span>

            <strong>
              DEEP SPACE INVESTIGATION
            </strong>

          </div>


          <div className="briefing-detail">

            <span>THREAT LEVEL</span>

            <strong>
              UNKNOWN
            </strong>

          </div>

        </section>


        <button
          className="start-button"
          onClick={onAcceptMission}
        >
          ACCEPT MISSION
        </button>

      </div>

    </main>
  );
}

export default MissionBriefing;