import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { DepartamentoService } from './departamento.service';
import { Response } from 'express';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly service: DepartamentoService) {}

  @Post()
  async create(@Body() create: CreateDepartamentoDto, @Res() res: Response): Promise<void> {
    try {
      const model = await this.service.create(create);
      res.status(HttpStatus.CREATED).json(model);
    } catch (error) {
      if (error instanceof ConflictException) {
        res.status(HttpStatus.CONFLICT).json({ message: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const models = await this.service.findAll();
    if (models.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.OK).json(models);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() update: UpdateDepartamentoDto,
  ) {
    return this.service.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
