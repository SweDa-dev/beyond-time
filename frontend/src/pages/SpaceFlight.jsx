import { useEffect, useState } from "react";

function SpaceFlight({ onAnomalyDetected }) {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
  });

  const [fuel, setFuel] = useState(92);

  useEffect(() => {
    const keys = new Set();

    const handleKeyDown = (event) => {
      keys.add(event.key.toLowerCase());
    };

    const handleKeyUp = (event) => {
      keys.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let animationFrame;

    const updateFlight = () => {
      setVelocity((currentVelocity) => {
        let nextX = currentVelocity.x;
        let nextY = currentVelocity.y;

        if (keys.has("w") || keys.has("arrowup")) {
          nextY -= 0.08;
        }

        if (keys.has("s") || keys.has("arrowdown")) {
          nextY += 0.08;
        }

        if (keys.has("a") || keys.has("arrowleft")) {
          nextX -= 0.08;
        }

        if (keys.has("d") || keys.has("arrowright")) {
          nextX += 0.08;
        }

        nextX = Math.max(-1.5, Math.min(1.5, nextX));
        nextY = Math.max(-1.5, Math.min(1.5, nextY));

        return {
          x: nextX * 0.98,
          y: nextY * 0.98,
        };
      });

      setPosition((currentPosition) => ({
        x: Math.max(
          8,
          Math.min(92, currentPosition.x + velocity.x)
        ),
        y: Math.max(
          8,
          Math.min(92, currentPosition.y + velocity.y)
        ),
      }));

      animationFrame = requestAnimationFrame(updateFlight);
    };

    animationFrame = requestAnimationFrame(updateFlight);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [velocity.x, velocity.y]);

  useEffect(() => {
    const fuelTimer = setInterval(() => {
      setFuel((currentFuel) =>
        Math.max(0, currentFuel - 0.01)
      );
    }, 1000);

    return () => clearInterval(fuelTimer);
  }, []);

  return (
    <main className="space-flight">
      <div className="flight-space"></div>
      <div className="flight-stars"></div>

      <header className="flight-header">
        <div className="flight-brand">
          BEYOND TIME
        </div>

        <div className="flight-location">
          SATURN REGION
        </div>
      </header>

      <section className="flight-hud">
        <div>
          <span>FUEL</span>
          <strong>{fuel.toFixed(0)}%</strong>
        </div>

        <div>
          <span>VELOCITY X</span>
          <strong>{velocity.x.toFixed(2)}</strong>
        </div>

        <div>
          <span>VELOCITY Y</span>
          <strong>{velocity.y.toFixed(2)}</strong>
        </div>
      </section>

      <section className="flight-area">

        <div
          className="spacecraft-player"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        >
          <div className="player-ship"></div>
          <span>YOU</span>
        </div>

        <div className="anomaly-signal">
          <div className="signal-pulse"></div>
          <span>UNKNOWN SIGNAL</span>
        </div>

      </section>

      <section className="flight-controls">
        <p>SPACECRAFT CONTROL</p>

        <div className="control-row">
          <span>W / ↑</span>
          <span>THRUST</span>
        </div>

        <div className="control-row">
          <span>A / D</span>
          <span>STEER</span>
        </div>

        <div className="control-row">
          <span>S / ↓</span>
          <span>BRAKE</span>
        </div>
      </section>

      <button
        className="scan-button"
        onClick={onAnomalyDetected}
      >
        SCAN SIGNAL
      </button>
    </main>
  );
}

export default SpaceFlight;