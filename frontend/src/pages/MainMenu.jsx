function MainMenu({ onStart }) {
  return (
    <main className="main-menu">
      <div className="stars"></div>

      <section className="menu-content">
        <p className="subtitle">
          A JOURNEY BEYOND THE KNOWN
        </p>

        <h1>BEYOND TIME</h1>

        <p className="description">
          The universe is only the beginning.
        </p>

        <button
          className="start-button"
          onClick={onStart}
        >
          START MISSION
        </button>
      </section>
    </main>
  );
}

export default MainMenu;