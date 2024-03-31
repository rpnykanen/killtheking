import EventManager from "@event/EventManager";

export default class State {

  private kills = 0;

  constructor(private eventManager: EventManager) {
  }

  public end = (win: boolean) : void => {
    const winOrLose = win ? 'win' : 'lose';
    confirm(`You ${winOrLose}!`)
    location.reload();
  }

  public addKills = () : void => {
    this.kills += 1;
  }

  public getKills = (): number => {
    return this.kills;
  }

}
