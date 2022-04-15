import { ListDto } from "../list.dto";

export default interface IListDtoController{
    list(filter:string,limit:number):Promise<ListDto>
}