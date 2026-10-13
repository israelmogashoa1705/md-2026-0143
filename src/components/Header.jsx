export default function Header({onHome}) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" type="button" onClick={onHome} aria-label="Community Healthcare Clinic home">
            <span className="brand-mark" aria-hidden="true">+</span>
            <span>
              <strong>Community Healthcare Clinic</strong>
              <small>Care that starts with you</small>
            </span>
          </button>
        </div>
      </header>
    </>
  );
}