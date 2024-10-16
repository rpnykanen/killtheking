import ApiEvent from "@event/events/ApiEvent";
import EventManager from "@event/EventManager";
import Highscore from "@types/Highscore";

export default class Api {
  private token: string;

  private u: string;

  constructor(
    private _config: string[],
    private eventManager: EventManager
  ) {
  }

  public setUsername = (u:string): void => { this.u = u }
 
  public getHighscore = async (): Promise<Highscore> => {
    let highscore;
    let storageData = sessionStorage.getItem('data');

    if (storageData) {
      const data = JSON.parse(storageData) as Highscore;
      this.token = data.token;
      this.eventManager.publish(new ApiEvent(data));
      return data;
    }
    
    try {
      const data = await fetch(atob(this._config[0]), {method: 'GET'});
      if (data.status !== 200) throw new Error('Unable');
      highscore = await data.json() as Highscore;
      sessionStorage.setItem('data', JSON.stringify(highscore));
      this.eventManager.publish(new ApiEvent(highscore));
      return highscore;
    }
    catch(err) {
      return {} as Highscore;
    }
  }
  
  public highscore = async (score: number) => {
    if (!this.u) {
      return;
    }
    const data = {token: this.token, score: score, username: 'RIPPE'}
    sessionStorage.removeItem('data')
    // sessionStorage.setItem('data', this.token);
    try {
      return await fetch(atob(this._config[1]), { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    }
    catch(err) {
      // Suppress error.
    }
  }

}