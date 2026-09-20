function SaturnApproach({ onContinue }) {
  return (
    <main className="saturn-approach">
      <div className="saturn-background"></div>
      <div className="saturn-stars"></div>

      <header className="saturn-header">
        <div className="saturn-brand">BEYOND TIME</div>
        <div className="saturn-mission">MISSION 01</div>
      </header>

      <section className="saturn-scene">
        <div className="saturn-planet">
          <div className="saturn-ring ring-one"></div>
          <div className="saturn-ring ring-two"></div>
          <div className="saturn-body"></div>
        </div>

        <div className="saturn-label">
          <span>SATURN</span>
          <small>PLANETARY APPROACH</small>
        </div>

        <div className="spacecraft-indicator">
          <div className="indicator-line"></div>
          <span>SPACECRAFT</span>
        </div>
      </section>

      <section className="saturn-info">
        <p className="saturn-label-text">
          CURRENT LOCATION
        </p>

        <h1>SATURN APPROACH</h1>

        <div className="saturn-line"></div>

        <p className="saturn-description">
          The spacecraft is approaching Saturn's orbital
          region. Long-range instruments have detected an
          unusual gravitational disturbance ahead.
        </p>

        <div className="saturn-status">
          <div>
            <span>DESTINATION</span>
            <strong>SATURN</strong>
          </div>

          <div>
            <span>MISSION PHASE</span>
            <strong>PLANETARY APPROACH</strong>
          </div>

          <div>
            <span>ANOMALY STATUS</span>
            <strong>DETECTED</strong>
          </div>
        </div>

        <button
          className="start-button"
          onClick={onContinue}
        >
          APPROACH SATURN
        </button>
      </section>
    </main>
  );
}

export default SaturnApproach;