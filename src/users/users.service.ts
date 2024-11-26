import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  update(id: number, user: User): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
