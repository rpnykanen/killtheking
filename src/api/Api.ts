export interface Highscore {
  items: Array<{'username': string, 'score': string}>,
  token: string
}

export default class Api {

  private token: string;

  private u: string;

  constructor() {
  }

  public setUsername = (u:string)=>{this.u = u}
 
  public getHighscore = async (): Promise<Highscore> => {
    let highscore;
    let storageData = sessionStorage.getItem('data');

    if (storageData) {
      const data = JSON.parse(storageData) as Highscore;
      this.token = data.token;
      return data;
    }
    
    try {
      const data = await fetch(atob('aHR0cHM6Ly81ankwaW5scG8wLmV4ZWN1dGUtYXBpLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbS9iZXRhL2hpZ2hzY29yZQ=='), {method: 'GET'});
      if (data.status !== 200) throw new Error('Unable');
      highscore = await data.json() as Highscore;
      sessionStorage.setItem('data', JSON.stringify(highscore));
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
      return await fetch(atob('aHR0cHM6Ly81ankwaW5scG8wLmV4ZWN1dGUtYXBpLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbS9iZXRhL25ld0hpZ2hTY29yZQ=='), { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
    }
    catch(err) {
      // Suppress error.
    }
  }

}