import { Entity } from 'typeorm';

@Entity({
  name: 'playerGames',
})
export class PlayerGameEntity {
  userId: number;
  game: string;
  genre: string;
  platforms: string[];
  playTime: number;

  constructor(playerGame?: Partial<PlayerGameEntity>) {
    if (playerGame) {
      Object.assign(this, playerGame);
    }
  }
}
