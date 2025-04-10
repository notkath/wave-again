import React from "react";
import img1 from "../../assets/image1.jpg";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/image3.jpg";
import img4 from "../../assets/image4.jpg";
import img5 from "../../assets/image5.jpg";
import img6 from "../../assets/image6.jpg";
const Home = () => {
  return (
    <div>
      <p>#protectourbeaches</p>
      <h1 className="blockside">Be the wave of change</h1>
      <section className="about-section">
        <h2 className="block">Who We Are</h2>
        <p className="block subtext">
          We are a passionate community of environmental advocates, marine
          biologists, and volunteers dedicated to preserving the beauty and
          biodiversity of our beaches. Through education, awareness, and
          hands-on action, we strive to make a lasting impact on coastal
          conservation.
        </p>

        <h2 className="block">What We Do</h2>
        <p className="block subtext">
          From organizing beach cleanups and rescuing marine wildlife, to
          hosting workshops and empowering local communities, our initiatives
          are designed to protect ocean ecosystems while inspiring sustainable
          living.
        </p>

        <h2 className="block">Why It Matters</h2>
        <p className="block subtext">
          In today's world, our beaches face growing threats from pollution,
          plastic waste, and climate change. Without immediate action, we risk
          losing vital marine habitats and natural coastal defenses. Together,
          we can be the guardians of the deep blue.
        </p>
      </section>

      <div className="home-container">
        <h1 className="home-title block">Guardians of the Deep Blue</h1>
        <div className="image-section">
          <img src={img1} alt="whale1" className="whale-img block" />
          <img src={img2} alt="whale2" className="whale-img block" />
          <img src={img3} alt="whale3" className="whale-img block" />
        </div>
        <section className="beach-info">
          <h2 className="block">Why Beach Conservation Matters</h2>
          <p className="block subtext">
            Our beaches are more than scenic getaways — they are vital
            ecosystems that sustain marine biodiversity and act as natural
            barriers protecting our coastlines. With rising pollution and
            climate challenges, it’s time we act to preserve these natural
            treasures.
          </p>
        </section>

        <section className="image-section">
          <div className="info-card block delay1">
            <img src={img4} alt="Cleanup volunteers" className="card-img" />
            <p className="card-text">
              Volunteers uniting to clean and restore our shorelines.
            </p>
          </div>

          <div className="info-card block delay2">
            <img src={img5} alt="Turtle rescue" className="card-img" />
            <p className="card-text">
              Protecting and releasing rescued sea turtles back to their homes.
            </p>
          </div>

          <div className="info-card block delay3">
            <img src={img6} alt="Kids learning" className="card-img" />
            <p className="card-text">
              Inspiring the next generation through conservation education.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
