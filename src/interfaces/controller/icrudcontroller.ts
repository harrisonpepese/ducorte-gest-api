export default interface ICrudController<entity, dto> {
  find(): Promise<dto[]>;
  getOne(id: string): Promise<dto>;
  create(dto: dto): Promise<dto>;
  update(id: string, dto: dto): Promise<dto>;
  delete(id: string): Promise<void>;
}
