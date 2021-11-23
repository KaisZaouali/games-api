import { Entity } from 'typeorm';

@Entity({
  name: 'games',
})
export class GameEntity {
  game: string;
  genre: string;
  platforms: string[];
  totalPlayTime: number;
  totalPlayers: number;

  constructor(game?: Partial<GameEntity>) {
    if (game) {
      Object.assign(this, game);
    }
  }
}
