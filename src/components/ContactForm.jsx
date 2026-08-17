import { useState, useEffect } from "react";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (data) => {
    let newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name is required.";
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!data.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  useEffect(() => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="success-message">
          Message sent successfully! (Simulated)
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name && formData.name !== "" ? "input-error" : ""}
        />
        {errors.name && formData.name !== "" && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email && formData.email !== "" ? "input-error" : ""}
        />
        {errors.email && formData.email !== "" && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className={errors.message && formData.message !== "" ? "input-error" : ""}
        ></textarea>
        {errors.message && formData.message !== "" && <span className="error-text">{errors.message}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitDisabled}>
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
