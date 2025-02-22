import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API } from "../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../lib/AxiosSecure";

const EditStake = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const buttonGameValue = JSON.parse(localStorage.getItem("buttonValue"));
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({
    buttons0value,
    buttons1value,
    buttons2value,
    buttons3value,
    buttons4value,
    buttons5value,
    buttons6value,
    buttons7value,
  }) => {
    const { data } = await AxiosSecure.post(API.buttonValue, {
      game: [
        {
          label: 100,
          value: buttons0value,
        },
        {
          label: 100,
          value: buttons1value,
        },
        {
          label: 100,
          value: buttons2value,
        },
        {
          label: 100,
          value: buttons3value,
        },
        {
          label: 100,
          value: buttons4value,
        },
        {
          label: 100,
          value: buttons5value,
        },
        {
          label: 100,
          value: buttons6value,
        },
        {
          label: 100,
          value: buttons7value,
        },
      ],
    });

    if (data.success) {
      toast.success(data?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = [
        {
          label: 100,
          value: buttons0value,
        },
        {
          label: 100,
          value: buttons1value,
        },
        {
          label: 100,
          value: buttons2value,
        },
        {
          label: 100,
          value: buttons3value,
        },
        {
          label: 100,
          value: buttons4value,
        },
        {
          label: 100,
          value: buttons5value,
        },
        {
          label: 100,
          value: buttons6value,
        },
        {
          label: 100,
          value: buttons7value,
        },
      ];
      /* set edited button values */
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/account");
    }
  };
  return (
    <div className="e-p-body-bc">
      <div className="login-page-abc">
        <div>
          <div className="login-page">
            <div className="login-box">
              <div className="login-card">
                <div className="login-card-header">
                  <span>Edit Stake</span>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                  className="animateSignInFormUserId ng-dirty ng-touched ng-invalid"
                  data-gtm-form-interact-id="2"
                >
                  <div className="edit-stakes-input-section">
                    <input
                      {...register("buttons0value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[0].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons1value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[1].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons2value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[2].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons3value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[3].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />
                  </div>

                  <div className="edit-stakes-input-section">
                    <input
                      {...register("buttons4value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[4].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons5value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[5].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons6value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[6].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />

                    <input
                      {...register("buttons7value", {
                        required: true,
                      })}
                      defaultValue={buttonGameValue[7].value}
                      type="number"
                      className="edit-stakes-input ng-untouched ng-pristine ng-valid ng-star-inserted"
                      pattern="\d*"
                    />
                  </div>

                  <button type="submit" className="login-btn">
                    <span>Update</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStake;
