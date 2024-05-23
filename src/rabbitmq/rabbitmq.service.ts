import { Injectable, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class RabbitmqConsumerService {
  private readonly logger = new Logger(RabbitmqConsumerService.name);

  @EventPattern('test_pattern')
  handleTestPattern(data: any) {
    this.logger.log(`Received message with pattern 'test_pattern': ${JSON.stringify(data)}`);
  }
}
