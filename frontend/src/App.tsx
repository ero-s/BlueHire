import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";  

function App() {
  return (
    <>
      <NavBar/>
      <DashboardUpperSection/>
      <DashboardMainSection/> 
    </>
  );
}

export default App;
