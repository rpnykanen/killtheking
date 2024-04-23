export default class State {

  private kills = 0;



  public addKills = () : void => {
    this.kills += 1;
  }

  public getKills = (): number => {
    return this.kills;
  }

}
