import React from 'react';
import Logo from '../img/logo.png';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

class ChangePassword extends React.Component {
    state = {
        password: "",
        new_password: "",
        confirm_newpassword: "",
        errors: "",
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    onChangeNewPassword = (event) => {
        this.setState({ new_password: event.target.value });
    }

    onChangeConfirmNewPassword = (event) => {
        this.setState({ confirm_newpassword: event.target.value });
    }

    onKeyDownSubmit = (event) => {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    }

    onClickChangePassword = async (account) => {
        let { password, new_password, confirm_newpassword, errors } = this.state;
        if (password.trim() === "" || new_password.trim() === "" || confirm_newpassword.trim() === "") {
            errors = "Không được bỏ trống thông tin";
            this.setState({ errors: errors });
            return;
        }

        if (new_password !== confirm_newpassword) {
            errors = "Mật khẩu mới và xác nhận mật khẩu không khớp";
            this.setState({ errors: errors });
            return;
        }

        this.setState({ errors: "" });

        try {
            const response = await axios.post('http://localhost:8000/user/account/changePassword', {
                account, password, new_password, confirm_newpassword
            });
            if (response.status === 200) {
                window.location.replace("/");
            }
        } catch (error) {
            if (error.response.status === 401) {
                this.setState({ errors: "Tài khoản hoặc mật khẩu không đúng" });
            } else if (error.response.status === 404) {
                this.setState({ errors: "Tài khoản không tồn tại" });
            } else {
                this.setState({ errors: "Error occurred" });
            }
        }
    }

    render() {
        let { password, new_password, confirm_newpassword, errors } = this.state;
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <div className='flex flex-col items-center mb-6'>
                    <img className='w-20 h-20' src={Logo} alt="Logo" />
                    <h1 className='text-4xl font-bold text-gray-900'>Đổi mật khẩu</h1>
                </div>
                <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Mật khẩu cũ</label>
                            <input
                                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                type='password'
                                placeholder='Mật khẩu cũ'
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Mật khẩu mới</label>
                            <input
                                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                type='password'
                                placeholder='Mật khẩu mới'
                                onChange={this.onChangeNewPassword}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Xác nhận mật khẩu mới</label>
                            <input
                                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                type='password'
                                placeholder='Xác nhận mật khẩu mới'
                                onChange={this.onChangeConfirmNewPassword}
                            />
                        </div>
                        {errors && (
                            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                                {errors}
                            </div>
                        )}
                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                onClick={this.onClickChangePassword}
                                onKeyDown={this.onKeyDownSubmit}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;