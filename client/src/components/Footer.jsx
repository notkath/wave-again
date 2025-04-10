import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h2>Let's Keep Our <br />Beaches Alive</h2>

          <div className="footer-section">
            <h4>Menu</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Join The Movement</li>
              <li>Donate</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        <div className="footer-center">
          <div className="footer-section">
            <h4>Contact</h4>
            <p>3891 Dr. Rajesh, Chennai</p>
            <p>62639, Chennai</p>
            <p>+123 456 789</p>
            <p>📧 mail@blue.hope</p>
          </div>
        </div>

        <div className="footer-right">
          <p>
            Connecting conservation efforts worldwide to protect oceans and marine life.
          </p>
          <button className="join-btn">JOIN THE MOVEMENT</button>

          <div className="socials">
            <h4>Follow Us</h4>
            <p>Instagram | Facebook | Youtube</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {/* <p>Powered by SocioLib.</p> */}
      </div>
    </footer>
  );
};

export default Footer;

