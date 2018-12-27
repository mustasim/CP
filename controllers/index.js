const eventsModel = require('../models/events');


// check if string ends with any of array suffixes
function endsWithAny(suffixes, string) {
    for (let i = suffixes.length; i--; i >= 0) {
        if (string.endsWith(suffixes[i])) {
            return true;
        }
    }

    return false;
}

// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    const contextData = eventsModel.all;
    response.render('index', { contextData });
}

function neweventperson(request, response) {
    const contextData = {
    };
    response.render('neweventperson', contextData);
}

function about(request, response) {
    const people = [
        { name: 'Paul', picture: 'paul.jpeg' },
        { name: 'Mert', picture: 'mert.jpeg' },
        { name: 'Lesley', picture: 'lesley.jpg' },
        { name: 'Mac', picture: 'mac.jpeg' },
    ];
    response.render('about', { people });
}

function newevent(request, response) {
    const contextData = {
        errors: [],
    };
    if (request.method === 'POST') {
        console.log('This is a post request');
        const errors = [];
        const theEvent = request.body;
        theEvent.id = eventsModel.getMaxId() + 1;
        if (!theEvent.title || theEvent.title.length > 50) {
            errors.push('This is a bad title');
        }
        if (!theEvent.location || theEvent.location.length > 50) {
            errors.push('This is a bad location');
        }
        if (!theEvent.image || !endsWithAny(['.jpg', '.png', '.gif'], theEvent.image)) {
            errors.push('This is a bad image');
        }
        if (errors.length === 0) {
            const tempID = eventsModel.all.length;
            theEvent.id = tempID;
            theEvent.attending = [];
            theEvent.date = new Date(theEvent.year, theEvent.month,
                theEvent.day, theEvent.hour, theEvent.minute, 0);
            eventsModel.all.push(theEvent);
            return response.redirect(`/events/${tempID}`);
        }
        contextData.errors = errors;
    } else {
        console.log('This is a get request');
    }
    return response.render('neweventperson', contextData);
}

function events(request, response) {
    const event = eventsModel.getById(Number(request.params.id));
    console.log(event);
    response.render('event', { event });
}

function donate(request, response) {
    const contextData = {
    };
    response.render('donate', contextData);
}

function hashing(inputemail) {
    const crypto = require('crypto');
    const email = inputemail.toLowerCase();
    const teamNickname = 'crimson-scilence';
    const cc = crypto.createHash('sha256')
        .update(`${email}-${teamNickname}`)
        .digest('hex')
        .substring(0, 7);
    console.log(cc);
    return (cc);
}

// add attendee to event
function addattendee(request, response) {
    const contextData = {
        errors: [],
    };
    const errors = [];
    const id = Number(request.params.id);
    const theEvent = request.body;
    const event = eventsModel.getById(Number(request.params.id));
    const eventemail = theEvent.email.toLowerCase();
    if (!theEvent.email || !eventemail.endsWith('@yale.edu')) {
        errors.push('This is a bad email');
    }
    console.log('theEvent', event);
    if (errors.length === 0) {
        const confCode = hashing(theEvent.email);
        contextData.confCode = confCode;
        event.attending.push(theEvent.email.toLowerCase());
    }
    contextData.errors = errors;
    contextData.event = event;
    response.render('event', contextData);
}

module.exports = {
    index, about, newevent, events, neweventperson, donate, addattendee,
};
