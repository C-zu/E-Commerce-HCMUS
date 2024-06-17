// AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('https://m8mp78nj-8000.asse.devtunnels.ms/api/account/', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        console.log("User data fetched successfully");
        setUser(response.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: Invalid token");
          // Handle unauthorized access due to invalid token
          logout(); // Log out the user if token is invalid
        } else if (error.response.status === 403) {
          console.log("Forbidden: Access denied");
          logout();
          // Handle access denied due to insufficient permissions
        } else if (error.response.status === 404) {
          console.log("User not found");
          logout();
          // Handle user not found
        } else {
          console.error("Error fetching user data:", error);
          logout();
          // Handle other errors (e.g., network issues)
        }
      } else {
        console.error("Error fetching user data:", error);
        logout();
        // Handle other errors (e.g., network issues)
      }
    }
  };

  const login = async (accountOrEmail, password) => {
    try {
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/login/", {
        accountOrEmail,
        password,
      });
      if (response.status === 200) {
        console.log("Login successful");
        const { token } = response.data;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        fetchUserData(token);
        window.location.replace("/");
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 401 && error.response.data === "Invalid credentials") {
        console.log("Unauthorized: Incorrect credentials");
        return "Tài khoản hoặc mật khẩu không đúng";
      } else if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản hoặc mật khẩu không đúng";
      } else {
        console.error("Error during login:", error);
        // Handle other errors (e.g., network issues)
        return "Có lỗi xảy ra khi đăng nhập";
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser('');
  };

  const register = async (account, email, password, address, phone) => {
    try {
      const role = 'customer'
      const user_id = parseInt(Date.now(), 12);
      console.log(user_id)
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/register/", {
        user_id,  
        account,
        password,
        email,
        address,
        phone,
        role,
        avatar: null,
        avatarContentType: 'image/png',
      });
      if (response.status === 200) {
        const data = response.data;
        if (data === "existedaccount") {
          return "Tài khoản đã tồn tại";
        }
        else if (data == "existedemail") {
          return "Email này đã được đăng ký";
        } else if (data === "notexist") {
          alert("Đăng ký thành công")
          window.location.replace("/login");
          return null;
        } else {
          return "Unexpected response from server";
        }
      } 
      else {
        console.log("Unexpected response status: " + response.status);
        return "Unexpected response from server";
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      return "An error occurred while registering";
    }
  };

  const reset_password = async (account, email) => {
    try {
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/account/forgetPassword/", {
        account,
        email,
      });
      if (response.status === 200) {
        console.log("Reset successful");
        return null;
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      if (error.response && error.response.status === 400 && error.response.data === "Email does not match account") {
        console.log("Email does not match account");
        return "Sai email";
      } else if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản không tồn tại";
      } else {
        console.error("Error during reset:", error);
        // Handle other errors (e.g., network issues)
        return "Có lỗi xảy ra khi trong quá trình reset mật khẩu";
      }
    }
  }

  const change_password = async (account, password, new_password, confirm_newpassword) => {
    try {
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/account/changePassword", {
        account, password, new_password, confirm_newpassword
      });
      if (response.status === 200) {
        console.log("Change password successful");
        return null;
      }
    } catch (error) {
      console.error("Error during change password:", error);
      if (error.response && error.response.status === 401 && error.response.data === "Invalid credentials") {
        console.log("mật khẩu cũ không đúng.");
        return "Mật khẩu cũ không đúng";
      } else if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản không tồn tại";
      } else {
        console.error("Error during change:", error);
        return "Có lỗi xảy ra khi trong quá trình thay đổi mật khẩu";
      }
    }
  }

  const change_email = async (account, editedEmail) => {
    try {
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/account/changeEmail", {
        account, editedEmail
      });
      if (response.status === 200) {
        console.log("Change email successful");
        return null;
      }
    } catch (error) {
      console.error("Error during change email:", error);
      if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản không tồn tại";
      } else {
        console.error("Error during change:", error);
        return "Có lỗi xảy ra khi trong quá trình thay đổi email";
      }
    }
  }

  const change_phone = async (account, editedPhone) => {
    try {
      const response = await axios.post("https://m8mp78nj-8000.asse.devtunnels.ms/api/account/changePhone", {
        account, editedPhone
      });
      if (response.status === 200) {
        console.log("Change phone successful");
        return null;
      }
    } catch (error) {
      console.error("Error during change phone:", error);
      if (error.response && error.response.status === 404 && error.response.data === "User not found") {
        console.log("User not found");
        return "Tài khoản không tồn tại";
      } else {
        console.error("Error during change:", error);
        return "Có lỗi xảy ra khi trong quá trình thay đổi số điện thoại";
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register, reset_password, change_password, change_phone, change_email }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
