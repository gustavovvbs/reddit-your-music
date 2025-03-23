import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { spotifyConfig, SpotifyConfigModule } from './spotify.config';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
        SpotifyConfigModule,
    ],
    providers: [SpotifyService],
    exports: [SpotifyService],
    controllers: [SpotifyController],
})
export class SpotifyModule {}