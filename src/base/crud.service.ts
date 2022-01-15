import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export class CrudService<Type, Dto> {
    model:Model<Type & Document>
    constructor(model:Model<Type & Document>){
        this.model = model;
    }
    async create(dto:Dto):Promise<Type>{
        const criado = new this.model(dto);
        return criado.save();
    }
    async findAll():Promise<Type[]>{
        return this.model.find().exec();
    }
    async findById(id:string):Promise<Type>{
        return this.model.findOne({id:id}).exec();
    }
    async update(id:string,dto:Dto):Promise<any>{
        return this.model.updateOne({_id:id},{$set:dto}).exec();
    }
    async delete(id:string):Promise<any>{
        return this.model.deleteOne({id:id}).exec();
    }
}
