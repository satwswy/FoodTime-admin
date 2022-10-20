import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import "./home.scss";

const Home = () => {
  const { data, loading, error } = useFetch(`/restaurants`);
  console.log(data)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      
      </div>
    </div>
  );
};

export default Home;
