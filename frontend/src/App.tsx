import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";  
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Pages/Landing";

function App() {
  return (
    <>
      <NavBar/>
      <DashboardUpperSection/>
      <DashboardMainSection/> 
      <NavBar />
      <Landing/>
    </>
  );
}

export default App;
