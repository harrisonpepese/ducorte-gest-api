import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import ICrudService from "src/interfaces/service/icrudservice";

export class CrudService<entity, dto> implements ICrudService<entity,dto> {
    model:Model<entity & Document>
    constructor(model:Model<entity & Document>){
        this.model = model;
    }
    async find(): Promise<entity[]> {
        return this.model.find().exec();
    }
    async create(dto:dto):Promise<entity>{
        const criado = new this.model(dto);
        return criado.save();
    }
    async findById(id:string):Promise<entity>{
        const entity = this.model.findById(id).exec();
        return entity;
    }
    async update(id:string,dto:dto):Promise<any>{
        return this.model.updateOne({_id:id},{$set:dto}).exec();
    }
    async delete(id:string):Promise<any>{
        return this.model.deleteOne({_id:id}).exec();
    }
}
