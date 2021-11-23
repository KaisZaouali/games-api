import { Injectable } from '@nestjs/common';
import { PlayerGameEntity } from './entities/playerGame.entity';
import file = require('./games.json');
import { GameEntity } from './entities/game.entity';
import { IQuery } from 'src/shared/interfaces/query.interface';

@Injectable()
export class GamesService {
  gameRepository: { data: PlayerGameEntity[]; aggregated?: GameEntity[] };

  constructor() {
    this.gameRepository = { data: file.data };
  }

  aggregateGameData() {
    this.gameRepository.aggregated = this.gameRepository.data.reduce(
      (aggregatedGames, playerGame) => {
        const { game, genre, platforms, playTime } = playerGame;
        const gameIndex = aggregatedGames.findIndex(
          (aggregatedGame) => aggregatedGame.game === game,
        );
        if (gameIndex !== -1) {
          aggregatedGames[gameIndex].totalPlayTime += playerGame.playTime;
          aggregatedGames[gameIndex].totalPlayers += 1;
          return aggregatedGames;
        }
        return [
          ...aggregatedGames,
          {
            game,
            genre,
            platforms,
            totalPlayTime: playTime,
            totalPlayers: 1,
          },
        ];
      },
      [],
    );
  }

  filterAggregatedGamesByQueryParams(query: IQuery) {
    const { genre, platform } = query;
    let filtered = this.gameRepository.aggregated || [];
    if (genre) filtered = filtered.filter((game) => game.genre === genre);
    if (platform)
      filtered = filtered.filter((game) => game.platforms.includes(platform));
    return filtered;
  }

  selectTopByPlaytime(query: IQuery) {
    if (!this.gameRepository.aggregated) this.aggregateGameData();
    return this.filterAggregatedGamesByQueryParams(query).sort(
      (a, b) => b.totalPlayTime - a.totalPlayTime,
    );
  }

  selectTopByPlayers(query: IQuery) {
    if (!this.gameRepository.aggregated) this.aggregateGameData();
    return this.filterAggregatedGamesByQueryParams(query).sort(
      (a, b) => b.totalPlayers - a.totalPlayers,
    );
  }
}
