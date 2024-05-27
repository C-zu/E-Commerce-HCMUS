const express = require("express");
const Router = express.Router();
const {login, register, logout} = require('../controllers/auth.controller.js');
const {getAccount, forgetPassword, changePassword, update} = require('../controllers/account.controller.js');
const {getAllusers,getUser,deleteUser,updateUser} = require('../controllers/user.controller.js');
const {getComments, getCommentByProductID, createComment, updateComment, deleteComment} = require('../controllers/main_comment.controller.js');
const {getSubComments, getSubcommentbyID, createSubcomment,updateSubcomment, deleteSubcomment} = require('../controllers/sub_comment.controller.js');
const {getAll, getbyID, createOrder, updateOrder, deleteOrder} = require('../controllers/order.controller.js');
const {getAllInfo, getInfo, createInfo, updateInfo, deleteInfo,} = require('../controllers/product.controller.js');

Router.get("/", (req, res) => {
    res.send("Hello from Node API Server");
  });

// Auth Routes
Router.post("/login", login);
Router.post("/register", register);
Router.get("/logout", logout);

// Account Routes
Router.get("/account", getAccount);
Router.post("/account/forgetPassword", forgetPassword);
Router.post("/account/changePassword", changePassword);
Router.post("/account", update);

// User Routes
Router.get("/users/", getAllusers);
Router.get("/users/:user_id", getUser);
Router.put("/users/:user_id", updateUser);
Router.delete("/users/:user_id", deleteUser);

// Main_comment Routes
Router.get("/comments", getComments);
Router.get("/comments/:product_id", getCommentByProductID);
Router.post("/comments", createComment);
Router.put("/comments/:product_id", updateComment);
Router.delete("/comments/:product_id", deleteComment);

// Sub_comment Routes
Router.get("/subcomments", getSubComments);
Router.get("/subcomments/:product_id", getSubcommentbyID);
Router.post("/subcomments", createSubcomment);
Router.put("/subcomments/:product_id", updateSubcomment);
Router.delete("/subcomments/:product_id", deleteSubcomment);

// Order Routes
Router.get("/orders", getAll);
Router.get("/orders/:order_id", getbyID);
Router.post("/orders", createOrder);
Router.put("/orders/:order_id", updateOrder);
Router.delete("/orders/:order_id", deleteOrder);

// Product Routes

Router.get("/products", getAllInfo);
Router.get("/products/:product_id", getInfo);
Router.post("/products", createInfo);
Router.put("/products/:product_id", updateInfo);
Router.delete("/products/:product_id", deleteInfo);




module.exports = Router;