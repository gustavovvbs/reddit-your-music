import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Review } from './review/review.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { SpotifyModule } from './external/spotify/spotify.module';
import { TracksModule } from './tracks/tracks.module';
import { Comment } from './comment/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: parseInt(configService.get<string>("DB_PORT") || "3306"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [ User,  Review, Comment],
        synchronize: true, // Set to false in production
      }),
    }),
    UsersModule,
    ReviewModule,
    CommentModule,
    SpotifyModule,
    TracksModule,
    ],
})
export class AppModule {}
 