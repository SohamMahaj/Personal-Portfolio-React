import { useState } from "react";
import { API_BASE_URL } from "../config";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [serverError, setServerError] = useState("");

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

  const errors = validate(formData);
  const isSubmitDisabled = Object.keys(errors).length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (serverError) setServerError("");
    if (submitSuccess) setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setServerError("");
      setSubmitSuccess("");

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setSubmitSuccess(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setServerError(err.message || "Unable to send message. Please check backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="success-message">
          {submitSuccess}
        </div>
      )}

      {serverError && (
        <div className="server-error-message">
          {serverError}
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

      <button type="submit" className="btn-primary" disabled={isSubmitDisabled || isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
