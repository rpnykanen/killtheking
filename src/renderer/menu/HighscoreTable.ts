import Highscore from "@type/Highscore";

export default class HighscoreTable {
  constructor(private context: CanvasRenderingContext2D) {
  }

  public draw = (highscore: Highscore) => {
    if (highscore.items) {
      this.context.fillStyle = 'rgb(0, 0, 0)';
      this.context.fillText('High Score', 200, 250);
      this.context.font = '18px arial';

      let i = 295;
      highscore.items.forEach((item: {'username': string, 'score': string}) => {
        this.context.fillText(`${item.username}: ${item.score}`, 100, i);
        i += 25;
      });
    }
  }
}