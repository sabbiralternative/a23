import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";
import useGetNotification from "../../../hooks/useGetNotification";

const Notification = ({
  showNotification,
  setShowNotification,
  filteredNotification,
  setFilteredNotification,
}) => {
  const { notification, isFetchingNotification, isFetched } =
    useGetNotification();

  useEffect(() => {
    const storedNotificationId =
      JSON.parse(localStorage.getItem("notificationId")) || [];
    if (
      (!storedNotificationId || storedNotificationId?.length === 0) &&
      notification?.length > 0
    ) {
      setShowNotification(true);

      setFilteredNotification(notification);
    }
    if (
      notification?.length > 0 &&
      storedNotificationId &&
      storedNotificationId?.length > 0 &&
      !showNotification
    ) {
      const filteredNotifications = notification.filter(
        (notif) => !storedNotificationId.some((nId) => nId.id == notif.id)
      );

      if (filteredNotifications?.length > 0) {
        setFilteredNotification(filteredNotifications);
        setShowNotification(true);
      }
    }
  }, [
    notification,
    showNotification,
    isFetched,
    isFetchingNotification,
    setFilteredNotification,
    setShowNotification,
  ]);

  const closeNotification = () => {
    const notificationIds =
      JSON.parse(localStorage.getItem("notificationId")) || [];

    notification?.forEach((item) => {
      if (!notificationIds.some((notif) => notif.id === item.id)) {
        notificationIds.push({ id: item.id });
      }
    });

    localStorage.setItem("notificationId", JSON.stringify(notificationIds));

    setShowNotification(false);
  };
  return (
    <div>
      {showNotification && filteredNotification?.length > 0 && (
        <div
          style={{
            padding: "2px 5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            fontSize: "11px",
            backgroundColor: "#353535",
          }}
        >
          <Marquee>
            {filteredNotification?.map((item) => (
              <p
                key={item?.id}
                style={{ marginRight: "100vw", color: "white" }}
              >
                {item?.text}
              </p>
            ))}
          </Marquee>

          <RxCross2
            color="#fff"
            onClick={closeNotification}
            size={20}
            cursor="pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
