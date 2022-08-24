import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!<br/>'.repeat(Math.round(Math.random() * 1000));
  }
}
