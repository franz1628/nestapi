import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ConflictException, Put } from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { Response } from 'express';
import { UpdatePaisDto } from './dto/update-pais.dto';


@Controller('pais')
export class PaisController {
  constructor(private readonly service: PaisService) {}

  @Post()
  async create(@Body() create: CreatePaisDto, @Res() res: Response): Promise<void> {
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
    @Body() update: UpdatePaisDto,
  ) {
    return this.service.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
