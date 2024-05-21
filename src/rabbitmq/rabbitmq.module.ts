import { Module } from '@nestjs/common';
import { RabbitmqConsumerService } from './rabbitmq.service';

@Module({
  providers: [RabbitmqConsumerService],
})
export class RabbitmqModule {}
