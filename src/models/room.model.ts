export interface RoomNumberDocument {
    numbers:number
    unavailable_date:Date 

}

export interface RoomDocument {
    title: string
    price:number 
    max_people: number
    description: string 
    room_numbers:  RoomNumberDocument 
}