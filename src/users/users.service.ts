import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './users.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  create(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }
  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }
  update(id: number, user: Users): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
