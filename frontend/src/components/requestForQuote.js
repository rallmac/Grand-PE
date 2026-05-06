import { useState, useEffect } from "react";
import axios from "axios";

export function RequestForQuote() {

  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Cleanup timeout on unmount (prevents memory leak)
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  // Handle input change
  const handleQuoteInputChange = (e) => {
    const { name, value } = e.target;

    setQuoteFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    // Trimmed validation
    if (
      !quoteFormData.name.trim() ||
      !quoteFormData.email.trim() ||
      !quoteFormData.service_type
    ) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteFormData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      setFormStatus('');

      // 🔗 Replace with your backend endpoint
      await axios.post("http://localhost:3000/quote", quoteFormData);

      setFormStatus("Thank you! Your project inquiry has been submitted. We'll contact you within 24 hours.");

      // Reset form
      setQuoteFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_type: '',
        message: '',
        budget: '',
        timeline: ''
      });

    } catch (error) {
      setFormStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    // Auto-clear message safely
    const id = setTimeout(() => setFormStatus(''), 5000);
    setTimeoutId(id);
  };

  return (
    <section id="get-quote" className="form-section section-padding bg-light">

      <div className="container reveal-on-scroll">
        <h3>Request A Quote Today!</h3>

        <form onSubmit={handleQuoteSubmit} className="quote-form">

          <div className="form-row">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={quoteFormData.name}
                onChange={handleQuoteInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={quoteFormData.email}
                onChange={handleQuoteInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={quoteFormData.phone}
                onChange={handleQuoteInputChange}
                pattern="[0-9+ ]*"
              />
            </div>

            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                name="company"
                value={quoteFormData.company}
                onChange={handleQuoteInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Service Type:</label>
              <select
                name="service_type"
                value={quoteFormData.service_type}
                onChange={handleQuoteInputChange}
                required
              >
                <option value="">-- Select Service --</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="custom-software">Custom Software</option>
                <option value="cloud-devops">Cloud & DevOps</option>
                <option value="consulting">IT Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Project Budget:</label>
              <select
                name="budget"
                value={quoteFormData.budget}
                onChange={handleQuoteInputChange}
              >
                <option value="">-- Select Budget --</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Project Timeline:</label>
            <select
              name="timeline"
              value={quoteFormData.timeline}
              onChange={handleQuoteInputChange}
            >
              <option value="">-- Select Timeline --</option>
              <option value="asap">ASAP</option>
              <option value="1-3-months">1-3 Months</option>
              <option value="3-6-months">3-6 Months</option>
              <option value="6-plus-months">6+ Months</option>
            </select>
          </div>

          <div className="form-group">
            <label>Project Description:</label>
            <textarea
              name="message"
              rows="5"
              value={quoteFormData.message}
              onChange={handleQuoteInputChange}
              placeholder="Describe your project..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Request Quote"}
          </button>

          {formStatus && (
            <div className={`form-status ${formStatus.includes('Thank you') ? 'success' : 'error'}`}>
              {formStatus}
            </div>
          )}

        </form>
      </div>
    </section>
  );
}