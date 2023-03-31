import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { Customer } from '../customer/models/customer.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateCustomerDto, res: Response) {
    const userIsExist = await this.customerService.findOneByEmail(
      userDto.email,
    );
    if (userIsExist) {
      throw new HttpException(`Bunday user mavjud`, HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.customerService.create(
      { ...userDto },
      hashedPassword,
    );
    const tokens = await this.getToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.customerService.update(user.id, {
      ...user,
      hashed_refresh_token: hashed_refresh_token,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'USER REGISTERED',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  // async login(loginDto: LoginDto, res: Response) {
  //   const { email, password } = loginDto;
  //   const user = await this.customerService.getUserByEmail(email);
  //   if (!user) {
  //     throw new HttpException(`Bunday mavjud emas`, HttpStatus.BAD_REQUEST);
  //   }
  //   const isMatchPass = await bcrypt.compare(password, user.hashed_password);
  //   if (!isMatchPass) {
  //     throw new UnauthorizedException(`User not registered`);
  //   }
  //   const tokens = await this.getToken(user);

  //   const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

  //   const updatedUser = await this.customerService.updateUser(user.id, {
  //     ...user,
  //     hashed_refresh_token: hashed_refresh_token,
  //   });

  //   res.cookie('refresh_token', tokens.refresh_token, {
  //     maxAge: 15 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });

  //   const response = {
  //     message: 'USER LOGIN',
  //     user: updatedUser[1][0],
  //     tokens,
  //   };
  //   return response;
  // }

  // async logout(refreshToken: string, res: Response) {
  //   const userData = await this.jwtService.verify(refreshToken, {
  //     secret: process.env.REFRESH_TOKEN_KEY,
  //   });
  //   if (!userData) {
  //     throw new ForbiddenException('User not found');
  //   }
  //   const updatedUser = await this.customerService.updateUser(userData.id, {
  //     hashed_refresh_token: refreshToken,
  //   });
  //   res.clearCookie('refresh_token');
  //   const response = {
  //     message: 'User logged out successfully',
  //     user: updatedUser[1][0],
  //   };
  //   return response;
  // }

  private async getToken(user: Customer) {
    const payload = { id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not found');
    }
    const user = await this.customerService.findOne(user_id);
    if (!user || !user.hashed_password) {
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_password);
    const tokens = await this.getToken(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.customerService.update(user.id, {
      hashed_refresh_token: hashed_refresh_token,
    });
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.customerService.findOneByEmail(loginDto.email);

    if (
      !user ||
      !(await bcrypt.compare(loginDto.password, user.hashed_password))
    ) {
      throw new UnauthorizedException('Email yoki password XATO !!!');
    }

    return user;
  }
}
