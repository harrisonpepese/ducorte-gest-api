import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Cliente } from 'src/cliente/schema/cliente.schema';
import { Funcionario } from 'src/funcionario/schema/funcionarioSchema';
import { Servico } from 'src/servico/schema/servico.schema';

export type AtendimentoDocument = Atendimento & Document;
@Schema()
export class Atendimento {
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Clientes' })
   cliente:Cliente
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Funcionarios' })
   funcionario:Funcionario
   @Prop()
   data:Date
   @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Servicos' })
   servicos: Servico[]
}

export const AtendimentoSchema = SchemaFactory.createForClass(Atendimento);