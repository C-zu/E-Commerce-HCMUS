import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoginLogo from '../img/login_logo2.webp';
import { AuthContext } from "../context/AuthContext";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      accountOrEmail: "",
      password: "",
      showPassword: false,
      errors: {
        accountOrEmail: "",
        password: "",
        general: ""
      }
    };
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { accountOrEmail, password } = this.state;
    const { login } = this.context;

    let errors = {
      accountOrEmail: "",
      password: "",
      general: ""
    };

    // Username validation
    if (accountOrEmail.trim() === "") {
      errors.accountOrEmail = "Tài khoản không được để trống.";
    } else if (accountOrEmail.length < 3 || accountOrEmail.length > 30) {
      errors.accountOrEmail = "Độ dài Tài khoản phải từ 3 đến 30 ký tự.";
    }

    // Password validation
    if (password.trim() === "") {
      errors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 6 || password.length > 10) {
      errors.password = "Độ dài Mật khẩu phải từ 6 đến 10 ký tự.";
    }

    // If there are validation errors, set them in the state and return
    if (errors.accountOrEmail || errors.password) {
      this.setState({ errors });
      return;
    }

    try {
      const response = await login(accountOrEmail, password);
      if (response) {
        this.setState({ errors: { general: response } });
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.setState({ errors: { general: "Có lỗi xảy ra khi đăng nhập." } });
    }
  };

  onChangeAccount = (event) => {
    this.setState({
      accountOrEmail: event.target.value,
      errors: { ...this.state.errors, accountOrEmail: "" }
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      errors: { ...this.state.errors, password: "" }
    });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { accountOrEmail, password, showPassword, errors } = this.state;
    const { isLoggedIn } = this.context;

    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="pt-20 pb-12 lg-py-25 h-auto">
        <section className="h-fit">
          <div className="container h-5/6 px-6 py-12">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              {/* Left column container with background */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                <img
                  src={LoginLogo}
                  className="w-2/3 h-auto ml-8"
                  alt="Login Logo"
                />
              </div>

              {/* Right column container with form */}
              <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                <form onSubmit={this.handleSubmit}>
                  {/* Error message box */}
                  {(errors.accountOrEmail || errors.password || errors.general) && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                      {errors.accountOrEmail && (
                        <p className="mb-1">{errors.accountOrEmail}</p>
                      )}
                      {errors.password && (
                        <p className="mb-1">{errors.password}</p>
                      )}
                      {errors.general && (
                        <p className="mb-1">{errors.general}</p>
                      )}
                    </div>
                  )}

                  <div className="md:flex md:items-center mb-6">
                    <input
                      className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.accountOrEmail && 'border-red-500'}`}
                      type="text"
                      value={accountOrEmail}
                      onChange={this.onChangeAccount}
                      placeholder="Tài khoản"
                    />
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <input
                      className={`bg-gray-200 appearance-none border-none rounded-l w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.password && 'border-red-500'}`}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={this.onChangePassword}
                      placeholder="Mật khẩu"
                    />
                    <button
                      type="button"
                      className="rounded-r bg-gray-200 py-3 px-4 cursor-pointer border-2 border-gray-200"
                      onClick={this.togglePasswordVisibility}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>

                  {/* Forgot password link */}
                  <div className="mb-6 flex items-center justify-between">
                    <Link
                      to="/forgetPassword"
                      className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onKeyDown={this.handleKeyDown}
                  >
                    Đăng nhập
                  </button>

                  {/* Divider */}
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      HOẶC
                    </p>
                  </div>

                  {/* Register link */}
                  <div className="items-center justify-center">
                    Bạn chưa có tài khoản?{" "}
                    <Link
                      to="/register"
                      className="m-2 px-4 py-2 rounded-md text-white bg-gray-500"
                    >
                      Đăng kí
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
