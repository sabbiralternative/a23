import toast from "react-hot-toast";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useContextState from "../../hooks/useContextState";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AxiosSecure } from "../../lib/AxiosSecure";

const ChangePassword = () => {
  window.scrollTo(0, 0);
  const { setGetToken } = useContextState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  /* Change password function */
  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };
    const { data } = await AxiosSecure.post(API.changePassword, payload);

    if (data.success) {
      /* After success showing success message */
      toast.success(data?.result?.message);
      setTimeout(() => {
        // handleLogOut();
        setGetToken((prev) => !prev);
        navigate("/");
      }, 1000);
    } else {
      /* Showing error message during change password */
      toast.error(data?.error?.errorMessage);
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
                  <span>Change Password</span>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                  className="animateSignInFormUserId ng-dirty ng-touched ng-invalid"
                  data-gtm-form-interact-id="2"
                >
                  <div className="whatsup-login-box">
                    <div className="mobile-input">
                      <span>Old Password*</span>
                      <div className="input-box">
                        <div className=""></div>
                        <input
                          {...register("password", { required: true })}
                          type="password"
                          placeholder="Enter old password"
                          className="ng-dirty ng-touched ng-invalid"
                          data-gtm-form-interact-field-id="4"
                        />
                      </div>

                      <div className="password-input password-input-1">
                        <span>New Password*</span>
                        <input
                          {...register("newPassword", {
                            required: true,
                            minLength: 5,
                          })}
                          required=""
                          placeholder="Enter new password"
                          type={`${showPassword ? "text" : "password"}`}
                          className="ng-dirty ng-touched ng-invalid"
                          data-gtm-form-interact-field-id="5"
                        />
                        <span className="showPass">
                          <div className=""></div>
                          {showPassword ? (
                            <FaEye
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => setShowPassword((prev) => !prev)}
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          )}
                        </span>
                      </div>

                      <div className="password-input password-input-1">
                        <span>Confirm Password*</span>
                        <input
                          {...register("newPasswordConfirm", {
                            required: true,
                            minLength: 5,
                          })}
                          placeholder="Re-Enter new password"
                          type={`${showConfirmPassword ? "text" : "password"}`}
                          className="ng-dirty ng-touched ng-invalid"
                          data-gtm-form-interact-field-id="5"
                        />
                        <span className="showPass">
                          <div className=""></div>
                          {showConfirmPassword ? (
                            <FaEye
                              onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              size={16}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="login-btn">
                    <span>Change Password</span>
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

export default ChangePassword;
