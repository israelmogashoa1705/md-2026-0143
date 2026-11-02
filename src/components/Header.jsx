export default function Header({ onHome }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" type="button" onClick={onHome}>
            <span className="brand-mark" aria-hidden="true">
              +
            </span>
            <span>
              <strong>Community Healthcare Clinic</strong>
              <small>Accessible appointment booking</small>
            </span>
          </button>
          <p className="header-note">Prototype for demonstration only</p>
        </div>
      </header>
    </>
  );
}