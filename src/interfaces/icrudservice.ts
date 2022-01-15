export default interface ICrudService<T,M>{
    create(dto:M):Promise<T>
    update(id:string,dto:M):Promise<T>
    findById(id:string):Promise<T>
    findAll():Promise<T[]>
    delete(id:string):Promise<T>
}