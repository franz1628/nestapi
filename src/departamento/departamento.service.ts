import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pais } from "src/pais/entities/pais.entity";
import { Departamento } from "./entities/departamento.entity";
import { Repository } from "typeorm";
import { CreateDepartamentoDto } from "./dto/create-departamento.dto";
import { UpdateDepartamentoDto } from "./dto/update-departamento.dto";

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly repository: Repository<Departamento>,
    @InjectRepository(Pais)
    private readonly repositoryPais: Repository<Pais>,
  ) {}

  async create(create: CreateDepartamentoDto): Promise<Departamento> {
    const busdepar = await this.repository.findOne({where : {descripcion:create.descripcion}})
    
    if(busdepar){
      throw new ConflictException('La Departamento ya existe');
    }

    const buscaDepar = await this.repositoryPais.findOne({where:{id:create.idPais}});

    if(!buscaDepar){
      throw new NotFoundException(`Pais con ID ${create.idPais} no encontrado.`);
    }

    const model = this.repository.create(create);
    
    return await this.repository.save(model);
  }

  async findAll(): Promise<Departamento[]> {
    return await this.repository.find({where: { status:1 } ,relations:["Pais"]});
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

    if(model.descripcion != update.descripcion){
      const newModel = await this.repository.findOne({ where: { descripcion:update.descripcion } });
      if(newModel){
        throw new ConflictException('El Departamento ya existe');
      }
    }

    Object.assign(model, update);
    return await this.repository.save(model);
  }

  async remove(id: number): Promise<Departamento> {
    const model = await this.findOne(id);
    Object.assign(model, {...model,status:0});
    return await this.repository.save(model);
  }
}
