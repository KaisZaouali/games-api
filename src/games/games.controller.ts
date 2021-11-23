import { Controller, Get, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { IQuery } from '../shared/interfaces/query.interface';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('playtime')
  selectTopByPlaytime(@Query() query: IQuery) {
    return this.gamesService.selectTopByPlaytime(query);
  }

  @Get('players')
  selectTopByPlayers(@Query() query: IQuery) {
    return this.gamesService.selectTopByPlayers(query);
  }
}
