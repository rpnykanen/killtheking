import _configuration from "./configuration";
import Configuration, { Controls, Difficulty, GridConfiguration, Misc } from "./types/Configurations";

export default class ConfigurationManager {
  private configurations: Configuration

  constructor() {
    this.configurations = _configuration;
    this.configableConfiguration();
  }

  private configableConfiguration = (): void => {
    const params = new URLSearchParams(window.location.search);
    params.has('autoplay') && (this.configurations.misc.autoplay = !!params.get('autoplay'));
    params.has('infinite') && this.setInfinite()
  }

  private setInfinite = () => {
    this.configurations.difficulty[0].enemyAmount = -1
  }

  public getControlConfiguration = (name: string) => this.configurations.controls[name];
  public getControlConfigurations = (): Controls => this.configurations.controls;

  public getDifficultyConfiguration = (name: string) => this.configurations.difficulty[0][name];
  public getDifficultyConfigurations = (): Difficulty => this.configurations.difficulty[0];

  public getGridConfiguration = (name: string) => this.configurations.gridConfiguration[name];
  public getGridConfigurations = (): GridConfiguration => this.configurations.gridConfiguration;

  public getMiscConfiguration = (name: string) => this.configurations.misc[name];
  public getMiscConfigurations = (): Misc => this.configurations.misc;

}