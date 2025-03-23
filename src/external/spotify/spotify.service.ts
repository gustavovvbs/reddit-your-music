import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SpotifyConfig } from './spotify.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SpotifyTrackResponse } from './interfaces/spotify-track-response.interface';
import { plainToInstance } from 'class-transformer';
import { SpotifyTrackDto } from './dto/spotify-track.dto';

@Injectable()
export class SpotifyService {
	private readonly logger = new Logger(SpotifyService.name);
	private readonly baseUrl = 'https://api.spotify.com/v1';

	private accessToken: string | null = null;
	private tokenExpiration: Date | null = null;

	constructor(
	@Inject('SPOTIFY_CONFIG') private readonly spotifyConfig: SpotifyConfig,
	private readonly httpService: HttpService,
	) {}

	private async getAccessToken(): Promise<string | null> {
		if (this.accessToken && this.tokenExpiration && new Date() < this.tokenExpiration) {
			return this.accessToken;
		}

		const authString = `${this.spotifyConfig.clientId}:${this.spotifyConfig.clientSecret}`;

		try {
			const response = await firstValueFrom(
			this.httpService.post(
				'https://accounts.spotify.com/api/token',
				new URLSearchParams({
				grant_type: 'client_credentials',
				}),
				{
				headers: {
				Authorization: `Basic ${Buffer.from(authString).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				},
				},
			),
		);

			this.accessToken = response.data.access_token;
			const expiresIn = response.data.expires_in;
			this.tokenExpiration = new Date(Date.now() + expiresIn * 1000);

			return this.accessToken;
		} catch (error) {
			this.logger.error('Error fetching access token', error);
			throw error;
		}
	}

  	async getTrackOrAlbum(spotifyId: string, spotifyType: string): Promise<SpotifyTrackDto> {
		const url = `${this.baseUrl}/tracks/${spotifyId}`;
		const accessToken = await this.getAccessToken();
		if (!accessToken) {
			this.logger.error('No access token available');
			throw new Error('Unable to fetch access token');
		}

		try {
			const response = await firstValueFrom(
				this.httpService.get<SpotifyTrackResponse>(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				}),
			);

			this.logger.debug(`Fetched data from Spotify: ${JSON.stringify(response.data)}`);
			return plainToInstance(SpotifyTrackDto, response.data);
		} catch (error) {
			this.logger.error(`Error fetching ${spotifyType} with ID ${spotifyId}`, error);
			throw error;
		}
  }
}
