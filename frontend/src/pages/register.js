import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import { AuthContext } from "../context/AuthContext";

class Register extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      phone: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { account, email, password, confirm_password, address, phone } = this.state;
    const { register } = this.context;
    if (password !== confirm_password) {
      this.setState({ error: "Mật khẩu không giống với nhập lại mật khẩu" });
    } else {
      try {
        const response = await register(account, email, password, address, phone);
        if (response) {
          this.setState({ error: response });
        }

      } catch (error) {
        console.error("An error occurred while registering:", error);
        alert("An error occurred while registering");
      }
    }
  }

  onChangeAccount = (event) => {
    this.setState({
      account: event.target.value
    });
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  onChangeConfirmPassword = (event) => {
    this.setState({
      confirm_password: event.target.value
    });
  }

  onChangeAddress = (event) => {
    this.setState({
      address: event.target.value
    });
  }

  onChangePhone = (event) => {
    this.setState({
      phone: event.target.value
    });
  }

  render() {
    const { account, password, email, confirm_password, address, phone, error } = this.state;
    const { isLoggedIn } = this.context;
    if (isLoggedIn) {
      return <Navigate to="/" replace />
    }
    return (
      <section className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="container h-5/6 px-6 py-12 bg-white rounded-lg shadow-lg">
          <div className="g-6 flex h-2/3 items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 flex justify-center">
              <img src={Logo} className="w-full max-w-xs" alt="Logo" />
            </div>
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={this.handleSubmit} className="w-full">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-3 mb-4 rounded-md">
                    {error}
                  </div>
                )}
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="account">
                    Tài khoản:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    id="account"
                    value={account}
                    onChange={this.onChangeAccount}
                    placeholder="Tài khoản"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="email"
                    id="email"
                    value={email}
                    onChange={this.onChangeEmail}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="address">
                    Địa chỉ:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    id="address"
                    value={address}
                    onChange={this.onChangeAddress}
                    placeholder="Địa chỉ"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="phone">
                    Số điện thoại:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={this.onChangePhone}
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="password">
                    Mật khẩu:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="password"
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Mật khẩu"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-gray-500 font-bold mb-2 w-1/3" htmlFor="confirm_password">
                    Xác nhận mật khẩu:
                  </label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="password"
                    id="confirm_password"
                    value={confirm_password}
                    onChange={this.onChangeConfirmPassword}
                    placeholder="Xác nhận mật khẩu"
                    required
                  />
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Đăng ký
                  </button>
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Bạn đã có tài khoản?{" "}
                    <Link
                      to='/login'
                      className="text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-800"
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
