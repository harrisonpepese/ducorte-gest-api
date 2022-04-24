export default interface ICrudController<entity, dto> {
  find(): Promise<dto[]>;
  getOne(id: string): Promise<dto>;
  create(dto: entity): Promise<dto>;
  update(id: string, dto: entity): Promise<dto>;
  delete(id: string): Promise<void>;
}
