const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
    //console.log(`${appConfig.apiVersion}/users`);

    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
  
    /**
    * @api {post} /api/v1/users/signup Signup.
    * @apiVersion  1.0.0
    * @apiGroup Users
    * @apiParam {string} firstName firstName of the user. (body params) (required)
    * @apiParam {string} lastName lastName of the user. (body params) (required)
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} countryCode countryCode of the user. (body params) (required)
    * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * 
    * 
    * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "userId": "l9EHju_qY",
        "userType": "normal",
        "firstName": "Happy",
        "lastName": "Singh",
        "email": "happy44@gmail.com",
        "countryCode": "+91",
        "mobileNumber": 7845454545,
        "createdOn": "2019-03-19T09:18:08.000Z",
        "PasswordResetToken": "",
        "PasswordResetExpiration": "",
        "_id": "5c90b3d02dde1cea58391be9",
        "__v": 0
    }
}


   @apiErrorExample {json} Error-Response:
    *
    * {
       "error": true,
       "message": "One or More Parameter(s) is missing",
       "status": 400,
       "data
    }
    
   */

    app.post(`${baseUrl}/login`, userController.loginFunction);


    /**
      * @apiGroup Users
      * @apiVersion  1.0.0
      * @api {post} /api/v1/users/login Login.
      *
      * @apiParam {string} email email of the user. (body params) (required)
      * @apiParam {string} password password of the user. (body params) (required)
      *
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkFNd29Wek1ERyIsImlhdCI6MTU1Mjk5MDI4NDMwMCwiZXhwIjoxNTUzMDc2Njg0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6Imw5RUhqdV9xWSIsInVzZXJUeXBlIjoibm9ybWFsIiwiZmlyc3ROYW1lIjoiSGFwcHkiLCJsYXN0TmFtZSI6IlNpbmdoIiwiZW1haWwiOiJoYXBweTQ0QGdtYWlsLmNvbSIsImNvdW50cnlDb2RlIjoiKzkxIiwibW9iaWxlTnVtYmVyIjo3ODQ1NDU0NTQ1LCJQYXNzd29yZFJlc2V0VG9rZW4iOiIiLCJQYXNzd29yZFJlc2V0RXhwaXJhdGlvbiI6IiJ9fQ.B1dducsAkFmZ6WpfqLdJRBdKg4PsQQdHoSeCrrs5iaY",
        "userDetails": {
            "userId": "l9EHju_qY",
            "userType": "normal",
            "firstName": "Happy",
            "lastName": "Singh",
            "email": "happy44@gmail.com",
            "countryCode": "+91",
            "mobileNumber": 7845454545,
            "PasswordResetToken": "",
            "PasswordResetExpiration": ""
        }
    }
}
     @apiErrorExample {json} Error-Response:
      *
      * {
     "error": true,
     "message": "Password not entered.Login Failed",
     "status": 400,
     "data": null
 }
 
     */

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    /**
   * @api {post} /api/v1/users/logout Logout
   * @apiVersion  1.0.0
   *  @apiGroup Users
   *
   * @apiParam {string} userId userId of the user. (auth headers) (required)
   * @apiParam {string} Authorization Authorization of the user. (body params) (required)  
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
       {
  "error": false,
  "message": "Logged Out Successfully",
  "status": 200,
  "data": null
}


      @apiErrorExample {json} Error-Response:
   *
   * {
  "error": true,
  "message": "AuthorizationToken Is Missing In Request",
  "status": 400,
  "data": null
}

  */
 
 app.post(`${baseUrl}/findUser`, userController.findUserViaEmail);

    /**
    * @api {post} /api/v1/users/findUser Finding User By Email
    * @apiVersion 1.0.0  
    * @apiGroup UserDetails
    * @apiParam {string} email email of the user. (body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    
    {
    "error": false,
    "message": "User Details Found",
    "status": 200,
    "data": [
        {
            "userId": "l9EHju_qY",
            "userType": "normal",
            "firstName": "Happy",
            "lastName": "Singh",
            "email": "happy44@gmail.com",
            "countryCode": "+91",
            "mobileNumber": 7845454545,
            "createdOn": "2019-03-19T09:18:08.000Z",
            "PasswordResetToken": "",
            "PasswordResetExpiration": ""
        }
    ]
}
            
    * @apiErrorExample {json} Error-Response:
    *
    * {
   "error": true,
   "message": "No User Found",
   "status": 404,
   "data": null
}
   */


    app.get(`${baseUrl}/view/allUsers`, auth.isAuthorized, userController.getAllNormalUsers);


    /**
    * @apiGroup UserDetails
    * @apiVersion  1.0.0
    * @api {get} /api/v1/users/view/allUsers Get all Normal User details.
    *
    * @apiParam {string} Authorization Authorization of the user. (header params) (required)  
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
    "error": false,
    "message": "All normal User Details Found",
    "status": 200,
    "data": [
        {
            "userId": "Ot7CKY7wX",
            "userType": "normal",
            "firstName": "Anu",
            "lastName": "Bhardwaj",
            "password": "$2b$10$olE0wI7uiGlGM7z2v9D75eMu5T.jJ8xejchQzXknhE7.G/y6eQxCC",
            "email": "anu.bh@gmail.com",
            "countryCode": "91",
            "mobileNumber": 0,
            "createdOn": "2019-03-12T14:07:44.000Z",
            "PasswordResetToken": "",
            "PasswordResetExpiration": ""
        },
        {
            "userId": "l9EHju_qY",
            "userType": "normal",
            "firstName": "Happy",
            "lastName": "Singh",
            "password": "$2b$10$tv5wMgK03iUSiQwHIprGPeqDwEpeBVUkyFOU3N/Ksb60niQiukBi6",
            "email": "happy44@gmail.com",
            "countryCode": "+91",
            "mobileNumber": 7845454545,
            "createdOn": "2019-03-19T09:18:08.000Z",
            "PasswordResetToken": "",
            "PasswordResetExpiration": ""
        }
    ]
}

    * @apiErrorExample {json} Error-Response:
    *
Error:
{
   "error": true,
   "message": "AuthorizationToken Is Missing In Request",
   "status": 400,
   "data": null
}

   */

    // getting single user info
    app.get(`${baseUrl}/:userId/userDetails`, auth.isAuthorized, userController.getSingleUser);


    /**
    * @apiGroup UserDetails
    * @apiVersion  1.0.0
    * @api {get} /api/v1/users/:userId/userDetails Get Single user details.
    *
    * @apiParam {string} userId userId of the user. (header params) (required)
    * @apiParam {string} Authorization Authorization of the user. (header params) (required)  
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "User Details Found",
    "status": 200,
    "data": {
        "userId": "l9EHju_qY",
        "userType": "normal",
        "firstName": "Happy",
        "lastName": "Singh",
        "email": "happy44@gmail.com",
        "countryCode": "+91",
        "mobileNumber": 7845454545,
        "createdOn": "2019-03-19T09:18:08.000Z",
        "PasswordResetToken": "",
        "PasswordResetExpiration": ""
    }
}


    * @apiErrorExample {json} Error-Response:
    *
    * 
Error:
{
   "error": true,
   "message": "No User Found",
   "status": 404,
   "data": null
}


   */

   


    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser);

    /**
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:userId/edit Editing the User details.
     *
     * @apiParam {string} userId userId of the user. (params) (required)
     * @apiParam {string} Authorization Authorization of the user. (header params) (required)  
     *   @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
	 * @apiParam {string} countryCode countryCode of the user. (body params) (required)
     * @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "User details edited",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}


     * @apiErrorExample {json} Error-Response:
	 *
	 * {
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
    */


    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser);

    /**
   * @apiGroup Users
   * @apiVersion 1.0.0
   * @api {get} /api/v1/users/:userId/delete Delete
   *
   * @apiParam {string} userId userId of the user. (params) (required)
   * @apiParam {string} Authorization Authorization of the user. (header params) (required)  
   *
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "Deleted the user successfully",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1
    }
}

   * @apiErrorExample {json} Error-Response:
   *
   * {
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
  */


    app.get(`${baseUrl}/verify/:token`,userController.findUserUsingPassswordResetToken)

    /**
     * @apiGroup UserDetails
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/verify/:token Get user details using password reset token.
     * @apiParam {string} password reset token. (params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "user verified",
    "status": 200,
    "data": [
        {
            "userId": "4tb7KXEXx",
            "userType": "normal",
            "firstName": "happy",
            "lastName": "Singh",
            "email": "happy444@gmail.com",
            "countryCode": "91",
            "mobileNumber": 0,
            "createdOn": "2019-03-19T11:15:47.000Z",
            "PasswordResetToken": "1QrpzWjv5",
            "PasswordResetExpiration": "2019-03-20T11:27:00.094Z"
        }
    ]
}

* @apiErrorExample {json} Error-Response:
   *
   * {
    "error": true,
    "message": "no user found",
    "status": 404,
    "data": null
}


*/

