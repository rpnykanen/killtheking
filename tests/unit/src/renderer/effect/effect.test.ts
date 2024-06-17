import Explosion from "@renderer/game/effect/effects/Explosion";
import CanvasPosition from "@renderer/game/CanvasPosition";

describe('test effects', () => {

  const canvasPosition = new CanvasPosition(100,100, 10, 10, 125, 125, null); 

  test('Test explosion', () => {
    const effect = new Explosion(canvasPosition);

    expect(effect.particles.length).toBe(20);
    expect(effect.isDead()).toBeFalsy();

    for(let i=0; i<31; i++){
      effect.update();
    }

    expect(effect.particles.length).toBe(0);
    expect(effect.isDead()).toBeTruthy();
  });
});