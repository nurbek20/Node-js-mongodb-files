const express = require('express');

const userController = require('./../controllers/userController');
// const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser,
// } = require('./../controllers/userController');
// const getAllUsers = (req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defained!',
//     });
//   };

//   const getUser = (req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defained!',
//     });
//   };

//   const createUser = (req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defained!',
//     });
//   };

//   const updateUser = (req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defained!',
//     });
//   };

//   const deleteUser = (req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defained!',
//     });
//   };

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
