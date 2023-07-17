//import {DocumentDefinition} from 'mongoose';
import { omit } from 'lodash';
import UserModel, {UserDocument} from '../models/user.model';
import { FilterQuery } from 'mongoose';
import sessionModel, { SchemaDocument } from '../models/session.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createdAt" |"updatedAt"|"comparePassword">>) {
    try {
        const user = await UserModel.create(input)
        return omit(user.toJSON(),"password")
    } catch (e:any) {
        throw new Error(e)
    }
}

export async function validatePassword({email,password}:{email:string,password:string}) {
    const user = await UserModel.findOne({email})
    if(!user){
        return false
    }
    const isValid = await user.comparePassword(password)
    if(!isValid) return false;

    return omit(user.toJSON(),"password")
}

export async function findSesssions(query:FilterQuery<SchemaDocument>){
    return sessionModel.find(query).lean();
}