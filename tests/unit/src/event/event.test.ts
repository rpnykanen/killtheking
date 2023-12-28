import Pubsub from "@event/PubSub";
import RoundSkipEvent from "@event/events/RoundSkipEvent";

describe('Event', () => {
  const testFunction1 = () => expect(true).toBe(true);
  const testFunction2 = () => {}
  const event = new RoundSkipEvent();
  const theEventName = 'round.skip'

  test('Test round skip event', () => {
    expect(event.eventName).toBe(theEventName);
  });

  test('Test subscribing with round skip event', ()=>{
    expect(JSON.stringify(Pubsub.events)).toBe('{}')
    Pubsub.publish(event)
    expect(JSON.stringify(Pubsub.events)).toBe('{}')
    
    // Subscribe to an event
    Pubsub.subscribe(event.eventName, testFunction2);
    expect(Object.keys(Pubsub.events).length).toBe(1);
    expect(Object.keys(Pubsub.events[theEventName]).length).toBe(1);

    // Subscribe to another event
    Pubsub.subscribe(event.eventName, testFunction1);
    expect(Object.keys(Pubsub.events).length).toBe(1);
    expect(Object.keys(Pubsub.events[theEventName]).length).toBe(2);
    
    // Unsubscribe.
    Pubsub.unsubscribe(event.eventName, testFunction1);
    expect(Object.keys(Pubsub.events[theEventName]).length).toBe(1);

    Pubsub.unsubscribe(event.eventName, testFunction2);
    expect(Object.keys(Pubsub.events[theEventName]).length).toBe(0);
  });

  test('Test publishing', () => {
    expect(JSON.stringify(Pubsub.events)).not.toBe('{}');
    Pubsub.subscribe(event.eventName, testFunction1);
    Pubsub.publish(event);
  });

})