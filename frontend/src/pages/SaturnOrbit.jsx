function SaturnOrbit({ onContinue }) {
  return (
    <main className="saturn-orbit">
      <div className="orbit-background"></div>
      <div className="orbit-stars"></div>

      <header className="orbit-header">
        <div className="orbit-brand">BEYOND TIME</div>
        <div className="orbit-mission">MISSION 01</div>
      </header>

      <section className="orbit-scene">
        <div className="orbit-saturn-planet">
          <div className="orbit-ring ring-back"></div>

          <div className="orbit-saturn-body">
            <div className="saturn-band band-one"></div>
            <div className="saturn-band band-two"></div>
            <div className="saturn-band band-three"></div>
          </div>

          <div className="orbit-ring ring-front"></div>
        </div>

        <div className="orbit-spacecraft">
          <div className="orbit-ship"></div>
          <span>SPACECRAFT</span>
        </div>

        <div className="orbit-distance">
          <span>ORBITAL DISTANCE</span>
          <strong>1.4 × 10⁵ km</strong>
        </div>
      </section>

      <section className="orbit-info">
        <p className="orbit-label">CURRENT LOCATION</p>

        <h1>SATURN ORBIT</h1>

        <div className="orbit-line"></div>

        <p className="orbit-description">
          The spacecraft has entered Saturn's
          gravitational environment and established
          a stable observation trajectory.
        </p>

        <section className="orbit-status">
          <div>
            <span>PLANET</span>
            <strong>SATURN</strong>
          </div>

          <div>
            <span>ORBIT STATUS</span>
            <strong>STABLE</strong>
          </div>

          <div>
            <span>SIGNAL</span>
            <strong>UNSTABLE</strong>
          </div>
        </section>

        <section className="anomaly-warning">
          <span>⚠ ANOMALY DETECTED</span>

          <p>
            Long-range instruments are detecting an
            unexplained gravitational disturbance
            beyond the outer planetary region.
          </p>
        </section>

        <button
          className="start-button"
          onClick={onContinue}
        >
          INVESTIGATE ANOMALY
        </button>
      </section>
    </main>
  );
}

export default SaturnOrbit;