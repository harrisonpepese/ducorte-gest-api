import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dayjs } from 'dayjs';
import { Document } from 'mongoose';
import { Cliente } from 'src/cliente/schema/cliente.schema';
import { Funcionario } from 'src/funcionario/schema/funcionarioSchema';
import { Servico } from 'src/servicos/schema/servico.schema';

export type AgendamentoDocument = Agendamento & Document;
@Schema()
export class Agendamento {
   @Prop()
   cliente:Cliente
   @Prop()
   funcionario:Funcionario
   @Prop()
   horario:Dayjs
   @Prop()
   servicos: Servico[]
}

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);