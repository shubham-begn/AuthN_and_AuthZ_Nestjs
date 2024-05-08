import { Injectable,Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configservice:ConfigService
  ){}
  getHello(): string {
   const app_name=this.configservice.get<string>('Project-name');
    return app_name;
  }
}
