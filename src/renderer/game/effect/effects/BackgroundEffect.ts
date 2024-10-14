import IEffect from "@renderer/game/effect/effects/IEffect";
import {GridConfiguration} from "../../../../types/Configurations";
import {randomNumber} from "@utils/RandomHelper";
import Item from "@renderer/game/effect/effects/Item";
import CharacterFactory from "@board/character/CharacterFactory";

export default class BackgroundEffect implements IEffect {

  private activeParticles: Item[] = [];
  private particleCount = 10;
  private spawnNew = 400;
  private lastSpawn = 0;

  constructor(private gridConfig: GridConfiguration, private characterFactory: CharacterFactory) {
    this.createItem();
  }

  public isOn = (): boolean => {
    return this.activeParticles.length > 0;
  }

  public stop = () => {
    this.activeParticles = [];
  }

  private createItem = () => {
    const x = randomNumber(this.gridConfig.width)*50;
    const y = 585;

    const character = this.characterFactory.createRandomEnemy()

    this.activeParticles.push(new Item(x, y, character));
  }

  public update = (): Item[] => {
    if (this.activeParticles.length === 0) {
      return [];
    }

    if (this.lastSpawn > this.spawnNew) {
      if (this.activeParticles.length < this.particleCount) {
        this.createItem();
      }

      this.lastSpawn = 0;
    }

    this.activeParticles.forEach((item: Item) => {
      item.update();
      if (item.isDead()) {
        this.activeParticles = this.activeParticles.filter((p: Item) => p !== item);
        this.createItem();
      }
    });

    this.lastSpawn += 5;

    return this.activeParticles
  }

  public destroy = (): void => {
    this.stop();
  }

}