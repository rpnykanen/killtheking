export default interface Highscore {
  items: Array<{'username': string, 'score': string}>,
  token: string
}