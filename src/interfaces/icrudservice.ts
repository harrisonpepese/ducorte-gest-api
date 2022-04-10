export default interface ICrudService<entity,model>{
    create(dto:model):Promise<entity>
    update(id:string,dto:model):Promise<entity>
    findById(id:string):Promise<entity>
    find():Promise<entity[]>
    delete(id:string):Promise<entity>
}