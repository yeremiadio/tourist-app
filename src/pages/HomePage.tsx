import { Link } from "react-router-dom";
import Button from "../components/Buttons/Button";

function HomePage() {
  return (
    <div className="App">
      <header className="h-screen grid grid-cols-1 place-content-center place-items-center pb-8">
        <img src={"/ilus-1.svg"} className="w-full md:w-2/6" alt="logo" />
        <span className="text-gray-800 text-2xl font-extrabold mb-4">
          Welcome to <span className="text-2xl text-blue-500">Tourist App</span>
        </span>
        <Link to="/register">
          <Button bgColor="blue-500">Get Started</Button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
