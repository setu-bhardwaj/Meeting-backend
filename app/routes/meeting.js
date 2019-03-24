const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth');
const meetingController = require('./../controllers/meetingController');



let setRouter = (app) =>{

    let baseUrl = `${appConfig.apiVersion}/meeting`;

    //add
    app.post(`${baseUrl}/addEvent`,auth.isAuthorized,meetingController.addEvent)

    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meetings/addEvent Add Meeting.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} title Title of the Meeting. (body params) (required)
     * @apiParam {string} description Description of the Meeting. (body params) (required)
     * @apiParam {string} startAt Start Date/Time of the Meeting. (body params) (required)
     * @apiParam {string} endsAt End Date/Time of the Meeting. (body params) (required)
     * @apiParam {string} where Loacton of the Meeting. (body params) (required)
     * @apiParam {string} createdAt Created Date/Time of Meeting. (body params) (required)
     * @apiParam {string} createdBy Created by the Admin. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
       {
    "error": false,
    "message": "event has been added successfully",
    "status": 200,
    "data": {
        "eventId": "4705tPGwF",
        "userId": "zlqH9efwP",
        "title": "Project Meeting",
        "description": "Scrum call meeting ",
        "startAt": "10/03/2019 02:00 PM",
        "endAt": "10/03/2019 03:00 PM",
        "where": "skype call",
        "color": "blue",
        "createdAt": "2019-03-10T05:00:37Z",
        "createdBy": "Happy",
        "lastModified": "Sun Mar 10 2019 10:29:59 GMT+0530 (India Standard Time)",
        "_id": "5c8499f51919a72ce0e4e331",
        "__v": 0
    }
}

   @apiErrorExample {json} Error-Response:
    *
    *error:
{
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
    */

    //get

    app.get(`${baseUrl}/getEvents/all`,auth.isAuthorized,meetingController.getAllEvents)

    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/getEvents/all Get all the meetings.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
      {
    "error": false,
    "message": "all events found",
    "status": 200,
    "data": [
        {
            "eventId": "BZ7NZbFv_",
            "userId": "zlqH9efwP",
            "title": "Project meeting3",
            "description": "meeting desc",
            "startAt": "03/12/2019 08:10 PM",
            "endAt": "03/12/2019 08:30 PM",
            "where": "delhi",
            "color": "yellow",
            "createdAt": "2019-03-12T14:33:10Z",
            "createdBy": "Admin",
            "lastModified": "Tue Mar 12 2019 19:10:04 GMT+0530 (India Standard Time)"
        },
        {
            "eventId": "TIJS11vRD",
            "userId": " ",
            "userName": " ",
            "userEmail": " ",
            "title": "userSelected",
            "description": "userSelected",
            "startAt": "2019-03-18T10:06:56.082Z",
            "endAt": "2019-03-18T10:06:58.159Z",
            "where": "userSelected",
            "color": "black",
            "createdAt": "2019-03-18T10:07:07Z",
            "createdBy": "Admin",
            "lastModified": "2019-03-18T10:07:07Z"
        },
        {
            "eventId": "zF3_aArkp",
            "userId": "zlqH9efwP",
            "userName": "Anu Bhardwaj",
            "userEmail": "anu.bh@gmail.com",
            "title": "new meetings edited",
            "description": "new meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings edited",
            "startAt": "2019-03-19T06:09:08.198Z",
            "endAt": "2019-03-19T06:09:09.936Z",
            "where": "Office",
            "color": "blue",
            "createdAt": "2019-03-18T14:37:51Z",
            "createdBy": "Admin",
            "lastModified": "2019-03-18T14:37:51Z"
        },

    ]
}
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
    */




    app.get(`${baseUrl}/getEvents/user/:userId`,auth.isAuthorized,meetingController.getAllEventsOfUser)



        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {Get} /api/v1/meetings/getEvents/user/:userId Get all the meetings of a user.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
      {
    "error": false,
    "message": "all user events found",
    "status": 200,
    "data": [
        {
            "title": "Project meeting3",
            "description": "meeting desc",
            "startAt": "03/12/2019 08:10 PM",
            "endAt": "03/12/2019 08:30 PM",
            "where": "delhi",
            "createdAt": "2019-03-12T14:33:10Z",
            "createdBy": "Admin",
            "lastModified": "Tue Mar 12 2019 19:10:04 GMT+0530 (India Standard Time)"
        },
        {
            "userName": "Anu Bhardwaj",
            "userEmail": "anu.bh@gmail.com",
            "title": "new meetings edited",
            "description": "new meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings edited",
            "startAt": "2019-03-19T06:09:08.198Z",
            "endAt": "2019-03-19T06:09:09.936Z",
            "where": "Office",
            "createdAt": "2019-03-18T14:37:51Z",
            "createdBy": "Admin",
            "lastModified": "2019-03-18T14:37:51Z"
        }
    ]
}
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}

 */

    app.get(`${baseUrl}/getEvents/email/:userEmail`,auth.isAuthorized,meetingController.getUserByEmail)

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/getEvents/email/:emailId Get all the meetings of a user via email.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
      {
    "error": false,
    "message": "user meeting found successfully",
    "status": 200,
    "data": [
        {
            "_id": "5c8fad3f3ad0153b52e9c4bd",
            "eventId": "zF3_aArkp",
            "userId": "zlqH9efwP",
            "userName": "Anu Bhardwaj",
            "userEmail": "anu.bh@gmail.com",
            "title": "new meetings edited",
            "description": "new meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings editednew meetings edited",
            "startAt": "2019-03-19T06:09:08.198Z",
            "endAt": "2019-03-19T06:09:09.936Z",
            "where": "Office",
            "color": "blue",
            "createdAt": "2019-03-18T14:37:51Z",
            "createdBy": "Admin",
            "lastModified": "2019-03-18T14:37:51Z",
            "__v": 0
        },
        {
            "_id": "5c90a00f310e7e82be89147c",
            "eventId": "V-wX_0bhq",
            "userId": "Ot7CKY7wX",
            "userName": "Anu Bhardwaj",
            "userEmail": "anu.bh@gmail.com",
            "title": "Ahsjsd",
            "description": "Ahsjsd",
            "startAt": "2019-03-19T07:52:20.023Z",
            "endAt": "2019-03-20T07:52:20.000Z",
            "where": "Skype",
            "color": "black",
            "createdAt": "2019-03-19T07:53:51Z",
            "createdBy": "Admin",
            "lastModified": "2019-03-19T07:53:51Z",
            "__v": 0
        }
    ]
}
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "AuthorizationToken Is Missing In Request",
    "status": 400,
    "data": null
}
    */

    app.get(`${baseUrl}/getEvents/event/:eventId`,auth.isAuthorized,meetingController.getSingleEvent)

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meeting/getEvents/event/:eventid Get a Single Meeting.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "event found successfully",
    "status": 200,
    "data": [
        {
            "_id": "5c8499f51919a72ce0e4e331",
            "eventId": "4705tPGwF",
            "userId": "zlqH9efwP",
            "title": "Project Meeting",
            "description": "Scrum call meeting ",
            "startAt": "10/03/2019 02:00 PM",
            "endAt": "10/03/2019 03:00 PM",
            "where": "skype call",
            "color": "blue",
            "createdAt": "2019-03-10T05:00:37Z",
            "createdBy": "Happy",
            "lastModified": "Sun Mar 10 2019 10:29:59 GMT+0530 (India Standard Time)",
            "__v": 0
        }
    ]
}
   @apiErrorExample {json} Error-Response:
    *
	{
		"error": true,
		"message": "no events found",
		"status": 404,
		"data": null
	}

    */

    app.get(`${baseUrl}/getEvents/date/byDate`,auth.isAuthorized,meetingController.getAllEventsByDate)

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meeting/getEvents/date/byDate Get a Single Meeting by Date.
     *
     * @apiParam {string} authToken Authentication Token. (params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} startAt Meeting Date. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "all details found successfully",
    "status": 200,
    "data": [
        {
            "_id": "5c8498b250ebd04f3054b41a",
            "eventId": "IrqF09ECn",
            "userId": "zlqH9efwP",
            "title": "Project Meeting",
            "description": "Scrum call meeting ",
            "startAt": "10/03/2019 02:00 PM",
            "endAt": "Sun Mar 10 2019 10:24:40 GMT+0530 (India Standard Time)",
            "where": "skype call",
            "color": "blue",
            "createdAt": "1552193714835",
            "createdBy": "Happy",
            "lastModified": "Sun Mar 10 2019 10:24:40 GMT+0530 (India Standard Time)",
            "__v": 0
        }
    ]
}
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "no events found",
    "status": 404,
    "data": null
}

    */

    //edit

    app.put(`${baseUrl}/editEvent/:eventId`,auth.isAuthorized,meetingController.editEvent)

        /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {put} /api/v1/meeting/editEvent/:eventid Modify a Meeting.
     *
	 * @apiParam {string} authToken Authentication Token. (params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} title Title of the Meeting. (body params) (required)
     * @apiParam {string} description Description of the Meeting. (body params) (required)
     * @apiParam {string} startAt Start Date/Time of the Meeting. (body params) (required)
     * @apiParam {string} endsAt End Date/Time of the Meeting. (body params) (required)
     * @apiParam {string} where Loacton of the Meeting. (body params) (required)
     * @apiParam {string} createdAt Created Date/Time of Meeting. (body params) (required)
     * @apiParam {string} createdBy Created by the Admin. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{
    "error": false,
    "message": "Event successfully updated",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "no events found",
    "status": 404,
    "data": null
}

    */

    //delete
    app.post(`${baseUrl}/deleteEvent/:eventId`,auth.isAuthorized,meetingController.deleteEvent);

    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/deleteEvent/:eventid Delete a Meeting.
     *
	 * @apiParam {string} eventid eventid of the meeting. (params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
{{
    "error": false,
    "message": "event deleted successfully",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1
    }
}	
   @apiErrorExample {json} Error-Response:
    *
{
    "error": true,
    "message": "No event found",
    "status": 404,
    "data": null
}


    */
    //sending Reminders
    app.post(`${baseUrl}/adminR/sentReminders`, auth.isAuthorized, meetingController.sendReminderForTodaysMeetings);

     /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meetings/admin-meetings/sentReminders Sending reminders.
     *
     * @apiParam {string} userId userId of the User. (body params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {  
            "error": false,
            "message": "Meetings Found and reminders sent",
            "status": 200,
            "data": null
        }
    */
}//setRouter

module.exports = {
    setRouter:setRouter
}
