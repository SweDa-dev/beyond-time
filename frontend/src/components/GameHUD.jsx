function GameHUD({
  type = "full",
  mission = "MISSION 01",
  location = "EARTH",
  oxygen = 98,
  fuel = 92,
  energy = 100,
  distance = "1.2 AU",
}) {

  /* ========================================
     TOP HUD
  ======================================== */

  if (type === "top") {
    return (
      <header className="hud-top">
        <span>{mission}</span>
        <span>{location}</span>
      </header>
    );
  }


  /* ========================================
     BOTTOM HUD
  ======================================== */

  if (type === "bottom") {
    return (
      <footer className="hud-bottom">

        {/* Oxygen */}
        <div className="hud-stat">

          <span className="hud-label">
            O₂
          </span>

          <div className="hud-bar">
            <div
              className="hud-fill"
              style={{
                width: `${oxygen}%`,
              }}
            />
          </div>

          <span>
            {oxygen}%
          </span>

        </div>


        {/* Fuel */}
        <div className="hud-stat">

          <span className="hud-label">
            FUEL
          </span>

          <div className="hud-bar">
            <div
              className="hud-fill"
              style={{
                width: `${fuel}%`,
              }}
            />
          </div>

          <span>
            {fuel}%
          </span>

        </div>


        {/* Energy */}
        <div className="hud-stat">

          <span className="hud-label">
            ENERGY
          </span>

          <div className="hud-bar">
            <div
              className="hud-fill"
              style={{
                width: `${energy}%`,
              }}
            />
          </div>

          <span>
            {energy}%
          </span>

        </div>


        {/* Distance */}
        <div className="hud-distance">

          <span className="hud-label">
            DISTANCE
          </span>

          <strong>
            {distance}
          </strong>

        </div>

      </footer>
    );
  }


  return null;
}

export default GameHUD;