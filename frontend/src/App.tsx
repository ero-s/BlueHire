import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Pages/Landing";
import ReviewsAndRatings from "./Pages/WorkerSide/Reviews&Ratings";
import EarningsAndReports from "./Pages/WorkerSide/Earnings&Reports";

function App() {
  return (
    <>
      {/* <NavBar />
      <Landing/> */}
      <EarningsAndReports/>
    </>
  );
}

export default App;
