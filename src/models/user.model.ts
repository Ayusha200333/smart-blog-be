import mongoose, { Schema } from "mongoose";

 export enum Role{
    ADMIN = "ADMIN", 
    USER = "USER",
    AUTHOR = "AUTHOR"
 }

 export enum Status{
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
 }

 export interface Iuser extends Document{
    _id : mongoose.Types.ObjectId
    firstName: string
    LastName: string
    email:string
    password:string
    roles: Role[]
    approved:Status
 }

 const userSchema = new Schema<Iuser>({
    firstName: {type:String, required: true},
    LastName: {type:String, required: true},
    email: {type:String, unique: true,lowercase:true},
    password: {type:String, required: true},
    roles: {type:[String], enum:Object.values(Role),default:[Role.USER]},
    approved: {type:String,enum:Object.values(Status),default:Status.PENDING}
 })

 export const USER = mongoose.model<Iuser>("User",userSchema)