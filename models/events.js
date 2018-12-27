'use strict';

/**
 * An Array of all the events
 */
const allEvents = [
    {
        id: 0,
        title: 'Mac\'s Rave Party',
        // Note that JavaScript months are zero-indexed,
        // so, month zero is January. This is Jan 17th
        // 2018 at 4:30pm local time.
        date: new Date(2016, 0, 17, 16, 30, 0),
        image: '/static/img/dancy.gif',
        location: 'SOM',
        attending: ['paul.bashir@yale.edu', 'clark.kent@yale.edu'],
    },
    {
        id: 1,
        title: 'Meet Lesley',
        date: new Date(2017, 8, 1, 19, 0, 0),
        image: '/static/img/meet.jpg',
        location: 'Lesley\'s house',
        attending: ['mert.turkben@yale.edu', 'kim.kardashian@yale.edu'],
    },
    {
        id: 2,
        title: 'Cook with Mert',
        date: new Date(2017, 12, 20, 18, 0, 0),
        image: '/static/img/cook.gif',
        location: 'Charlie\'s place',
        attending: ['donald.duck@yale.edu'],
    },
];


/**
 * Returns the first event that has a particular id.
 */
function getById(id) {
    for (let i = 0; i < allEvents.length; i += 1) {
        if (id === allEvents[i].id) {
            return allEvents[i];
        }
    }
    return null;
}

function getMaxId(id) {
    let maxID = null;
    for (let i = 0; i < allEvents.length; i += 1) {
        if (!maxID || allEvents[i].id > maxID) {
            maxID = allEvents[i];
        }
    }
    return maxID;
}

function getAllEvents(ctx) {
    let listOfEvents = [];
    for (let i = 0; i < allEvents.length; i += 1) {
        listOfEvents.push(allEvents[i]);
    }
    return listOfEvents;
}

function getByTitle(ctx, search) {
    let listOfEvents = [];
    for (let i = 0; i < allEvents.length; i += 1) {
        if (allEvents[i].name.includes(search)) {
            listOfEvents.push(allEvents[i]);
        }
    }
    return listOfEvents;
}

module.exports = {
    all: allEvents,
    getById,
    getMaxId,
    getAllEvents,
    getByTitle,
};
