import Button from "./Button";
import CanvasFactory from "@renderer/CanvasFactory";
import EventManager from "@event/EventManager";
import GameOverEvent from "@event/events/GameOverEvent";
import { GridConfiguration } from "../../types/Configurations";
import MenuEvent from "@event/events/MenuEvent";
import Renderer from "@renderer/Renderer";
import SceneChangeEvent from "@event/events/SceneChangeEvent";
import Api from "../../api/Api";

export default class MenuRenderer extends Renderer {

  private page: string;

  private playButton: Button;

  constructor(
    protected eventManager: EventManager,
    protected canvasFactory: CanvasFactory, 
    protected gridConfiguration: GridConfiguration,
    // bad
    protected api: Api
  ) {
    super(canvasFactory);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.gameOver);
    this.eventManager.subscribe(MenuEvent.EVENTNAME, this.changePage)
  }

  private gameOver = () => {
    // this.page = new End();
  }

  private changePage = (menuEvent: MenuEvent) => {
    this.page = menuEvent.pageName;
    // this.draw();
  }

  public initialize = (): void => {
    this.canvas = this.canvasFactory.createCanvas('menu');
    this.context = this.canvas.getContext('2d')!;
    this.canvas.addEventListener('click', this.buttonClick);
    this.draw();
  }
  
  public destroy = () => {
    this.canvas.remove();
    this.eventManager.unsubscribe(GameOverEvent.EVENTNAME, this.gameOver);
    this.eventManager.unsubscribe(MenuEvent.EVENTNAME, this.changePage)
  }

  public async draw() {
    document.getElementById(this.gridConfiguration.elementId)?.append(this.canvas);

    const width = this.gridConfiguration.width * this.gridConfiguration.gridSquareWidth;
    const height = this.gridConfiguration.height * this.gridConfiguration.gridSquareHeight;

    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '25px arial';

    this.context.fillStyle = 'rgb(0, 255, 255)';
    this.context.fillRect(0, 0, width, height);

    this.playButton = new Button('Play', this.context);
    this.playButton.setPosition(45,50);
    this.playButton.setSize(300, 100);
    this.playButton.draw();
    
    try {
      const highscore = await this.api.getHighscore();
      if (highscore.items) {
        this.context.fillText('High Score', 200, 200);
        this.context.font = '18px arial';
  
        let i = 250;
        highscore.items.forEach((item: {'username': string, 'score': string}) => {
          this.context.fillText(`${item.username}: ${item.score}`, 100, i);
          i += 25;
        });
      }
    }
    catch (err) {
    }
  }

  public buttonClick = (event: MouseEvent) => {
    const x = event.pageX;
    const y = event.pageY;
    if (this.playButton.inBounds(x-this.canvas.offsetLeft,y-this.canvas.offsetTop)) {
      const changeScene = new SceneChangeEvent('game');
      this.destroy();
      this.eventManager.publish(changeScene);
    }
  }

}