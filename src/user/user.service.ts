import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  async loginUser(email: string, password: string) {
    if (email != 'dmin@codesfortomorrow.com') {
      throw new UnauthorizedException('Invalid email');
    }
    if (password != 'Admin123!@#') {
      throw new UnauthorizedException('Invalid password');
    }

    const token = jwt.sign(
      { email: email, password: password },
      'codefortomorrow',
    );

    return {
      message: 'Login successful',
      token,
      user: {
        email: email,
        password: password,
      },
    };
  }
}
