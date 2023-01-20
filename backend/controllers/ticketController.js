const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


//@desc Get user tickets
//@route Get /api/tickets
//@access Private
const getTickets = asyncHandler( async(req, res) =>{
    // get user using the id and jwt
    const user = await User.findById()
    res.status(200).json({message: 'getTickets'})
})

//@desc Create new ticket
//@route POST /api/tickets
//@access Private
const createTicket = asyncHandler( async(req, res) =>{
    res.status(200).json({message: 'createTickets'})
})

module.exports = {
    getTickets,
    createTicket
}