app.post(`${baseUrl}/update`,userController.update)

    /**
     * @apiGroup UserDetails
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/update Update the password reset token .
     * @apiParam {string} email Email of the User. (body params) (required)
     * @apiParam {string} PasswordResetToken PasswordResetToken generated. (params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "details update successfully",
    "status": 200,
    "data": {
        "userId": "l9EHju_qY",
        "userType": "normal",
        "firstName": "Happy",
        "lastName": "Singh",
        "password": "happy@123",
        "email": "happy44@gmail.com",
        "countryCode": "+91",
        "mobileNumber": 7845455586,
        "createdOn": "2019-03-19T09:18:08.000Z",
        "PasswordResetToken": "1QrpzWjv5",
        "PasswordResetExpiration": "",
        "_id": "5c90b3d02dde1cea58391be9",
        "__v": 0
    }
}

* @apiErrorExample {json} Error-Response:
   *
   * {
    "error": true,
    "message": "no user details found with this email address",
    "status": 404,
    "data": null
}
*/



app.post(`${baseUrl}/updatePassword`,userController.updatePassword)

    /**
     * @apiGroup UserDetails
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/updatePassword Update the new password.
     * @apiParam {string} password New Password. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "details update successfully",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}

*/



}

module.exports = {
    setRouter: setRouter
}
