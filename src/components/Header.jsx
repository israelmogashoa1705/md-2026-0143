function Header() {
  return (
    <>

      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#main"
            aria-label="Community Clinic home"
          >
            <span className="brand-mark" aria-hidden="true">
              +
            </span>

            <span>
              <strong>Community Clinic</strong>
              <small>Accessible healthcare booking</small>
            </span>
          </a>

          <p className="header-note">
            Your health. Your choices.
          </p>
        </div>
      </header>
    </>
  );
}