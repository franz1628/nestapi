import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { PaginationDto } from 'src/common/dtos/paginationDto';
import { ProvinciaDto } from './dto/provincia.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly repository: Repository<Provincia>,
    @InjectRepository(Departamento)
    private readonly repositoryDepartamento: Repository<Departamento>,
  ) {}

  async create(create: CreateProvinciaDto): Promise<ProvinciaDto> {
    const busdepar = await this.repository.findOne({where : {descripcion:create.descripcion}})
    
    if(busdepar){
      throw new ConflictException('La provincia ya existe');
    }

    const buscaDepar = await this.repositoryDepartamento.findOne({where:{id:create.idDepartamento}});

    if(!buscaDepar){
      throw new NotFoundException(`Departamento con ID ${create.idDepartamento} no encontrado.`);
    }

    const model = this.repository.create(create);
    
    return await this.repository.save(this.toDto(model));
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

  async findAll():Promise<ProvinciaDto[]>{
    const provincias = await this.repository.find({relations:["Departamento"]})
    return provincias.map(this.toDto);
  }

  async findOne(id: number): Promise<ProvinciaDto> {
    const model = await this.repository.findOne({ where: { id },relations:["Departamento"] });
    if (!model) {
      throw new NotFoundException(`Provincia con ID ${id} no encontrado.`);
    }
    return this.toDto(model);
  }

  async update(id: number, update: UpdateProvinciaDto): Promise<ProvinciaDto> {
    const model = await this.findOne(id);

    if(model.descripcion != update.descripcion){
      const newModel = await this.repository.findOne({ where: { descripcion:update.descripcion } });
      if(newModel){
        throw new ConflictException('La Provincia ya existe');
      }
    }

    Object.assign(model, update);
    return this.toDto(await this.repository.save(model));
  }

  async remove(id: number): Promise<ProvinciaDto> {
    const model = await this.findOne(id);
    Object.assign(model, {...model,status:0});
    return this.toDto(await this.repository.save(model));
  }

  private toDto(model: Provincia): ProvinciaDto {
    return plainToInstance(ProvinciaDto, model, {
      excludeExtraneousValues: true,
      enableImplicitConversion:true
    });
  }
}
