const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const socketLib = require('../libs/socketLib')
const nodeLib = require('../libs/nodemailerLib')


/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const EventModel = mongoose.model('Event');


let addEvent = (req, res) => {

    if (!req.body) {
        let apiResponse = response.generate(true, 'no information been passed', 500, null);
        res.send(apiResponse)
    } else {
        var today = Date.now()
        let newEvent = new EventModel({

            eventId: shortid.generate(),
            userId: req.body.userId,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            title: req.body.title,
            description: req.body.description,
            startAt: req.body.startAt,
            endAt: req.body.endAt,
            where: req.body.where,
            color: req.body.color,
            createdAt: time.now(),
            createdBy: req.body.createdBy,
            lastModified: time.now() // req.body.lastModified

        })

        newEvent.save((err, result) => {
            delete result.__v
            delete result._id
            if (err) {

                let apiResponse = response.generate(true, 'error occured while saving the event', 500, null);
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                let apiResponse = response.generate(true, 'no result found', 404, null);
                res.send(apiResponse)

            } else {

                delete result.__v
                delete result._id
                let apiResponse = response.generate(false, 'event has been added successfully', 200, result)
                res.send(apiResponse)
            }

        })//new event save

    }
}//addEvent


let getAllEvents = (req, res) => {
    EventModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'error occured in finding all event', 500, null);
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'all event not found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'all events found', 200, result);
                res.send(apiResponse)
            }
        })
}// end get all meetings



let getAllEventsOfUser = (req, res) => {

    EventModel.find({ userId: req.params.userId })
        .select('-__v -_id -eventId -userId -color')
        .lean()
        .exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'error occured in finding event', 500, null);
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'user event not found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'all user events found', 200, result);
                res.send(apiResponse)
            }
        })
} //getAllEvents of user

let getSingleEvent = (req, res) => {


    EventModel.find({ eventId: req.params.eventId })
        .lean()
        .exec((err, result) => {
            // console.log(eventId)
            if (err) {
                let apiResponse = response.generate(true, 'error occured in finding', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'no events found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'event found successfully', 200, result)
                res.send(apiResponse);
            }
        })

}// get single event

//get UserByEmail

let getUserByEmail = (req, res) => {

    console.log("new request")
    EventModel.find({ userEmail: req.params.userEmail })
        .lean()
        .exec((err, result) => {
            // console.log(userEmail)
            if (err) {
                let apiResponse = response.generate(true, 'error occured in finding', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'no events found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'user meeting found successfully', 200, result)
                res.send(apiResponse);
            }
        })

}// getUserByEmail










let getAllEventsByDate = (req, res) => {

    console.log(req.body)
    EventModel.find({ $or: [{ userId: req.body.userId, startAt: req.body.startAt }, { userId: req.body.userId, endAt: req.body.endAt }] })

        // EventModel.find({  $or:[ {userId:req.body.userId,startAt:new Date(req.body.startAt)} , {userId:req.body.userId,endAt:new Date(req.body.endAt)} ]   })
        .lean()
        .exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'error occured in finding', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'no events found', 404, null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'all details found successfully', 200, result)
                res.send(apiResponse);
            }
        })

}// get all events by date

let editEvent = (req, res) => {
    let options = req.body
    // console.log(req.params)
    // console.log(req.body)
    EventModel.update({ eventId: req.params.eventId }, options, { multi: true })
        .exec((err, result) => {
            console.log(result)
            if (err) {
                let apiResponse = response.generate(true, 'error occured in updating', 500, null)
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'No event Found', null);
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Event successfully updated', 200, result)
                res.send(apiResponse);
            }

        })
} //edit event

let deleteEvent = (req, res) => {

    EventModel.remove({ eventId: req.params.eventId })
        .exec((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'error while deleting', 500, null);
                res.send(apiResponse);
            } else if (result.n == 0) {
                let apiResponse = response.generate(true, 'No event found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'event deleted successfully', 200, result);
                res.send(apiResponse);
            }

        })
}






let sendReminderForTodaysMeetings = (req, res) => {

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'userId': req.body.userId })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Meeting Controller: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'Meeting  Controller:v')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)
                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findMeetings = (userDetails) => {
        return new Promise((resolve, reject) => {
            if (userDetails.userType != 'normal') {
                MeetingModel.find({ 'userId': req.body.userId })
                    .select()
                    .lean()
                    .exec((err, meetingDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'Meeting Controller: findMeetings', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                            reject(apiResponse)
                        } else if (check.isEmpty(meetingDetails)) {
                            logger.info('No Meeting Found', 'Meeting  Controller:findMeetings')
                            let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                            reject(apiResponse)
                        } else {
                            let i = 0;
                            for (let meeting of meetingDetails) {
                                if (time.isSameDayAsToday(meeting.meetingStartDate)) {

                                    let mailDetails = {
                                        receiver: meeting.userEmail,
                                        subject: 'Meeting Reminder',
                                        html: `<p>Hi,</p> <p> Meeting Reminder. Kindly check your dashboard calender for details. </p><br><p>Regards:</p><p>Meeting planner team</p>`
                                    }

                                }
                                i += 1;

                                setTimeout(() => {
                                    nodeLib.sendMail(mailDetails);
                                }, 2000);

                            }

                        }
                        if (i > 0) {
                            let apiResponse = response.generate(false, 'Meetings Found and sent reminders', 200, null)

                            resolve(apiResponse)

                        }
                        else {
                            let apiResponse = response.generate(true, 'No Meetings Today', 404, null)

                            reject(apiResponse)

                        }

                    })
            }
        })

    }//find meetings   

    findUserDetails(req, res)
        .then(findMeetings)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end sent reminder fn 



module.exports = {
    addEvent: addEvent,
    getAllEvents: getAllEvents,
    getAllEventsOfUser: getAllEventsOfUser,
    getSingleEvent: getSingleEvent,
    getAllEventsByDate: getAllEventsByDate,
    getUserByEmail: getUserByEmail,

    editEvent: editEvent,
    deleteEvent: deleteEvent,
    sendReminderForTodaysMeetings: sendReminderForTodaysMeetings
}