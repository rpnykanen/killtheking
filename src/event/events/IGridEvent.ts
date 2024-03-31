import IEvent from "./IEvent";

export default interface IGridEvent extends IEvent {
  get eventName(): string;

  get x(): number;
  get y(): number;
}