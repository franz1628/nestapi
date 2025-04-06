import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pais } from "src/pais/entities/pais.entity";
import { Departamento } from "./entities/departamento.entity";
import { CreateDepartamentoDto } from "./dto/create-departamento.dto";
import { UpdateDepartamentoDto } from "./dto/update-departamento.dto";

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  // Auxiliar para validar la existencia de un País
  private async validatePais(idPais: number): Promise<Pais> {
    const pais = await this.paisRepository.findOne({ where: { id: idPais } });
    if (!pais) {
      throw new NotFoundException(`País con ID ${idPais} no encontrado.`);
    }
    return pais;
  }

  // Auxiliar para buscar por descripción
  private async findByDescripcion(descripcion: string): Promise<Departamento | null> {
    return this.departamentoRepository.findOne({ where: { descripcion } });
  }

  // Crear un nuevo Departamento
  async create(createDto: CreateDepartamentoDto): Promise<Departamento> {
    // Verificar si ya existe un Departamento con la misma descripción
    const existingDepartamento = await this.findByDescripcion(createDto.descripcion);
    if (existingDepartamento) {
      throw new ConflictException('El Departamento ya existe.');
    }

    // Validar si el País existe
    await this.validatePais(createDto.idPais);

    // Crear y guardar el nuevo Departamento
    const departamento = this.departamentoRepository.create(createDto);
    return await this.departamentoRepository.save(departamento);
  }

  // Obtener todos los Departamentos
  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find({ relations: ["Pais"] });
  }

  // Buscar un Departamento por ID
  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({ where: { id } });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado.`);
    }
    return departamento;
  }

  // Actualizar un Departamento
  async update(id: number, updateDto: UpdateDepartamentoDto): Promise<Departamento> {
    // Buscar el Departamento por ID
    const departamento = await this.findOne(id);

    // Verificar si la descripción nueva ya existe en otro Departamento
    if (updateDto.descripcion && departamento.descripcion !== updateDto.descripcion) {
      const existingDepartamento = await this.findByDescripcion(updateDto.descripcion);
      if (existingDepartamento) {
        throw new ConflictException('Otro Departamento ya tiene esta descripción.');
      }
    }

    // Actualizar y guardar el Departamento
    Object.assign(departamento, updateDto);
    return await this.departamentoRepository.save(departamento);
  }

  // Eliminar (lógicamente) un Departamento
  async remove(id: number): Promise<Departamento> {
    const departamento = await this.findOne(id);

    // Actualizar el estado a inactivo
    departamento.status = 0;
    return await this.departamentoRepository.save(departamento);
  }
}
