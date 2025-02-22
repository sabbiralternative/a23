import Card from "../LiveSports/Card";

const Sports = ({ sports, sportsType }) => {
  /* filtered visible = true sports */

  const filterSports =
    sports &&
    Object.keys(sports)?.filter((key) => {
      return sports?.[key]?.visible === true;
    });

  if (filterSports?.length === 0) {
    return (
      <div className="profile-menu-box">
        <div className="card-blank">
          <span> No events available right now</span>
        </div>
      </div>
    );
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {sports && Object.values(sports).length > 0 ? (
        filterSports
          ?.sort((keyA, keyB) => {
            return sports[keyA].sort - sports[keyB].sort;
          })
          ?.sort((keyA, keyB) => {
            if (
              sports[keyA].timeStatus === "Suspended" &&
              sports[keyB].timeStatus !== "Suspended"
            ) {
              return 1;
            }
            if (
              sports[keyA].timeStatus !== "Suspended" &&
              sports[keyB].timeStatus === "Suspended"
            ) {
              return -1;
            }
            return 0;
          })
          .map((key, index) => {
            return (
              <Card
                key={index}
                keys={key}
                liveSports={sports}
                sportsType={sportsType}
              />
            );
          })
      ) : (
        <div className="profile-menu-box">
          <div className="card-blank">
            <span> No events available right now</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sports;
