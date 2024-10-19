import Button from "./Button";
import CanvasFactory from "@renderer/CanvasFactory";
import EventManager from "@event/EventManager";
import GameOverEvent from "@event/events/GameOverEvent";
import { GridConfiguration } from "../../types/Configurations";
import Renderer from "@renderer/Renderer";
import SceneChangeEvent from "@event/events/SceneChangeEvent";
import HighscoreTable from "./HighscoreTable";
import Username from "./Username";
import ApiEvent from "@event/events/ApiEvent";
import Highscore from "../../api/Api";
import BackgroundCanvas from "@renderer/menu/BackgroundCanvas";

export default class MenuRenderer extends Renderer {
  private playButton: Button;

  private usernameButton: Username;

  private highscore_enabled = false;

  private highscore: Highscore;

  constructor(
    protected eventManager: EventManager,
    protected canvasFactory: CanvasFactory, 
    protected gridConfiguration: GridConfiguration,
    protected background: BackgroundCanvas,
  ) {
    super(canvasFactory);
  }

  private gameOver = () => {
    // this.page = new End();
  }

  public initialize = (): void => {
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.gameOver);
    this.eventManager.subscribe(ApiEvent.EVENTNAME, this.drawHighscore);

    this.background.draw()
    this.background.startAnimation();

    this.canvas = this.canvasFactory.createCanvas('menu');
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.addEventListener('click', this.buttonClick);
    this.draw();
  }
  
  public destroy = () => {
    // this.context.reset(); // not found ?
    this.canvas.remove();

    this.background.stopAnimation();
    this.background.destroy();

    this.eventManager.unsubscribe(GameOverEvent.EVENTNAME, this.gameOver);
    this.eventManager.unsubscribe(ApiEvent.EVENTNAME, this.drawHighscore);
  }

  public async draw() {
    document.getElementById(this.gridConfiguration.elementId)?.append(this.canvas);
    const width = this.gridConfiguration.width * this.gridConfiguration.gridSquareWidth;
    const height = this.gridConfiguration.height * this.gridConfiguration.gridSquareHeight;

    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '25px arial';

    this.context.globalAlpha = 0.1;
    this.context.fillStyle = 'rgb(0, 255, 255)';
    this.context.fillRect(0, 0, width, height);

    this.context.globalAlpha = 1;
    this.playButton = new Button('Play', this.context);
    this.playButton.setPosition(45,50);
    this.playButton.setSize(300, 100);
    this.playButton.draw();
    
    this.usernameButton = new Username(this.context)
    this.usernameButton.setPosition(90, 200);
    this.usernameButton.createLetters();
    this.usernameButton.draw();
  }

  public drawHighscore = (apiEvent: ApiEvent): void => new HighscoreTable(this.context).draw(apiEvent.highscore);

  public buttonClick = (event: MouseEvent): void => {
    const x = event.pageX;
    const y = event.pageY;
    if (this.playButton.inBounds(x-this.canvas.offsetLeft,y-this.canvas.offsetTop)) {
      const changeScene = new SceneChangeEvent('game');
      this.destroy();
      this.eventManager.publish(changeScene);
    } else {
      this.usernameButton.buttonClick(x-this.canvas.offsetLeft,y-this.canvas.offsetTop);
    }
  }

}