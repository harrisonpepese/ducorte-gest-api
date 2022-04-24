export default interface ICrudService<entity> {
  create(dto: entity): Promise<entity>;
  update(id: string, dto: entity): Promise<entity>;
  findById(id: string): Promise<entity>;
  find(): Promise<entity[]>;
  delete(id: string): Promise<entity>;
}
