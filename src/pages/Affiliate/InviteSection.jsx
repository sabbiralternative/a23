import { Fragment, useState } from "react";
import { images } from "../../assets";
import useGetIndex from "../../hooks/useGetIndex";
import { handleCopyToClipBoard } from "../../utils/handleCopyToClipBoard";
import AddNewUser from "../../components/modal/AddNewUser";

const InviteSection = () => {
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const { data } = useGetIndex();

  return (
    <Fragment>
      {showAddNewUserModal && (
        <AddNewUser setShowAddNewUserModal={setShowAddNewUserModal} />
      )}
      <div data-v-4c49d924 className="nw-affi-invite-sec">
        <div className="nw-affi-invite-content-wrapper" data-v-4c49d924>
          <div className="nw-affi-invite-content" data-v-4c49d924>
            <h2 data-v-4c49d924>Invite your friends</h2>
            <p data-v-4c49d924>to join and you can receive huge bonuses</p>
          </div>
          <div className="nw-affi-invite-img" data-v-4c49d924>
            <img
              src={images.affiInvite}
              alt="affi-invite-img"
              data-v-4c49d924
            />
          </div>
        </div>
        <div className="nw-affi-add-new-user-btn-sec" data-v-4c49d924>
          <button
            onClick={() => setShowAddNewUserModal(true)}
            className="nw-affi-add-new-user-btn"
            data-bs-target="#AfAddNewUser"
            data-bs-toggle="modal"
            data-v-4c49d924
          >
            <span data-v-4c49d924>
              <img
                src={images.affiAddUser}
                alt="affi-add-user"
                data-v-4c49d924
              />{" "}
              ADD NEW USER
            </span>
          </button>
        </div>
        <div data-v-4c49d924 className="nw-affi-qr-invite-wrapper">
          <div data-v-4c49d924 className="nw-affi-qr-invite-code">
            <div data-v-4c49d924 className="nw-affi-qr-invite-heading">
              <img
                data-v-4c49d924
                src={images.affiInviteGift}
                alt="invite-gift"
              />
              <h3 data-v-4c49d924>Invitation Code</h3>
            </div>
            <div data-v-4c49d924 className="nw-affi-share-link-sec">
              <span data-v-4c49d924>{data?.link}</span>
            </div>
            <div data-v-4c49d924 className="affi-qr-btn-wrapper">
              <div data-v-4c49d924 className="nw-affi-qr-sec">
                <canvas
                  id="qrCanvas"
                  width={120}
                  height={120}
                  style={{ width: "100px", height: "100px" }}
                />

                <span data-v-4c49d924>Download</span>
              </div>
              <div data-v-4c49d924 className="af-form-btn-sec">
                <button
                  onClick={() => handleCopyToClipBoard(data?.text)}
                  data-v-4c49d924
                  className="thm-but thm-bdr-btn affi-cancel-btn affi-yellow-btn"
                >
                  <img data-v-4c49d924 src={images.affiCopy} alt="affi-copy" />{" "}
                  Copy Link
                </button>
                <button
                  data-v-4c49d924
                  className="nw-affi-add-new-user-btn"
                  data-bs-target="#ShareAffiliate"
                  data-bs-toggle="modal"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InviteSection;
