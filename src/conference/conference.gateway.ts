import { Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConferenceService } from './conference.service';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@WebSocketGateway()
export class ConferenceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(ConferenceGateway.name);
  constructor(private readonly conferenceService: ConferenceService) {}

  @SubscribeMessage('createConference')
  create(@MessageBody() createConferenceDto: CreateConferenceDto) {
    return this.conferenceService.create(createConferenceDto);
  }

  @SubscribeMessage('join room')
  findAll() {
    return this.conferenceService.findAll();
  }

  afterInit(server: Server) {
    this.logger.log('Initialised');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
