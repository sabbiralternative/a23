import { images } from "../../assets";
import useWithdrawBreakdown from "../../hooks/useWithdrawBreakdown";

const SelectAmount = ({ setAmount, amount, setShowBankAccount }) => {
  const { withdrawBreakdown } = useWithdrawBreakdown();

  return (
    <div
      data-scroll-lock-scrollable=""
      className="dep-w-info-bc  ng-star-inserted"
    >
      <div className="withdraw-section  ng-star-inserted">
        <div className="bonus-amount ">
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star1 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star2 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="bonus-star3 "
          />
          <img
            loading="lazy"
            src={images.star}
            alt=""
            className="wallet-logo "
          />
          <div className="">
            <img
              loading="lazy"
              src={images.star}
              alt=""
              className="wallet-3D-frame "
            />
            <img
              loading="lazy"
              src={images.star}
              alt=""
              className="wallet-3d "
            />
          </div>
          <div className="wallet-card ">
            <span className="wallet-amount ">
              ₹ {withdrawBreakdown?.mainWallet}
            </span>
            <div className="wallet-txt ">
              <p className="">Main Wallet</p>
              {/* <div className="with-any ">
                <p className="">Can withdraw anytime</p>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="active-bonus-card ">
          <div className="active-bonus-inner-card ">
            <div className="money-text ">
              <p className="">Free Money</p>
              <p className="money-bal ">₹ {withdrawBreakdown?.freeMoney}</p>
            </div>
            <div className="money-text ">
              <p className="">Active Bonus</p>
              <p className="money-bal ">₹ {withdrawBreakdown?.activeBonus}</p>
            </div>
            <div className="progressbar ">
              <div className="progressbg " style={{ width: "3%" }}>
                <div className="progressdot "></div>
              </div>
            </div>
            <div className="wallet-msg ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className=""
              >
                <path
                  d="M13.4801 3.08634C12.5267 1.99967 10.4801 1.33301 8.00008 1.33301C5.52008 1.33301 3.47341 1.99967 2.52008 3.08634C0.933411 4.92634 0.933411 11.0863 2.52008 12.913C3.47341 13.9997 5.52008 14.6663 8.00008 14.6663C10.4801 14.6663 12.5267 13.9997 13.4801 12.913C15.0667 11.073 15.0667 4.92634 13.4801 3.08634ZM8.00008 4.49967C8.1649 4.49967 8.32601 4.54855 8.46305 4.64012C8.6001 4.73168 8.70691 4.86183 8.76998 5.0141C8.83305 5.16638 8.84955 5.33393 8.8174 5.49558C8.78525 5.65723 8.70588 5.80572 8.58933 5.92226C8.47279 6.03881 8.32431 6.11817 8.16265 6.15033C8.001 6.18248 7.83345 6.16598 7.68118 6.10291C7.5289 6.03983 7.39876 5.93302 7.30719 5.79598C7.21562 5.65894 7.16675 5.49783 7.16675 5.33301C7.16675 5.11199 7.25454 4.90003 7.41082 4.74375C7.5671 4.58747 7.77907 4.49967 8.00008 4.49967ZM8.66675 11.6663H7.33341C7.1566 11.6663 6.98703 11.5961 6.86201 11.4711C6.73698 11.3461 6.66675 11.1765 6.66675 10.9997C6.66675 10.8229 6.73698 10.6533 6.86201 10.5283C6.98703 10.4032 7.1566 10.333 7.33341 10.333V8.33301C7.1566 8.33301 6.98703 8.26277 6.86201 8.13775C6.73698 8.01272 6.66675 7.84315 6.66675 7.66634C6.66675 7.48953 6.73698 7.31996 6.86201 7.19494C6.98703 7.06991 7.1566 6.99967 7.33341 6.99967H8.00008C8.17689 6.99967 8.34646 7.06991 8.47148 7.19494C8.59651 7.31996 8.66675 7.48953 8.66675 7.66634V10.333C8.84356 10.333 9.01313 10.4032 9.13815 10.5283C9.26317 10.6533 9.33341 10.8229 9.33341 10.9997C9.33341 11.1765 9.26317 11.3461 9.13815 11.4711C9.01313 11.5961 8.84356 11.6663 8.66675 11.6663Z"
                  fill="#F75555"
                  className=""
                ></path>
              </svg>
              <p className="">
                The free money and any active bonus funds will be removed if you
                make a withdrawal.
              </p>
            </div>
          </div>
        </div> */}
        <div className="amount-input ">
          <p className="amount-text ">Please enter the amount to withdraw</p>
          <form
            style={{ width: "100%" }}
            className=" ng-pristine ng-invalid ng-touched"
          >
            <div className="diposit_form ">
              <div className="w-100 deposit_form_input ">
                <div className="w-100 deposit_form_input ">
                  <div className="inputBox2 ">
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      id="depositamount"
                      name="depositamount"
                      min="0"
                      type="text"
                      className="deposit_form_input   ng-pristine ng-invalid ng-touched"
                      placeholder="₹ Amount"
                    />
                    <p className="deposit-input-min-text ">
                      minimum ₹{withdrawBreakdown?.minimumWithdraw}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          disabled={
            amount < withdrawBreakdown?.minimumWithdraw ||
            amount > withdrawBreakdown?.mainWallet
          }
          onClick={() => setShowBankAccount(true)}
          className="btnn1 "
        >
          Continue to Select Account
        </button>
      </div>
    </div>
  );
};

export default SelectAmount;
