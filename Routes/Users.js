const express = require("express");
const { getAllUsers, getSingleUsersById, deleteUser, updateUserData, createNewUser, getSubscriptionDetailsById }
 = require("../controllers/user-controller");
const { users } = require("../data/users.json");


const { UserModel, BookModel } = require("../models");

const router = express.Router();




/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

// http://localhost:8081/users

// router.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users,
//     });
// });

router.get("/", getAllUsers);

//   http://localhost:8081/users/id

/**
 * Route: /:id
 * Method: GET
 * Description: Get single users by their id
 * Access: Public
 * Parameters: None
 */

// router.get("/:id", (req, res) => {
//     // const id = req.params.id;
//     const { id } = req.params;
//     // const { data } = req.body
//     console.log(req.params);
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User does not exist !!",
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         message: "User Found",
//         data: user,
//     })
// });

router.get("/:id", getSingleUsersById);


// Route: /
// Method: POST 
// Description: Creating a new user
// Access: Public 
// Parameters: None

// router.post("/", (req, res) => {
//     const {id, name, surname, email, subscriptionType, subscriptionDate} =
//     req.body;

//     const user = users.find((each) => each.id === id);
    
//     if(user) {
//         return res.status(404).json({
//             success: false,
//             message: "User With The ID Exists",
//         });
//     }

//     users.push({
//         id,
//         name,
//         surname,
//         email,
//         subscriptionType,
//         subscriptionDate,
//     });

//     return res.status(201).json({
//         success: true,
//         message: "User Added Successfully",
//         data: users,
//     });

// })

router.post("/", createNewUser);

 
/**
 * Route: /:id
 * Method: PUT
 * Description: Update the user by their id
 * Access: Public
 * Parameters: ID
 */

// router.put("/:id", (req, res) => {
//   const {id} = req.params;
//   const {data} = req.body;

//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//         success: false,
//         message: "User Doesn't Exists",
//     });
//   }

//   const updateUserData = users.map((each) => {
//     if(each.id === id){
//         return{
//             ...each,
//             ...data,
//         } 
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData,
//   })
// });

router.put("/:id", updateUserData);


/**
 * Route: /:id
 * Method: DELETE
 * Description: Delete the user by their id
 * Access: Public
 * Parameters: ID
 */

// router.delete("/:id", (req, res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User Doesn't Exist !!",
//         })
//     }

//     const index = users.indexOf(user);
//     users.splice(index, 1)

//     return res.status(200).json({
//         success: true,
//         message: "Deleted User.." ,
//         data: users,
//     })
// })

router.delete("/:id", deleteUser);



/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user Subscription Details
 * Access: Public
 * Parameters: ID
 */

// router.get("/subscription-details/:id", (req, res) => {
//     const { id } = req.params;
//     const user = users.find((each) => each.id === id);

//     if(!user) {
//         return res.status(404).json ({
//             success: true,
//             message: "User with the Id Didn't Exists"
//         });
//     }

//     const getDateInDays = (data = "") => {
//         let date;
//         if (data === "") {
//             date = new Date();
//         } else {
//             date = new Date(data);
//         }
//         let days = Math.floor(date / (1000 * 60 * 60 * 24));
//         return days;
//     }

//     const subscriptionType = (date) => {
//         if (user.subscriptionType === "Basic") {
//             date = date + 90;
//         } else if (user.subscriptionType === "Standard") {
//             date = date + 180;
//         } else if (user.subscriptionType === "Premium") {
//             date = date + 365;
//         }

//         return date;
//     }

//     // Jan 1 1970 UTC
//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     // console.log("returnDate" , returnDate);
//     // console.log("currentDate", currentDate);
//     // console.log("subscriptionDate", subscriptionDate);
//     // console.log("subscriptionExpiration", subscriptionExpiration);

//     const data = {
//         ...user,
//         isSubscriptionExpired: subscriptionExpiration < currentDate,
//         daysLeftForExpiration: 
//            subscriptionExpiration <= currentDate 
//             ? 0
//             : subscriptionExpiration - currentDate,
//         fine :
//             returnDate < currentDate 
//               ? subscriptionExpiration <= currentDate
//                 ? 100
//                 : 50
//             : 0,
//     };
//     return res.status(200).json({
//         success: true,
//         message: "Subscription detail for the user is:",
//         data,

//     })
// });

router.get("/subscription-details/:id", getSubscriptionDetailsById)


module.exports = router;