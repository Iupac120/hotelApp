export const getHotels:string = "SELECT * FROM hotel"
export const getHotelById:string = "SELECT * FROM hotel WHERE id = $1"
export const deleteHotelById:string = "DELETE FROM hotel WHERE id = $1"
export const updateHotelById:string = "UPDATE hotel SET name = $1,type = $2, address = $3, distance = $4, photos = $5, description = $6, rating = $7, rooms = $8, cheapest_price = $9, featured = $10 WHERE id = $11"
export const checkName: string= "SELECT s FROM hotel s WHERE s.email = $1"
export const addHotel ='INSERT INTO hotel (name,type, address, distance, photos, description, rating, rooms, cheapest_price, featured) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
