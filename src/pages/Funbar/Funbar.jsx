const Funbar = () => {
  const token = localStorage.getItem("token");

  return (
    <iframe
      allow="fullscreen;"
      src={`https://aura365.io/${token}`}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        margin: "0px",
        padding: "0px",
        overflow: "hidden",
        zIndex: "999999",
      }}
    ></iframe>
  );
};

export default Funbar;
