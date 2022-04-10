import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import ICrudController from "src/interfaces/icrudcontroller";
import ICrudService from "src/interfaces/icrudservice";

export default class CrudController<entity,dto> implements ICrudController<entity,dto>{
    service:ICrudService<entity,dto>;
    constructor(service:ICrudService<entity,dto>){
        this.service = service;
    }
    @Get()
    async find(): Promise<entity[]> {
        return await this.service.find();
    }
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<entity> {
        const response = await this.service.findById(id)
        return response;
    }
    @Post()
    async create(@Body() dto: dto): Promise<entity> {
        return await this.service.create(dto);
    }
    @Put(':id')
    async update(@Param('id') id: string,@Body()dto: dto): Promise<entity> {
        return await this.service.update(id,dto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<entity> {
        return await this.service.delete(id);
    }

}