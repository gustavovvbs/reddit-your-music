import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

export interface SpotifyConfig {
    clientId: string;
    clientSecret: string;
}

export const spotifyConfig = {
    provide: "SPOTIFY_CONFIG",
    useFactory: (configService: ConfigService): SpotifyConfig => ({
        clientId: configService.get<string>("SPOTIFY_CLIENT_ID", "" ),
        clientSecret: configService.get<string>("SPOTIFY_CLIENT_SECRET", ""),
    }),
    inject: [ConfigService], 
}

@Module({
    imports: [ConfigModule],
    providers: [spotifyConfig],
    exports: [spotifyConfig],
})
export class SpotifyConfigModule {}