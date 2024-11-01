import './Contact.css';

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="contact-links">
              <h2 className="text-center mb-4">Contact Me</h2>
              
              <p className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>Email: </span>
                <a href="mailto:sanesunil.falseofficial@gmail.com">
                  sanesunil.falseofficial@gmail.com
                </a>
              </p>
              
              <p className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>Phone: </span>
                <a href="tel:+919995453521">
                  +91 9995453521
                </a>
              </p>
              
              <p className="contact-item">
                <i className="bi bi-github"></i>
                <span>GitHub: </span>
                <a href="https://github.com/Sane-Sunil" target="_blank" rel="noopener noreferrer">
                  Sane-Sunil
                </a>
              </p>
              
              <p className="contact-item">
                <i className="bi bi-linkedin"></i>
                <span>LinkedIn: </span>
                <a href="https://www.linkedin.com/in/sane-sunil" target="_blank" rel="noopener noreferrer">
                  sane-sunil
                </a>
              </p>
              
              <p className="text-center mt-4">
                Feel free to reach out for collaborations or inquiries!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
