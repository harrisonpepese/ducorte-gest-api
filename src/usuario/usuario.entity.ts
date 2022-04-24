import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Funcionario } from 'src/funcionario/funcionario.entity';

export type UsuarioDocument = Usuario & Document;
@Schema()
export class Usuario extends Document{
    @Prop()
    @AutoMap()
    username:string
    @Prop()
    password: string
    @Prop()
    @AutoMap()
    email:string
    @Prop()
    @AutoMap()
    isOnline:boolean
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Funcionario.name })
    @AutoMap()
    funcionario:Funcionario | undefined
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);