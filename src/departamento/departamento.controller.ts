import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { DepartamentoService } from './departamento.service';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentosService: DepartamentoService) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departamentosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentosService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departamentosService.remove(id);
  }
}
