//create rooms
export const getRooms:string = "SELECT * FROM room"
export const getHotelId:string = "SELECT * FROM hotel WHERE hotel_id = $1"
export const getRoomById:string = "SELECT * FROM room WHERE room_id = $1"
export const deleteRoomById:string = "DELETE FROM room WHERE room_id = $1"
export const updateRoomById:string = "UPDATE room SET title = $1, price = $2, max_people = $3, description = $4, room_numbers = $5 WHERE room_id = $6"
export const addRoom ='INSERT INTO room (title,price, max_people, description, room_numbers ) VALUES($1, $2, $3, $4, $5) RETURNING *'
export const updateRoom_id:string = "SELECT * FROM room_numbers WHERE room_number_id = $1"
export const updateHotelId = 'UPDATE hotel SET rooms = array_append(rooms, $1) WHERE hotel_id = $2 RETURNING *';
export const isRoomUnique = "SELECT * FROM room WHERE room_numbers = $1"
//export const updateHotelId:string = "UPDATE hotel SET rooms = $1 WHERE hotel_id = $2"
//create room numbers
export const getRoomNumber:string = "SELECT * FROM room_numbers WHERE room_number = $1"
export const addRoomNumber ='INSERT INTO room_numbers (room_number, unavailable_date) VALUES($1, $2) RETURNING *'
export const getRoomNumbers:string = "SELECT * FROM room_numbers"
export const getRoomNumberById:string = "SELECT * FROM room_numbers WHERE room_number = $1"
export const deleteRoomNumberById:string = "DELETE FROM room_numbers WHERE room_number = $1"
export const getUpdateID:string = "SELECT * FROM room_numbers WHERE room_number_id = $1"
export const updateRoomNumberById:string = "UPDATE room_numbers SET room_number = $1, unavailable_date = $2 WHERE room_id = $3"
