import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    const departamento = this.departamentoRepository.create(createDepartamentoDto);
    return await this.departamentoRepository.save(departamento);
  }

  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find();
  }

  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({ where: { id } });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado.`);
    }
    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
    const departamento = await this.findOne(id);
    Object.assign(departamento, updateDepartamentoDto);
    return await this.departamentoRepository.save(departamento);
  }

  async remove(id: number): Promise<{ message: string }> {
    const departamento = await this.findOne(id);
    await this.departamentoRepository.remove(departamento);
    return { message: `Departamento con ID ${id} eliminado con éxito.` };
  }
}
