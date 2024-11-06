import './Contact.css';

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="contact-links">
              <h2 className="text-center mb-4">Contact Me</h2>
              <div className="contact_main_div">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div className="contact-text">
                    <a href="mailto:sanesunil.falseofficial@gmail.com">
                      sanesunil.falseofficial@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="contact-text">
                    <a href="tel:+919995453521">
                      +91 9995453521
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="bi bi-github"></i>
                  </div>
                  <div className="contact-text">
                    <a href="https://github.com/Sane-Sunil" target="_blank" rel="noopener noreferrer">
                      Sane-Sunil
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="bi bi-linkedin"></i>
                  </div>
                  <div className="contact-text">
                    <a href="https://www.linkedin.com/in/sane-sunil-55a552334/" target="_blank" rel="noopener noreferrer">
                      Sane Sunil
                    </a>
                  </div>
                </div>
              </div>
              
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
