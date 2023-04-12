const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Swal = require('sweetalert2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoURL = 'mongodb+srv://goutamv1503:pArTh1503@cluster0.bz1zhhr.mongodb.net/?retryWrites=true&w=majority';
// import fs from 'fs';
const fs = require('fs')
// import admin from 'firebase-admin';
const admin = require('firebase-admin')

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

// using this we can easily find the data is tempered or not and if done we can get to know by using the 3rd part that is returned by authToken
const JWT_SECRET = 'BlockchainbasedeVoting'

app.use(cors())

const port = 5000;
app.use(express.json());

app.use(async (res, req, next) => {
    const { authToken } = req.header;

    if (authToken) {
        try {
            req.user = await admin.auth().verifyIdToken(authToken)
        } catch (e) {
            res.sendStatus(400);
        }
    }
    next();
})

mongoose.connect(mongoURL, {
    useNewUrlParser: true
}).then(() => { console.log('Connected to database'); })
    .catch(e => console.log(e));

app.listen(port, () => {
    console.log('Server Started');
})

app.post('/post', async (req, res) => {
    console.log(req.body);
    const { data } = req.body;

    try {
        if (data == 'Goutam') {
            res.send('ok')
        } else {
            res.send('User not found')
        }
    } catch (error) {
        res.send('Something went wrong! 🥲🥲🥲')
    }
});

require('./userDetails');

const User = mongoose.model('UserInfo');

app.post('/register', async (req, res) => {
    // const voted = false;
    const { name, id, dob, pass, conPass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(pass, salt);
    const secconPass = await bcrypt.hash(conPass, salt);
    try {
        const oldUser = await User.findOne({ id });
        if (oldUser) {

            // alert("User already exists!");
            return window.alert("User already exists")

        }
        if (secPass === secconPass) {
            await User.create({
                name, id, dob, pass: secPass, conPass: secconPass
            });
            res.send("Successful Registration")
        } else {
            return res.send("Password doesn't match");
        }
    } catch (error) {
        res.send(error)
    }
});

app.post('/login', async (req, res) => {
    const { id, pass } = req.body;

    const user = await User.findOne({ id });

    if (!user) {

        Swal.fire('Error',
            'User already exists!',
            'error'
        )
        // window.alert("User already exists!");
        return res.send("User not found")

    }
    if (await bcrypt.compare(pass, user.pass)) {
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            // console.log(token);
            return res.json({ data: token });
        } else {
            return res.json({ error: 'error' });
        }
    }
    res.json({ error: 'Invalid Password' });
})

require('./adminDetails')

const Admin = mongoose.model('AdminInfo')

app.post('/admin', async (req, res) => {
    const { id, pass } = req.body;

    const user = await Admin.findOne({ id });

    if (!user) {

        Swal.fire('Error',
            'User already exists!',
            'error'
        )
        // alert("User already exists!");
        return res.send("Invalid Admin")

    }
    if (await bcrypt.compare(pass, user.pass)) {
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            // console.log(token);
            return res.json({ data: token });
        } else {
            return res.json({ error: 'error' });
        }
    }
    res.json({ error: 'Invalid Password' });
})

require('./addCandidates');

const Candidate = mongoose.model('CandidateInfo');

app.post('/addCandidate', async (req, res) => {
    const { name, partyname } = req.body;

    try {
        const oldCandidate = await Candidate.findOne({ partyname });
        if (!oldCandidate) {
            await Candidate.create({
                name, partyname
            });

            // windows.alert("User already exists!");
            Swal.fire('Any fool can use a computer')
            res.send("Successful Registration")

        } else {
            console.log('Candidate already exists!');
            return (
                res.send("Candidate already exists")
                // window.alert('Candidate already exists!')
            )

        }
    } catch (error) {

        res.send(error)
    }
});

app.get('/getAllCandidate', async (req, res) => {
    try {
        const allCandidate = await Candidate.find({});
        res.send({ data: allCandidate });
    } catch (error) {
        console.log(error);
    }
})

// app.get('/getUser', async (req, res) => {
//     try {
//         const user = await User.find({});
//         res.send({ data: user });
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.delete('/deleteCandidate:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deleteCandidate = await Candidate.findByIdAndDelete(id);
//         if(!id) {
//             return res.status(400).send()
//         }
//         res.send(deleteCandidate);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

app.delete('/deleteCandidate', async (req, res) => {
    const { candidateId } = req.body;
    try {
        Candidate.deleteOne({ _id: candidateId }, (err, res) => {
            alert(err);
        });
        res.send({ data: 'Deleted' })
    } catch (error) {
        console.log(error);
    }
})

// require('./adminDetails');

// const Admin = mongoose.model('AdminInfo');

// app.post('/admin', async (req, res) => {
//     const { name, id, dob, pass, conPass } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const secPass = await bcrypt.hash(pass, salt);
//     const secconPass = await bcrypt.hash(conPass, salt);
//     try {
//         const oldUser = await Admin.findOne({ id });
//         if (oldUser) {

//             Swal.fire('Error',
//                 'User already exists!',
//                 'error'
//             )
//             // alert("User already exists!");
//             return res.send("User already exists")

//         }
//         if (secPass === secconPass) {
//             await Admin.create({
//                 name, id, dob, pass: secPass, conPass: secconPass
//             });
//             Swal.fire('Success',
//                 'Successful Registration',
//                 'success'
//             )
//             res.send("Successful Registration")
//         } else {
//             return res.send("Password doesn't match");
//         }
//     } catch (error) {

//         res.send(error)
//     }
// });