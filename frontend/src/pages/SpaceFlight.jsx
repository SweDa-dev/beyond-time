import { useEffect, useRef, useState } from "react";

function SpaceFlight({
  anomalyDetected,
  onAnomalyDetected,
}) {
  const [position, setPosition] = useState({
    x: 25,
    y: 50,
  });

  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [distance, setDistance] = useState(100);
  const [signalStrength, setSignalStrength] = useState(0);
  const [canScan, setCanScan] = useState(false);

  const [investigationMode, setInvestigationMode] =
    useState(false);

  const [investigationProgress, setInvestigationProgress] =
    useState(0);

  const keysRef = useRef(new Set());

  const anomaly = {
    x: 78,
    y: 50,
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysRef.current.add(event.key.toLowerCase());
    };

    const handleKeyUp = (event) => {
      keysRef.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, []);

  useEffect(() => {
    let animationFrame;

    const updateFlight = () => {
      setPosition((currentPosition) => {
        let x = currentPosition.x;
        let y = currentPosition.y;

        let velocityX = velocity.x;
        let velocityY = velocity.y;

        const keys = keysRef.current;

        const movementSpeed = 0.055;

        /*
         * BASIC SPACECRAFT MOVEMENT
         */

        if (
          keys.has("arrowup") ||
          keys.has("w")
        ) {
          velocityY -= movementSpeed;
        }

        if (
          keys.has("arrowdown") ||
          keys.has("s")
        ) {
          velocityY += movementSpeed;
        }

        if (
          keys.has("arrowleft") ||
          keys.has("a")
        ) {
          velocityX -= movementSpeed;
        }

        if (
          keys.has("arrowright") ||
          keys.has("d")
        ) {
          velocityX += movementSpeed;
        }

        /*
         * ROTATION
         *
         * Hold two directions together.
         */

        const rotateLeft =
          (keys.has("arrowup") &&
            keys.has("arrowleft")) ||
          (keys.has("arrowdown") &&
            keys.has("arrowleft"));

        const rotateRight =
          (keys.has("arrowup") &&
            keys.has("arrowright")) ||
          (keys.has("arrowdown") &&
            keys.has("arrowright"));

        if (rotateLeft) {
          setRotation(
            (currentRotation) =>
              currentRotation - 2
          );
        }

        if (rotateRight) {
          setRotation(
            (currentRotation) =>
              currentRotation + 2
          );
        }

        /*
         * FICTIONAL GRAVITATIONAL DISTURBANCE
         *
         * This represents the game's anomaly effect.
         */

        if (anomalyDetected) {
          const deltaX = anomaly.x - x;
          const deltaY = anomaly.y - y;

          const anomalyDistance = Math.sqrt(
            deltaX * deltaX +
              deltaY * deltaY
          );

          if (anomalyDistance < 30) {
            const gravitationalEffect =
              (30 - anomalyDistance) *
              0.0008;

            velocityX +=
              deltaX * gravitationalEffect;

            velocityY +=
              deltaY * gravitationalEffect;

            setRotation(
              (currentRotation) =>
                currentRotation +
                Math.sin(Date.now() / 250) *
                  0.15
            );
          }
        }

        /*
         * APPLY VELOCITY
         */

        x += velocityX;
        y += velocityY;

        /*
         * KEEP SPACECRAFT INSIDE FLIGHT AREA
         */

        x = Math.max(
          5,
          Math.min(95, x)
        );

        y = Math.max(
          10,
          Math.min(90, y)
        );

        setVelocity({
          x: velocityX * 0.985,
          y: velocityY * 0.985,
        });

        /*
         * DISTANCE TO ANOMALY
         */

        const dx = anomaly.x - x;
        const dy = anomaly.y - y;

        const currentDistance = Math.sqrt(
          dx * dx + dy * dy
        );

        setDistance(
          Math.max(
            0,
            Math.round(
              currentDistance
            )
          )
        );

        /*
         * SIGNAL STRENGTH
         */

        const signal =
          Math.max(
            0,
            Math.min(
              100,
              Math.round(
                100 -
                  currentDistance * 2
              )
            )
          );

        setSignalStrength(signal);

        /*
         * ENABLE SCAN WHEN CLOSE ENOUGH
         */

        if (currentDistance < 25) {
          setCanScan(true);
        } else {
          setCanScan(false);
        }

        return {
          x,
          y,
        };
      });

      animationFrame =
        requestAnimationFrame(
          updateFlight
        );
    };

    animationFrame =
      requestAnimationFrame(
        updateFlight
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [anomalyDetected, velocity]);

  const handleScan = () => {
    if (!canScan) {
      return;
    }

    console.log(
      "⚠ ANOMALY SCAN STARTED"
    );

    setInvestigationMode(true);

    let progress = 0;

    const scanInterval =
      setInterval(() => {
        progress += 10;

        setInvestigationProgress(
          progress
        );

        if (progress >= 100) {
          clearInterval(
            scanInterval
          );

          console.log(
            "✓ GRAVITATIONAL ANALYSIS COMPLETE"
          );

          onAnomalyDetected();
        }
      }, 400);
  };

  const addKey = (key) => {
    keysRef.current.add(key);
  };

  const removeKey = (key) => {
    keysRef.current.delete(key);
  };

  return (
    <main
      className={`space-flight ${
        anomalyDetected
          ? "gravity-disturbance"
          : ""
      }`}
    >
      <header className="flight-header">
        <div>
          <span className="eyebrow">
            BEYOND TIME
          </span>

          <h1>
            DEEP SPACE FLIGHT
          </h1>
        </div>

        <div className="mission-status">
          <span>
            MISSION STATUS
          </span>

          <strong>
            {anomalyDetected
              ? "ANOMALY ACTIVE"
              : "EXPLORATION"}
          </strong>
        </div>
      </header>

      {anomalyDetected && (
        <div className="gravity-warning">
          <span>
            GRAVITATIONAL DISTURBANCE
          </span>

          <strong>
            UNSTABLE LOCAL SPACE-TIME
          </strong>
        </div>
      )}

      <section className="flight-hud">
        <div>
          <span>
            FUEL
          </span>

          <strong>
            {Math.round(fuel)}%
          </strong>
        </div>

        <div>
          <span>
            DISTANCE
          </span>

          <strong>
            {distance}
          </strong>
        </div>

        <div>
          <span>
            SIGNAL
          </span>

          <strong>
            {signalStrength}%
          </strong>
        </div>

        <div>
          <span>
            VELOCITY
          </span>

          <strong>
            {Math.abs(
              velocity.x
            ).toFixed(2)}
          </strong>
        </div>
      </section>

      <section className="flight-area">

        <div
          className={`anomaly ${
            anomalyDetected
              ? "anomaly-active"
              : ""
          }`}
          style={{
            left: `${anomaly.x}%`,
            top: `${anomaly.y}%`,
          }}
        >
          <div className="signal-pulse"></div>

          <span>
            UNKNOWN GRAVITATIONAL SOURCE
          </span>
        </div>

        <div
          className="spacecraft-player"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `
              translate(-50%, -50%)
              rotate(${rotation}deg)
            `,
          }}
        >
          <div className="realistic-spacecraft">

            <div className="spacecraft-nose">
              <div className="docking-port"></div>

              <div className="sensor-window"></div>
            </div>

            <div className="crew-module">

              <div className="crew-window window-one"></div>

              <div className="crew-window window-two"></div>

              <div className="crew-window window-three"></div>

            </div>

            <div className="service-module">

              <div className="service-band"></div>

              <div className="equipment-box"></div>

            </div>

            <div className="spacecraft-radiator">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="solar-array solar-left">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="solar-array solar-right">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="engine-module">

              <div className="engine-one"></div>

              <div className="engine-two"></div>

            </div>

            <div className="rcs-thruster thruster-top"></div>

            <div className="rcs-thruster thruster-bottom"></div>

          </div>
        </div>

      </section>

      <section className="flight-controls">

        <p>
          SPACECRAFT CONTROL
        </p>

        <div className="spacecraft-control-pad">

          <button
            type="button"
            className="control-button control-up"
            onMouseDown={() =>
              addKey("arrowup")
            }
            onMouseUp={() =>
              removeKey("arrowup")
            }
            onMouseLeave={() =>
              removeKey("arrowup")
            }
            onTouchStart={() =>
              addKey("arrowup")
            }
            onTouchEnd={() =>
              removeKey("arrowup")
            }
          >
            ↑
          </button>

          <button
            type="button"
            className="control-button control-left"
            onMouseDown={() =>
              addKey("arrowleft")
            }
            onMouseUp={() =>
              removeKey("arrowleft")
            }
            onMouseLeave={() =>
              removeKey("arrowleft")
            }
            onTouchStart={() =>
              addKey("arrowleft")
            }
            onTouchEnd={() =>
              removeKey("arrowleft")
            }
          >
            ←
          </button>

          <button
            type="button"
            className="control-button control-right"
            onMouseDown={() =>
              addKey("arrowright")
            }
            onMouseUp={() =>
              removeKey("arrowright")
            }
            onMouseLeave={() =>
              removeKey("arrowright")
            }
            onTouchStart={() =>
              addKey("arrowright")
            }
            onTouchEnd={() =>
              removeKey("arrowright")
            }
          >
            →
          </button>

          <button
            type="button"
            className="control-button control-down"
            onMouseDown={() =>
              addKey("arrowdown")
            }
            onMouseUp={() =>
              removeKey("arrowdown")
            }
            onMouseLeave={() =>
              removeKey("arrowdown")
            }
            onTouchStart={() =>
              addKey("arrowdown")
            }
            onTouchEnd={() =>
              removeKey("arrowdown")
            }
          >
            ↓
          </button>

        </div>

        <div className="rotation-help">
          <span>
            ROTATION
          </span>

          <small>
            Press ← + ↑ or → + ↑ together
          </small>
        </div>

      </section>

      <section className="signal-status">

        <span>
          DEEP SPACE INSTRUMENTATION
        </span>

        <strong>
          SIGNAL STRENGTH: {signalStrength}%
        </strong>

      </section>

      {investigationMode &&
        !anomalyDetected && (
          <section className="investigation-panel">

            <span>
              SCIENTIFIC INSTRUMENT ANALYSIS
            </span>

            <h2>
              GRAVITATIONAL FIELD SCAN
            </h2>

            <p>
              The spacecraft is measuring
              unusual gravitational behavior.
            </p>

            <div className="analysis-reading">

              <div>
                <span>
                  GRAVITY FIELD
                </span>

                <strong>
                  ANOMALOUS
                </strong>
              </div>

              <div>
                <span>
                  SIGNAL COHERENCE
                </span>

                <strong>
                  {Math.max(
                    0,
                    signalStrength - 8
                  )}%
                </strong>
              </div>

              <div>
                <span>
                  SPATIAL DRIFT
                </span>

                <strong>
                  DETECTED
                </strong>
              </div>

            </div>

            <div className="analysis-progress">

              <div
                style={{
                  width: `${investigationProgress}%`,
                }}
              ></div>

            </div>

            <small>
              ANALYSIS PROGRESS{" "}
              {investigationProgress}%
            </small>

          </section>
        )}

      {anomalyDetected && (
        <section className="anomaly-detected-panel">

          <span>
            INSTRUMENT ANALYSIS COMPLETE
          </span>

          <h2>
            GRAVITATIONAL DISTURBANCE CONFIRMED
          </h2>

          <p>
            The spacecraft has detected a
            persistent gravitational anomaly.
          </p>

        </section>
      )}

      {!investigationMode &&
        !anomalyDetected && (
          <button
            type="button"
            className="scan-button"
            disabled={!canScan}
            onClick={handleScan}
          >
            {canScan
              ? "SCAN SIGNAL"
              : "APPROACH ANOMALY"}
          </button>
        )}

    </main>
  );
}

export default SpaceFlight;