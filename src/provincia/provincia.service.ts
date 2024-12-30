import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { PaginationDto } from 'src/common/dtos/paginationDto';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly repository: Repository<Provincia>,
    @InjectRepository(Departamento)
    private readonly repositoryDepartamento: Repository<Departamento>,
  ) {}

  async create(create: CreateProvinciaDto): Promise<Provincia> {
    const busdepar = await this.repository.findOne({where : {descripcion:create.descripcion}})
    
    if(busdepar){
      throw new ConflictException('La provincia ya existe');
    }

    const buscaDepar = await this.repositoryDepartamento.findOne({where:{id:create.idDepartamento}});

    if(!buscaDepar){
      throw new NotFoundException(`Departamento con ID ${create.idDepartamento} no encontrado.`);
    }

    const model = this.repository.create(create);
    
    return await this.repository.save(model);
  }

  async findPaginationAll(paginationDto: PaginationDto){
    const { page, limit, buscar } = paginationDto;
    const skip = (page - 1) * limit;
    
    const whereCondition = buscar
    ? {
        descripcion: Raw((alias) => `LOWER(${alias}) LIKE :value`, { value: `%${buscar.toLowerCase()}%` }),
      }
    : {};

    const [data, total] = await this.repository.findAndCount({
      skip:skip,
      take: limit,
      where: whereCondition,
      relations:["Departamento"]
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAll(){

    return await this.repository.find({relations:["Departamento"]});
  }

  async findOne(id: number): Promise<Provincia> {
    const model = await this.repository.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Provincia con ID ${id} no encontrado.`);
    }
    return model;
  }

  async update(id: number, update: UpdateProvinciaDto): Promise<Provincia> {
    const model = await this.findOne(id);

    if(model.descripcion != update.descripcion){
      const newModel = await this.repository.findOne({ where: { descripcion:update.descripcion } });
      if(newModel){
        throw new ConflictException('La Provincia ya existe');
      }
    }

    Object.assign(model, update);
    return await this.repository.save(model);
  }

  async remove(id: number): Promise<Provincia> {
    const model = await this.findOne(id);
    Object.assign(model, {...model,status:0});
    return await this.repository.save(model);
  }
}
