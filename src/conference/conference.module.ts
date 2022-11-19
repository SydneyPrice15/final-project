import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceGateway } from './conference.gateway';
import { ConferenceController } from './conference.controller';

@Module({
  providers: [ConferenceGateway, ConferenceService],
  controllers: [ConferenceController]
})
export class ConferenceModule {}
