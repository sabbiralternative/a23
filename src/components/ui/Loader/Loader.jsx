import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <FaSpinner className="animate-spin" size={30} color="white" />
    </div>
  );
};

export default Loader;
