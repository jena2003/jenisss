import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  Unique,
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import Author from './Author';

@Entity()
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 30)
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(4, 30)
  @IsNotEmpty()
  surname: string;

  @Column()
  @Length(4, 30)
  @IsNotEmpty()
  email: string;

  @Column()
  @Length(4, 100)
  @IsNotEmpty()
  password: string;

  @OneToOne(() => Author, (author) => author.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  author: Author[];

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

