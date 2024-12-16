import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DepartamentoService } from "./departamento.service";
import { Departamento } from "./entities/departamento.entity";
import { CreateDepartamentoDto } from "./dto/create-departamento.dto";
import { UpdateDepartamentoDto } from "./dto/update-departamento.dto";

@Controller('departamento')
//@UseGuards(AuthGuard)
export class DepartamentoController {
  constructor(private readonly service: DepartamentoService) {}

  @Post()
  async create(@Body() create: CreateDepartamentoDto): Promise<Departamento> {
    return await this.service.create(create);
  }
  
  @Get()
  //@UseGuards(RolesGuard)
  //@Roles(Role.User, Role.Admin) 
  async findAll(): Promise<Departamento[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Departamento> {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() update: UpdateDepartamentoDto):Promise<Departamento> {
    return await this.service.update(id, update);
  }

  @Delete(':id')
  async remove(@Param('id') id: number):Promise<Departamento> {
    return await this.service.remove(id);
  }
}
