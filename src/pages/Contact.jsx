import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="contact-container container section animate-fade-in">
      <h1 className="page-title">Contact Me</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Have a question or want to work together? Leave a message!
      </p>
      <ContactForm />
    </div>
  );
}

export default Contact;
