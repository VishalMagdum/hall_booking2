const { users, rooms, bookings } = require('./store')
const createRoom = async (req, res) => {
    if (req.body.room_id && req.body.no_of_seats && req.body.amenities && req.body.matresses && req.body.is_extramatreses && req.body.price) {
        let room = rooms.filter((e) => e.room_id === req.body.room_id)


        if (room.length === 0) {
            rooms.push(req.body)
            res.status(200).send({
                massage: "Room Added Successfully"
            })
        } else {
            res.status(400).send({
                massage: `Room ${req.body.room_id} already exists`
            })
        }
    } else {
        res.status(400).send({
            massage: "room_id, no_of_seats, amenities, matresses, is_extramatreses, and price are mandatory"
        })
    }
}

const handleBooking = async (req, res) => {
    if (!((req.body.customer_name == "" || req.body.start_date == "" || req.body.end_date == "" || req.body.room_id == ""))) {
        let booking = bookings.filter((e) => e.room_id === req.body.room_id)
        if (booking.length === 0) {
            bookings.push(req.body)
            res.status(201).send({
                massage: "Room Booked Successfully",
                data: req.body
            })
        } else {
            newStartDate = (new Date(req.body.start_date)).getTime()
            newEndDate = (new Date(req.body.end_date)).getTime()
            // console.log("booking", booking)


            // const fun = (element) => {
            //     var existingStartDate = (new Date(element.start_date)).getTime()
            //     var existingEndDate = (new Date(element.end_date)).getTime()
            //     return ((newStartDate < existingStartDate || newStartDate > existingEndDate) && (newEndDate < existingStartDate || newEndDate > existingEndDate))
            // };

            // if (booking.every(fun)) {
            //     res.status(200).send({ message: `Room ${req.body.room_id} is Booked from ${req.body.start_date} to ${req.body.end_date}` })
            // } else {
            //     alreadyBooked = booking.map(e => { e.start_date, e.end_date })
            //     console.log(alreadyBooked)
            //     res.status(400).send({
            //         message: "Room is already booked for following period",
            //     })
            // }
            var roomBooking = booking.filter((element) => {
                var existingStartDate = (new Date(element.start_date)).getTime()
                var existingEndDate = (new Date(element.end_date)).getTime()
                return (!((newStartDate < existingStartDate || newStartDate > existingEndDate) && (newEndDate < existingStartDate || newEndDate > existingEndDate)))

            })
            // console.log(roomBooking)

            if (roomBooking.length == 0) {
                bookings.push(req.body)
                res.status(200).send({
                    message: `Room ${req.body.room_id} is Booked from ${req.body.start_date} to ${req.body.end_date}`
                })

            } else {
                let alreadyBooked = []
                for (let i in bookings) {
                    obj = {
                        from: bookings[i].start_date,
                        to: bookings[i].end_date
                    }
                    alreadyBooked.push(obj)
                }
                res.status(400).send({ message: `Room ${req.body.room_id} is already Booked for follwing date`, alreadyBooked })
            }

        }

    } else {
        res.status(400).send({ message: " For bboking a room Customer Name, start date, end date, room id are required" })
    }
}


const handleBookedRoom = async (req, res, next) => {
    allRoomBookedStatus = []
    allRoom = rooms.map(e => e.room_id)

    allRoom.forEach((element) => {
        filterBookings = bookings.filter((e) => e.room_id == element)
        allRoomBookedStatus.push({
            room_id: element,
            Total_Bookings: filterBookings.length,
            Bookings: filterBookings
        })
    })
    res.status(200).send(allRoomBookedStatus)
}

const allBokking = (req, res, next) => {
    res.status(200).send(bookings)
}

module.exports = { createRoom, handleBooking, handleBookedRoom, allBokking }