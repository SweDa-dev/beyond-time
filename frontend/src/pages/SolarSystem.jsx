function SolarSystem({ onContinue }) {
  return (
    <main className="solar-system">

      {/* ========================================
          SPACE BACKGROUND
      ======================================== */}

      <div className="solar-background"></div>

      <div className="solar-stars"></div>


      {/* ========================================
          TOP HUD
      ======================================== */}

      <header className="solar-header">

        <div className="solar-brand">
          BEYOND TIME
        </div>

        <div className="solar-mission">
          MISSION 01
        </div>

      </header>


      {/* ========================================
          SOLAR SYSTEM SCENE
      ======================================== */}

      <section className="solar-scene">

        {/* Sun */}

        <div className="sun">
          <span>SUN</span>
        </div>


        {/* Orbits */}

        <div className="orbit orbit-earth">
          <div className="planet earth">
            <span>EARTH</span>
          </div>
        </div>


        <div className="orbit orbit-mars">
          <div className="planet mars">
            <span>MARS</span>
          </div>
        </div>


        <div className="orbit orbit-jupiter">
          <div className="planet jupiter">
            <span>JUPITER</span>
          </div>
        </div>


        <div className="orbit orbit-saturn">
          <div className="planet saturn">
            <span>SATURN</span>
          </div>
        </div>


        {/* Spacecraft */}

        <div className="spacecraft">

          <div className="spacecraft-body"></div>

          <span>
            YOU
          </span>

        </div>

      </section>


      {/* ========================================
          INFORMATION PANEL
      ======================================== */}

      <section className="solar-info">

        <p className="solar-label">
          CURRENT LOCATION
        </p>

        <h1>
          SOLAR SYSTEM
        </h1>

        <p className="solar-description">
          The spacecraft has departed Earth and
          entered heliocentric space.
        </p>


        <div className="solar-status">

          <div>
            <span>DISTANCE FROM EARTH</span>
            <strong>1.2 AU</strong>
          </div>

          <div>
            <span>DESTINATION</span>
            <strong>SATURN</strong>
          </div>

          <div>
            <span>MISSION PHASE</span>
            <strong>OUTBOUND</strong>
          </div>

        </div>


        <button
          className="start-button"
          onClick={onContinue}
        >
          CONTINUE FLIGHT
        </button>

      </section>

    </main>
  );
}

export default SolarSystem;