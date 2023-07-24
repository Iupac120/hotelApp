import { number } from "zod"

export interface HotelDocument {
	name:string
	type:string
	address:string
	distance:string
	photos:string
	description:string
	rating:number
	rooms:string 
	cheapest_price:number
	featured:Boolean
}