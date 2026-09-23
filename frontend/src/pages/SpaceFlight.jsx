import { useEffect, useRef, useState } from "react";

function SpaceFlight({
  anomalyDetected,
  onAnomalyDetected,
}) {
  const [position, setPosition] = useState({
    x: 25,
    y: 50,
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

  /*
   * GAME STATE
   *
   * Refs are used here so the animation loop
   * does not restart every time velocity changes.
   */

  const positionRef = useRef({
    x: 25,
    y: 50,
  });

  const velocityRef = useRef({
    x: 0,
    y: 0,
  });

  const rotationRef = useRef(0);

  const keysRef = useRef(new Set());

  const trajectoryRef = useRef([]);

  const animationFrameRef = useRef(null);

  const anomaly = {
    x: 78,
    y: 50,
  };

  /*
   * KEYBOARD CONTROLS
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysRef.current.add(
        event.key.toLowerCase()
      );
    };

    const handleKeyUp = (event) => {
      keysRef.current.delete(
        event.key.toLowerCase()
      );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

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

  /*
   * SPACECRAFT PHYSICS LOOP
   */

  useEffect(() => {
    const updateFlight = () => {
      const keys = keysRef.current;

      const position = positionRef.current;

      const velocity = velocityRef.current;

      let x = position.x;

      let y = position.y;

      let velocityX = velocity.x;

      let velocityY = velocity.y;

      const movementSpeed = 0.055;

      /*
       * FORWARD / BACKWARD
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

      /*
       * LEFT / RIGHT
       */

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
        rotationRef.current -= 1.5;
      }

      if (rotateRight) {
        rotationRef.current += 1.5;
      }

      /*
       * GRAVITATIONAL FIELD
       *
       * This is a fictional gameplay mechanic.
       *
       * It represents the effect of the
       * unexplained anomaly in the game.
       */

      if (anomalyDetected) {
        const deltaX = anomaly.x - x;

        const deltaY = anomaly.y - y;

        const anomalyDistance =
          Math.sqrt(
            deltaX * deltaX +
              deltaY * deltaY
          );

        if (anomalyDistance < 30) {
          const gravitationalEffect =
            (30 - anomalyDistance) *
            0.0008;

          velocityX +=
            deltaX *
            gravitationalEffect;

          velocityY +=
            deltaY *
            gravitationalEffect;

          rotationRef.current +=
            Math.sin(
              Date.now() / 250
            ) * 0.15;
        }
      }

      /*
       * VELOCITY DAMPING
       */

      velocityX *= 0.985;
      velocityY *= 0.985;

      /*
       * APPLY VELOCITY
       */

      x += velocityX;

      y += velocityY;

      /*
       * KEEP SHIP INSIDE PLAY AREA
       */

      x = Math.max(
        5,
        Math.min(95, x)
      );

      y = Math.max(
        10,
        Math.min(90, y)
      );

      /*
       * UPDATE REFS
       */

      positionRef.current = {
        x,
        y,
      };

      velocityRef.current = {
        x: velocityX,
        y: velocityY,
      };

      /*
       * UPDATE TRAJECTORY
       */

      const lastPoint =
        trajectoryRef.current[
          trajectoryRef.current.length - 1
        ];

      if (
        !lastPoint ||
        Math.abs(lastPoint.x - x) > 0.15 ||
        Math.abs(lastPoint.y - y) > 0.15
      ) {
        trajectoryRef.current.push({
          x,
          y,
        });

        /*
         * Keep only the most recent
         * 100 trajectory points.
         */

        if (
          trajectoryRef.current.length >
          100
        ) {
          trajectoryRef.current.shift();
        }
      }

      /*
       * CALCULATE DISTANCE
       */

      const deltaX =
        anomaly.x - x;

      const deltaY =
        anomaly.y - y;

      const currentDistance =
        Math.sqrt(
          deltaX * deltaX +
            deltaY * deltaY
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

      /*
       * UPDATE UI STATE
       */

      setPosition({
        x,
        y,
      });

      setRotation(
        rotationRef.current
      );

      setDistance(
        Math.max(
          0,
          Math.round(
            currentDistance
          )
        )
      );

      setSignalStrength(signal);

      /*
       * SCAN RANGE
       */

      setCanScan(
        currentDistance < 25
      );

      /*
       * SMALL FUEL CONSUMPTION
       *
       * Only consume fuel while moving.
       */

      const isMoving =
        Math.abs(velocityX) >
          0.001 ||
        Math.abs(velocityY) >
          0.001;

      if (isMoving) {
        setFuel(
          (currentFuel) =>
            Math.max(
              0,
              currentFuel - 0.002
            )
        );
      }

      animationFrameRef.current =
        requestAnimationFrame(
          updateFlight
        );
    };

    animationFrameRef.current =
      requestAnimationFrame(
        updateFlight
      );

    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [anomalyDetected]);

  /*
   * SCAN ANOMALY
   */

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

  /*
   * MOBILE / MOUSE CONTROLS
   */

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
            {Math.sqrt(
              velocityRef.current.x *
                velocityRef.current.x +
                velocityRef.current.y *
                velocityRef.current.y
            ).toFixed(2)}
          </strong>
        </div>
      </section>

      <section className="flight-area">

        /*
         * TRAJECTORY
         */

        <div className="trajectory-line">
          {trajectoryRef.current.map(
            (point, index) => (
              <span
                key={index}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                }}
              />
            )
          )}
        </div>

        /*
         * ANOMALY
         */

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

        /*
         * SPACECRAFT
         */

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
              />

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