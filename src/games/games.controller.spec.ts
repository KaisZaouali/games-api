import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('playtime', () => {
    it('should return data that are filtred by the query parameteres and sorted by playtime', async () => {
      const result = [
        {
          game: 'Valorant',
          genre: 'FPS',
          platforms: ['PC'],
          totalPlayTime: 2080,
          totalPlayers: 2,
        },
        {
          game: 'The last of us 2',
          genre: 'FPS',
          platforms: ['PS4', 'PC'],
          totalPlayTime: 100,
          totalPlayers: 1,
        },
      ];
      const query = {
        genre: 'FPS',
        platform: 'PC',
      };

      const serviceSpy = jest.spyOn(service, 'selectTopByPlaytime');
      const serviceResult = service.selectTopByPlaytime(query);

      expect(serviceSpy).toHaveBeenCalled();
      expect(serviceResult).toStrictEqual(result);
    });
  });

  describe('players', () => {
    it('should return data that are filtred by the query parameteres and sorted by players', async () => {
      const result = [
        {
          game: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platforms: ['PC', 'PS4', 'Xbox One', 'Nintendo Switch'],
          totalPlayTime: 987,
          totalPlayers: 3,
        },
        {
          game: 'Dark Souls',
          genre: 'Action RPG',
          platforms: [
            'PS3',
            'Xbox 360',
            'PC',
            'PS4',
            'Xbox One',
            'Nintendo Switch',
          ],
          totalPlayTime: 218,
          totalPlayers: 2,
        },
        {
          game: 'Hitman 3',
          genre: 'Stealth',
          platforms: ['PS4', 'PS5', 'Xbox One', 'Nintendo Switch', 'PC'],
          totalPlayTime: 150,
          totalPlayers: 2,
        },
      ];
      const query = {
        platform: 'Nintendo Switch',
      };

      const serviceSpy = jest.spyOn(service, 'selectTopByPlayers');
      const serviceResult = service.selectTopByPlayers(query);

      expect(serviceSpy).toHaveBeenCalled();
      expect(serviceResult).toStrictEqual(result);
    });
  });
});
