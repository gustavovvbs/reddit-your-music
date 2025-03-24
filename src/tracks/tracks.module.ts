import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotifyModule } from '../external/spotify/spotify.module';
import { ReviewModule } from '../review/review.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
        SpotifyModule,
        ReviewModule,
    ],
    providers : [TracksService],
    controllers: [TracksController],
})
export class TracksModule {}