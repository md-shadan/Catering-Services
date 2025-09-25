import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <span role="img" aria-label="food" style={{fontSize: "1.3em"}}>🍽️</span>
        <span className="footer-title">Ambur Catering</span>
      </div>
      <div className="footer-links">
        <a href="mailto:info@amburcatering.com">Contact</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Ambur Catering. All rights reserved.
      </div>
    </div>
    <style>{`
  .footer {
    background: #fdf6e3; /* Light cream color */
    color: #333; /* Dark text for readability */
    padding: 50px 0 30px 0; /* Taller footer */
    margin-top: 48px;
  }
  .footer-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .footer-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .footer-title {
    color: #065f46; /* Green accent for Ambur Catering */
  }
  .footer-links {
    display: flex;
    gap: 28px;
    font-size: 1.05rem;
  }
  .footer-links a {
    color: #333;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover {
    color: #065f46; /* Green hover */
  }
  .footer-copy {
    font-size: 0.95rem;
    color: #555;
    margin-top: 8px;
  }
  @media (max-width: 600px) {
    .footer-content {
      padding: 0 8px;
    }
    .footer-links {
      gap: 16px;
      font-size: 0.95rem;
    }
  }
`}</style>

  </footer>
);

export default Footer;