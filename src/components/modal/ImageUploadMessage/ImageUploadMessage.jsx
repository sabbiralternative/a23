import { FaSpinner } from "react-icons/fa";

const ImageUploadMessage = ({ imageUploadMessage }) => {
  return (
    <div
      className="Modal-Background "
      style={{
        alignItems: "center",
      }}
    >
      <div
        className="card-add-bank"
        style={{
          maxHeight: "30vh",
          position: "relative",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <span style={{ marginBottom: "6px" }}> {imageUploadMessage}</span>
        <FaSpinner className="animate-spin" size={30} color="black" />
      </div>
    </div>
  );
};

export default ImageUploadMessage;
