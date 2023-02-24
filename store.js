let users = [
    {
        user_id: "1",
        user_name: "vishal magdum",
        user_email: "vishal@gmail.com",
        mobile: "9146450564"
    }
]

let rooms = [
    {
        room_id: "R101",
        no_of_seats: 50,
        amenities: "AC, TV",
        matresses: 4,
        is_extramatreses: "No",
        price: "120 per hr"
    }
]

let bookings = [
    {
        booking_id: "bn1",
        customer_id: "1",
        customer_name: "vishal magdum",
        room_id: "R101",
        start_date: "2023-01-24",
        end_date: "2023-01-27",
        is_checked_in: true,
        is_paid: true
    },
    {
        booking_id: "bn1",
        user_id: "1",
        user_name: "abc",
        room_id: "R101",
        start_date: "2023-01-21",
        end_date: "2023-01-23",
        is_checked_in: true,
        is_paid: true
    }
]
module.exports = { users, rooms, bookings }