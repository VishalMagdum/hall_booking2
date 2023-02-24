const express = require('express')
const app = express()
const { users, rooms, bookings } = require('./store')
const { createRoom, handleBooking, handleBookedRoom, allBokking } = require('./controllers')
app.use(express.json())
const port = 8000

app.get('/', (req, res) => {
    res.send({ message: "welcome to Express" })
})
app.post('/create-room', createRoom)


app.post('/booking', handleBooking)

app.get('/booked-room-details', handleBookedRoom)

app.get('/all-bookings', allBokking)
app.listen(port, () => { console.log("app is listening to " + port) })