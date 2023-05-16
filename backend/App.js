const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const admin = require('firebase-admin')

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


app.use(cors())

const port = 5001;
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
            res.send("Successful Registration")
        } else {
            console.log('Candidate already exists!');
            return (
                res.send("Candidate already exists")
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

app.delete('/deleteCandidate/:id', (req, res) => {
    console.log(req.params);
    Candidate.findByIdAndDelete({_id: req.params.id})
    .then(doc => console.log(doc))
    .catch(err => console.log(err))
})

app.post('/vote/:id', async (req, res) => {
    // console.log(req.params);
    
    await Candidate.updateOne({ _id: req.params.id },
        {
            $inc: { "votes": 1 }
        },
        { new: true },
        (err, doc) => {
            if(doc == null) {
                const newval = new Candidate({_id: req.params.id, votes: 1})
                newval.save()
            }
        }
    )})

require('./adminDetails');

app.post('/admin/register', async (req, res) => {
    const { name, id, dob, pass, conPass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(pass, salt);
    const secconPass = await bcrypt.hash(conPass, salt);
    try {
        const oldUser = await Admin.findOne({ id });
        if (oldUser) {

            Swal.fire('Error',
                'User already exists!',
                'error'
            )
            // alert("User already exists!");
            return res.send("User already exists")

        }
        if (secPass === secconPass) {
            await Admin.create({
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