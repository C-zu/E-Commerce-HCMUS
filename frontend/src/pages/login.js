import React, { useState } from "react";
import {TERipple } from "tw-elements-react";
import LoginLogo from '../img/login_logo2.webp'
import { Link, Navigate} from "react-router-dom";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
class Login extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      show_password: false,
      errors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  async handleSubmit(event) {
    event.preventDefault();
    const { accountOrEmail, password } = this.state;
    const { login } = this.context;
  
    let errors = {};
    if (accountOrEmail.trim() === "" || password.trim() === "") {
      errors = "Tài khoản hoặc mật khẩu không được bỏ trống";
      this.setState({ errors });
      return;
    }
  
    try {
      const response = await login(accountOrEmail, password);
      if (response) {
        this.setState({ errors: response });
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.setState({ errors: "An error occurred" });
    }
  }

    onChangeAccount = (event) => {
      this.setState({
        account: event.target.value
      })
    }

    onChangePassword = (event) => {
      this.setState({
        password: event.target.value
      })
    }

    togglePasswordVisibility = (event) => {
      event.preventDefault();
      this.setState(prevState => ({
        showPassword: !prevState.showPassword
      }));
    }


    render () {
      let {account, password, showPassword, errors} = this.state
      const { isLoggedIn } = this.context;
      if (isLoggedIn) {
        return <Navigate to= {"/"} replace />
      }
        return (
          <div className="pt-20 pb-12 lg-py-25 h-auto">
            <section className="h-fit">
              <div className="container h-5/6 px-6 py-12">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                  {/* <!-- Left column container with background--> */}
                  <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                    <img
                      src= {LoginLogo}
                      className="w-2/3 h-auto ml-8"
                      alt="Login Logo"
                    />
                  </div>
        
                  {/* <!-- Right column container with form --> */}
                  <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                    <form onSubmit={this.handleSubmit}>
                      {/* Error message box */}
                      {errors && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                          {errors}
                        </div>
                      )}
                    <div className="md:flex md:items-center mb-6">
                          <input className="bg-gray-200 appearance-none border-2
                           border-gray-200 rounded w-full py-2 px-4
                            text-gray-700 leading-tight focus:outline-none
                             focus:bg-white focus:border-purple-500" 
                             type="text"
                             onChange={(event) => this.onChangeAccount(event)}
                             value={account}
                          placeholder="Tài khoản"/>
                      </div>
                      {/* <!--Password input--> */}
                      <div className="md:flex md:items-center mb-6">
                      <input 
                        className="bg-gray-200 appearance-none border-none rounded-l w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => this.onChangePassword(event)}
                        value={password}
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
                      {/* <!-- Change password --> */}
                      <div className="mb-6 flex items-center justify-between">        
                        {/* <!-- Forgot password link --> */}
                        <Link
                          to = {'/forgetPassword'}
                          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
        
                      {/* <!-- Submit button --> */}
      
                      <button type="submit"
                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onKeyDown={this.handleKeyDown}
                      >
                        Đăng nhập
                      </button>
        
                      {/* <!-- Divider --> */}
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                          OR
                        </p>
                      </div>
                      <div className="items-center justify-center">
                        Bạn chưa có tài khoản. 
                        <Link to = {'/register'} className={`m-2 px-4 py-2 rounded-md text-white bg-gray-500`}>Đăng kí</Link>
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
