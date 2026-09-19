function EarthMission({ onBeginMission }) {
  return (
    <main className="earth-mission">
      <div className="earth-overlay"></div>

      <section className="mission-content">
        <p className="mission-number">MISSION 01</p>

        <h1>EARTH</h1>

        <div className="earth-line"></div>

        <p className="mission-description">
          An unexplained gravitational signal has been detected
          beyond the outer Solar System.
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
      </section>
    </main>
  );
}

export default EarthMission;
