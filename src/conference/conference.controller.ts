import { Controller, Get, Logger, Param, Render, Res } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';

@Controller('conference')
export class ConferenceController {

    @Get(':id')
    @Render('conference/conference')
    getConference(@Param('id') id: string) {
        const roomID = id;
        return { roomID };
    }

    @Get()
    conference(@Res() res: Response) {
        const uuid = randomUUID();
        return res.redirect(`/conference/${uuid}`);
    }
}
