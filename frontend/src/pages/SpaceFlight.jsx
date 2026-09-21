import { useEffect, useRef, useState } from "react";

function SpaceFlight({
  onAnomalyDetected,
  anomalyDetected,
}) {
  const keysRef = useRef(new Set());

  const positionRef = useRef({
    x: 50,
    y: 50,
  });

  const velocityRef = useRef({
    x: 0,
    y: 0,
  });

  const rotationRef = useRef(0);

  const animationFrameRef = useRef(null);

  const [investigationMode, setInvestigationMode] =
  useState(false);

const [investigationProgress, setInvestigationProgress] =
  useState(0);

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState(0);

  const [fuel, setFuel] = useState(92);

  const [distance, setDistance] = useState(5000);

  const [signalStrength, setSignalStrength] = useState(0);

  const [canScan, setCanScan] = useState(false);

  const anomaly = {
    x: 78,
    y: 50,
  };

  /*
   * KEYBOARD INPUT
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
   * FLIGHT PHYSICS
   */
  useEffect(() => {
    const updateFlight = () => {
      const keys = keysRef.current;

      let { x, y } =
        positionRef.current;

      let {
        x: velocityX,
        y: velocityY,
      } = velocityRef.current;

      let rotation =
        rotationRef.current;

      /*
 * ROTATION
 *
 * ↑ + ← = rotate left
 * ↑ + → = rotate right
 * ↓ + ← = rotate left
 * ↓ + → = rotate right
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
  rotation -= 2;
}

if (rotateRight) {
  rotation += 2;
}

      /*
       * Convert degrees to radians
       */
      const radians =
        (rotation * Math.PI) / 180;

      /*
 * SIMPLE SPACECRAFT MOVEMENT
 *
 * ↑ = up
 * ↓ = down
 * ← = left
 * → = right
 */
const movementSpeed = 0.055;

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
       * Natural drift resistance
       */
      velocityX *= 0.995;
      velocityY *= 0.995;

      /*
       * Maximum velocity
       */
      const maxVelocity = 1.8;

      velocityX = Math.max(
        -maxVelocity,
        Math.min(
          maxVelocity,
          velocityX
        )
      );

      velocityY = Math.max(
        -maxVelocity,
        Math.min(
          maxVelocity,
          velocityY
        )
      );

      /*
       * GRAVITATIONAL DISTURBANCE
       *
       * Once the anomaly has been scanned,
       * its fictional gravitational field
       * begins affecting the spacecraft.
       */
      if (anomalyDetected) {
        const deltaX =
          anomaly.x - x;

        const deltaY =
          anomaly.y - y;

        const anomalyDistance =
          Math.sqrt(
            deltaX * deltaX +
              deltaY * deltaY
          );

        /*
         * Stronger effect when closer.
         */
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

          /*
           * Slight rotational disturbance.
           */
          rotation +=
            Math.sin(
              Date.now() / 250
            ) * 0.15;
        }
      }

      /*
       * UPDATE POSITION
       */
      x += velocityX;
      y += velocityY;

      /*
       * Keep spacecraft inside area
       */
      x = Math.max(
        5,
        Math.min(95, x)
      );

      y = Math.max(
        8,
        Math.min(92, y)
      );

      /*
       * Save physics state
       */
      positionRef.current = {
        x,
        y,
      };

      velocityRef.current = {
        x: velocityX,
        y: velocityY,
      };

      rotationRef.current =
        rotation;

      /*
       * DISTANCE TO ANOMALY
       */
      const deltaX =
        anomaly.x - x;

      const deltaY =
        anomaly.y - y;

      const normalizedDistance =
        Math.sqrt(
          deltaX * deltaX +
            deltaY * deltaY
        );

      /*
       * Gameplay distance.
       *
       * This is NOT a real astronomical
       * distance. It is an in-game scale.
       */
      const calculatedDistance =
        Math.max(
          100,
          Math.round(
            normalizedDistance * 220
          )
        );

      /*
       * SIGNAL STRENGTH
       */
      const calculatedSignal =
        Math.max(
          0,
          Math.min(
            100,
            Math.round(
              100 -
                normalizedDistance * 4
            )
          )
        );

      /*
       * SCAN RANGE
       */
      const scanAvailable =
        normalizedDistance <= 18;

      /*
       * UPDATE UI
       */
      setPosition({
        x,
        y,
      });

      setVelocity({
        x: velocityX,
        y: velocityY,
      });

      setRotation(rotation);

      setDistance(
        calculatedDistance
      );

      setSignalStrength(
        calculatedSignal
      );

      setCanScan(
        scanAvailable
      );

      /*
       * FUEL
       */
      if (
        (keys.has("w") ||
          keys.has("arrowup")) &&
        fuel > 0
      ) {
        setFuel(
          (currentFuel) =>
            Math.max(
              0,
              currentFuel - 0.015
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
      cancelAnimationFrame(
        animationFrameRef.current
      );
    };
  }, [fuel, anomalyDetected]);

  /*
   * SCAN
   */
  const handleScan = () => {
  if (!canScan) {
    return;
  }

  console.log("⚠ ANOMALY SCAN STARTED");

  setInvestigationMode(true);

  let progress = 0;

  const scanInterval = setInterval(() => {
    progress += 10;

    setInvestigationProgress(progress);

    if (progress >= 100) {
      clearInterval(scanInterval);

      console.log(
        "✓ GRAVITATIONAL ANALYSIS COMPLETE"
      );

      onAnomalyDetected();
    }
  }, 400);
};

  return (
    <main
      className={`space-flight ${
        anomalyDetected
          ? "gravity-disturbance"
          : ""
      }`}
    >
      <div className="flight-space"></div>

      <div className="flight-stars"></div>

      {/* HEADER */}
      <header className="flight-header">
        <div className="flight-brand">
          BEYOND TIME
        </div>

        <div className="flight-location">
          SATURN REGION
        </div>
      </header>

      {/* HUD */}
      <section className="flight-hud">

        <div>
          <span>FUEL</span>

          <strong>
            {fuel.toFixed(0)}%
          </strong>
        </div>

        <div>
          <span>VELOCITY</span>

          <strong>
            {Math.sqrt(
              velocity.x ** 2 +
                velocity.y ** 2
            ).toFixed(2)}
          </strong>
        </div>

        <div>
          <span>DISTANCE</span>

          <strong>
            {distance.toLocaleString()} km
          </strong>
        </div>

        <div>
          <span>SIGNAL</span>

          <strong>
            {signalStrength}%
          </strong>
        </div>

      </section>

      {/* DISTURBANCE WARNING */}
      {investigationMode && !anomalyDetected ? (
  <section className="investigation-panel">

    <span>
      SCIENTIFIC INSTRUMENT ANALYSIS
    </span>

    <h2>
      ANALYZING DISTURBANCE
    </h2>

    <p>
      Spacecraft instruments are measuring
      variations in the local gravitational field.
    </p>

    <div className="analysis-reading">
      <div>
        <span>GRAVITY FIELD</span>
        <strong>
          {investigationProgress}%
        </strong>
      </div>

      <div>
        <span>SIGNAL COHERENCE</span>
        <strong>
          {Math.min(
            100,
            investigationProgress + 12
          )}%
        </strong>
      </div>

      <div>
        <span>SPATIAL DRIFT</span>
        <strong>
          {(
            investigationProgress * 0.017
          ).toFixed(3)}
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
      DO NOT ALTER TRAJECTORY DURING ANALYSIS
    </small>

  </section>
) : anomalyDetected ? (
  <section className="anomaly-detected-panel">

    <span>
      ✓ ANALYSIS COMPLETE
    </span>

    <h2>
      GRAVITATIONAL DISTURBANCE
    </h2>

    <p>
      The spacecraft has detected a localized
      distortion in the surrounding gravitational
      environment.
    </p>

    <div className="anomaly-data">

      <div>
        <span>SIGNAL</span>
        <strong>CONFIRMED</strong>
      </div>

      <div>
        <span>SOURCE</span>
        <strong>UNKNOWN</strong>
      </div>

      <div>
        <span>MEASUREMENT</span>
        <strong>ANOMALOUS</strong>
      </div>

    </div>

  </section>
) : (
  <button
    className={`scan-button ${
      canScan ? "scan-ready" : ""
    }`}
    onClick={handleScan}
    disabled={!canScan}
  >
    {canScan
      ? "SCAN SIGNAL"
      : "SIGNAL TOO FAR"}
  </button>
)}

      {/* FLIGHT AREA */}
      <section className="flight-area">

        {/* SPACECRAFT */}
        <div
          className="spacecraft-player"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform:
              `translate(-50%, -50%) rotate(${rotation}deg)`,
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

          <span>YOU</span>
        </div>

        {/* ANOMALY */}
        <div
          className={`anomaly-signal ${
            canScan
              ? "anomaly-close"
              : ""
          } ${
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
            {anomalyDetected
              ? "GRAVITATIONAL DISTURBANCE"
              : "UNKNOWN SIGNAL"}
          </span>
        </div>

      </section>

      {/* CONTROLS */}
      <section className="flight-controls">

  <p>SPACECRAFT CONTROL</p>

  <div className="spacecraft-control-pad">

    <button
      type="button"
      className="control-button control-up"
      onMouseDown={() =>
        keysRef.current.add("arrowup")
      }
      onMouseUp={() =>
        keysRef.current.delete("arrowup")
      }
      onMouseLeave={() =>
        keysRef.current.delete("arrowup")
      }
      onTouchStart={() =>
        keysRef.current.add("arrowup")
      }
      onTouchEnd={() =>
        keysRef.current.delete("arrowup")
      }
    >
      ↑
    </button>

    <button
      type="button"
      className="control-button control-left"
      onMouseDown={() =>
        keysRef.current.add("arrowleft")
      }
      onMouseUp={() =>
        keysRef.current.delete("arrowleft")
      }
      onMouseLeave={() =>
        keysRef.current.delete("arrowleft")
      }
      onTouchStart={() =>
        keysRef.current.add("arrowleft")
      }
      onTouchEnd={() =>
        keysRef.current.delete("arrowleft")
      }
    >
      ←
    </button>

    <button
      type="button"
      className="control-button control-right"
      onMouseDown={() =>
        keysRef.current.add("arrowright")
      }
      onMouseUp={() =>
        keysRef.current.delete("arrowright")
      }
      onMouseLeave={() =>
        keysRef.current.delete("arrowright")
      }
      onTouchStart={() =>
        keysRef.current.add("arrowright")
      }
      onTouchEnd={() =>
        keysRef.current.delete("arrowright")
      }
    >
      →
    </button>

    <button
      type="button"
      className="control-button control-down"
      onMouseDown={() =>
        keysRef.current.add("arrowdown")
      }
      onMouseUp={() =>
        keysRef.current.delete("arrowdown")
      }
      onMouseLeave={() =>
        keysRef.current.delete("arrowdown")
      }
      onTouchStart={() =>
        keysRef.current.add("arrowdown")
      }
      onTouchEnd={() =>
        keysRef.current.delete("arrowdown")
      }
    >
      ↓
    </button>

  </div>

  <div className="rotation-help">
    <span>ROTATION</span>
    <small>
      Press ← + ↑ or → + ↑ together
    </small>
  </div>

</section>

      {/* SIGNAL STATUS */}
      <section className="signal-status">

        <div>
          <span>
            DISTANCE TO SIGNAL
          </span>

          <strong>
            {distance.toLocaleString()} km
          </strong>
        </div>

        <div>
          <span>
            SIGNAL STRENGTH
          </span>

          <div className="signal-meter">
            <div
              className="signal-meter-fill"
              style={{
                width: `${signalStrength}%`,
              }}
            ></div>
          </div>
        </div>

      </section>

      {/* SCAN / DETECTED STATE */}
      {anomalyDetected ? (
        <section className="anomaly-detected-panel">

          <span>
            ⚠ ANOMALY DETECTED
          </span>

          <h2>
            GRAVITATIONAL DISTURBANCE
          </h2>

          <p>
            The spacecraft has successfully
            analyzed the unknown signal.
          </p>

          <div className="anomaly-data">

            <div>
              <span>SIGNAL</span>
              <strong>
                CONFIRMED
              </strong>
            </div>

            <div>
              <span>SOURCE</span>
              <strong>
                UNKNOWN
              </strong>
            </div>

            <div>
              <span>TYPE</span>
              <strong>
                GRAVITATIONAL
              </strong>
            </div>

          </div>

        </section>
      ) : (
        <button
          className={`scan-button ${
            canScan
              ? "scan-ready"
              : ""
          }`}
          onClick={handleScan}
          disabled={!canScan}
        >
          {canScan
            ? "SCAN SIGNAL"
            : "SIGNAL TOO FAR"}
        </button>
      )}

    </main>
  );
}

export default SpaceFlight;