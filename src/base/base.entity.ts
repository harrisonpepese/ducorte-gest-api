import { Prop } from "@nestjs/mongoose";

export default abstract class BaseEntity{
    @Prop()
    _id:string
}