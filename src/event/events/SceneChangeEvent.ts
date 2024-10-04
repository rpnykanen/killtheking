import IEvent from "./IEvent";

export default class SceneChangeEvent implements IEvent {
  static EVENT_NAME = 'scene.change';

  constructor(private _sceneName: string){}

  get sceneName(): string { return this._sceneName }

  get eventName(): string { return 'scene.change' }
}