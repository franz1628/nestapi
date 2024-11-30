import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';
import { Repository } from 'typeorm';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private readonly repository: Repository<Pais>,
  ) {}

  async create(create: CreatePaisDto): Promise<Pais> {
    const busdepar = await this.repository.findOne({where : {descripcion:create.descripcion}})
    
    if(busdepar){
      throw new ConflictException('El pais ya existe');
    }

    const model = this.repository.create(create);
    return await this.repository.save(model);
  }

  async findAll(): Promise<Pais[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Pais> {
    const model = await this.repository.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Pais con ID ${id} no encontrado.`);
    }
    return model;
  }

  async update(id: number, update: UpdatePaisDto): Promise<Pais> {
    const model = await this.findOne(id);
    Object.assign(model, update);
    return await this.repository.save(model);
  }

  async remove(id: number): Promise<Pais> {
    const model = await this.findOne(id);
    Object.assign(model, {...model,estado:0});
    return await this.repository.save(model);
  }
}
