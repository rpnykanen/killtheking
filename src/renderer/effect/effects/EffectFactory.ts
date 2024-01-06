import CanvasPosition from "@renderer/CanvasPosition";
import Explosion from "./Explosion";
import IEffect from "./IEffect";

export default class EffectFactory {
  
  getEffect = (name: string, position: CanvasPosition) => {
    switch(name){
      case 'explosion':
        return this.createExplosion(position);
        break;
    }
  }

  private createExplosion = (position: CanvasPosition): IEffect => {
    return new Explosion(position);
  }

}