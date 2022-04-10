export default interface ICrudController<entity,dto>{
    find():Promise<entity[]>,
    getOne(id:string):Promise<entity>,
    create(dto:dto):Promise<entity>,
    update(id:string,dto:dto):Promise<entity>,
    delete(id:string):Promise<entity>,
}