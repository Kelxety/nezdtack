import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { PG_CONNECTION } from 'src/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(newUser: User) {
    return await this.conn.insert(schema.user).values(newUser);
  }

  async findAll() {
    return await this.conn.query.user.findMany();
  }

  async findOne(id: string) {
    return await this.conn
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
