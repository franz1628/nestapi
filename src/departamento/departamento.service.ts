import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly repository: Repository<Departamento>,
  ) {}

  async create(create: CreateDepartamentoDto): Promise<Departamento> {
    const busdepar = await this.repository.findOne({where : {descripcion:create.descripcion}})
    
    if(busdepar){
      throw new ConflictException('El departamento ya existe');
    }

    const model = this.repository.create(create);
    const {id,...newModel} = model
    return await this.repository.save(newModel);
  }

  async findAll(): Promise<Departamento[]> {
    return await this.repository.find({relations:["Pais"]});
  }

  async findOne(id: number): Promise<Departamento> {
    const model = await this.repository.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado.`);
    }
    return model;
  }

  async update(id: number, update: UpdateDepartamentoDto): Promise<Departamento> {
    const model = await this.findOne(id);
    Object.assign(model, update);
    return await this.repository.save(model);
  }

  async remove(id: number): Promise<Departamento> {
    const model = await this.findOne(id);
    Object.assign(model, {...model,estado:0});
    return await this.repository.save(model);
  }
}
