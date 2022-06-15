import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@user/dto/createUser.dto';
import { UserEntity } from '@user/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    console.log(newUser, 'newUser');
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['id', 'email', 'bio', 'img', 'username', 'password'] },
    );
    if (!candidate) {
      throw new HttpException(
        'Email or password are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await compare(
      loginUserDto.password,
      candidate.password,
    );
    if (!isValidPassword) {
      throw new HttpException(
        'Email or password are incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete candidate.password;

    return candidate;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
