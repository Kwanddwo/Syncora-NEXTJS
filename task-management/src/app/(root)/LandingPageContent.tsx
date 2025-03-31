import Link from "next/link";

export function LandingPageContent() {
    return (
      <div className="page">
        <img className="life" src="life.png" alt="life" />
        <section className="hero">
          <h1 className="hook">
            <span className="main-text">Time to organize your work</span>
            <img
              className="vector"
              src="https://c.animaapp.com/m8uiljkus1uQ04/img/vector-1.svg"
              alt="Decorative underline"
            />
          </h1>
          <p className="hero-description">
            Minimal task app which keeps track of all your projects in one
            place.
          </p>
          <div className="button-group">
            <button className="button button-secondary">Take a Look</button>
            <button className="button button-primary">
              <Link href="/sign-up">Get Started</Link>
            </button>
          </div>
        </section>
        <img
          className="hero-image"
          src="https://c.animaapp.com/m8uiljkus1uQ04/img/illustration-of-task-checklist-woman-standing-with-pad-in-flat-d.png"
          alt="Illustration of a woman with a task checklist"
        />
      </div>
    );
}
