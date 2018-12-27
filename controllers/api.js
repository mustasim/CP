const events = require('../models/events.js');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function eventApi(ctx) {
    const search = ctx.request.query.search;
    let listOfEvents = [];
    if (search) {
        try {
            listOfEvents = await events.getByTitle(ctx.db, search);
        } catch (e) {}
    } else {
        try {
            listOfEvents = await events.getAllEvents(ctx.db);
        } catch (e) {
            return ctx.throw(500, e);
        }
    }
    ctx.type = 'application/json; charset=utf-8';
    return ctx.body = { 'events': listOfEvents };
}

module.exports = {
    eventApi,
};
