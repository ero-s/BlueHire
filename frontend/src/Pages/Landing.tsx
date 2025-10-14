import Hero from "../components/LandingComponents/Hero/Hero";
import landingImage from "../components/LandingComponents/Assets/landingbg.png";
import About from "../components/LandingComponents/About/About";
import Team from "../components/LandingComponents/Team/Team";
import Contacts from "../components/LandingComponents/Contacts/Contacts";

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 840vh",
        backgroundPosition: "top center",
        minHeight: "600vh",
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Hero />
      <About />
      <Team />
      <Contacts />
    </div>
  );
};

export default Landing;
