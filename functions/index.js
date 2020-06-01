const functions = require('firebase-functions');
const admin = require('firebase-admin')
const moment = require('moment');
//const _ = require('lodash');
const nodemailer = require('nodemailer')

//INITIALIZE FIREBASE CLOUD FUNCTIONS
//admin.initializeApp(functions.config().firebase)
admin.initializeApp()

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alpeshk98@gmail.com',
        pass: 'masai786'
    }

    // host : 'smtp.gmail.com',
    // port : 465,
    // secure : true,
    // auth : {
    //     user : 'alpeshk98@gmail.com',
    //     pass : 'masai786'
    // }
})


exports.newUser = functions.firestore
    .document('users/{userID}')
    .onCreate((snap, context) => {
      
        const user = snap.data()

        const fname = user.fname
        const lname = user.lname
        const company = user.company
        const city = user.city
        const department = user.department
        const buttonText = 'Go to SMO'
    
    let mailOptions = {
        from : '"SMO" <smo@gmail.com>',
        to : 'achavda@osborn-eng.com',
        subject : "New user joined SMO",
        //html : template
        html : `<b>Dear Admin,</b>

                <p>New member <b>${fname} ${lname}</b> has joined <b>${company}</b>, ${city} in the <b>${department}</b> department.</p>
                <p>Please verify and approve account.</p>
                <p>
                    <button style="padding: 8px 10px 8px 10px; color: #fff; font-size: 14px; background-color: #F7761F; border:solid #b3cccc 3px; border-radius: 18px;" onclick="location.href='www.sign-me-out.com'" >
                        ${buttonText}
                    </button>
                </p>

                <p>
                <b>SMO</b>
                </p>`
    }

    return mailTransport.sendMail(mailOptions)
                        .then(() =>console.log('New User Email sent'))
                        .catch(error =>console.log(error))

      // perform desired operations ...
})//NEW USER

exports.userApproved = functions.firestore
    .document('users/{userID}')
    .onUpdate((snap, context) => {
        
        const before = snap.before.data()
        const after = snap.after.data()
        const fname = before.fname
        const email = before.email
        const company = before.company

        if(before.verified == false && after.verified == true){
            let mailOptions = {
                from : '"SMO" <smo@gmail.com>',
                to : email,
                subject : "SMO Account Approved",
                html : `<b>Dear ${fname},</b>
        
                        <p>${company} administration has approved your account.</p>
                        <p>You can now <b><a href="www.sign-me-out.com"> login</a></b></p>
                       
                        <p>
                        <b>SMO</b>
                        </p>`
            }
        
            return mailTransport.sendMail(mailOptions)
                                .then(() =>console.log('Approval Email sent'))
                                .catch(error =>console.log(error))

        }//SEND EMAIL IF ACCOUNT IS APPROVED

    })


    exports.userExpired = functions.firestore
    .document('users/{userID}')
    .onUpdate((snap, context) => {
        
        const before = snap.before.data()
        const after = snap.after.data()
        const fname = before.fname
        const email = before.email
        const company = before.company

        if(before.verified == false && after.verified == true){
            let mailOptions = {
                from : '"SMO" <smo@gmail.com>',
                to : email,
                subject : "SMO Account Approved",
                html : `<b>Dear ${fname},</b>
        
                        <p>${company} administration has approved your account.</p>
                        <p>You can now <b><a href="www.sign-me-out.com"> login</a></b></p>
                       
                        <p>
                        <b>SMO</b>
                        </p>`
            }
        
            return mailTransport.sendMail(mailOptions)
                                .then(() =>console.log('Approval Email sent'))
                                .catch(error =>console.log(error))

        }//SEND EMAIL IF ACCOUNT IS APPROVED

    })
