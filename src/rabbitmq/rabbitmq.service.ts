import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class RabbitmqConsumerService {
  private readonly logger = new Logger(RabbitmqConsumerService.name);

  @MessagePattern('test_pattern')
  handleTestPattern(message: { data: any }) {
    const { data } = message;
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    return { response: `Message received: ${JSON.stringify(data)}` };
  }
}
