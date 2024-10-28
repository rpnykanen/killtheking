import EventManager from "@event/EventManager";
import RoundSkipEvent from "@event/events/RoundSkipEvent";

describe('Event', () => {
  const eventManager = new EventManager();

  const testFunction1 = () => expect(true).toBe(true);
  const testFunction2 = () => { /*noop*/ };
  const event = new RoundSkipEvent();
  const theEventName = 'round.skip';

  test('Test round skip event', () => {
    expect(event.eventName).toBe(theEventName);
  });

  test('Test subscribing with round skip event', ()=>{
    expect(JSON.stringify(eventManager.events)).toBe('{}')
    eventManager.publish(event)
    expect(JSON.stringify(eventManager.events)).toBe('{}')
    
    // Subscribe to an event
    eventManager.subscribe(RoundSkipEvent.EVENTNAME, testFunction2);
    expect(Object.keys(eventManager.events).length).toBe(1);
    expect(Object.keys(eventManager.events[theEventName]).length).toBe(1);

    // Subscribe to another event
    eventManager.subscribe(RoundSkipEvent.EVENTNAME, testFunction1);
    expect(Object.keys(eventManager.events).length).toBe(1);
    expect(Object.keys(eventManager.events[theEventName]).length).toBe(2);
    
    // Unsubscribe.
    eventManager.unsubscribe(RoundSkipEvent.EVENTNAME, testFunction1);
    expect(Object.keys(eventManager.events[theEventName]).length).toBe(1);

    eventManager.unsubscribe(RoundSkipEvent.EVENTNAME, testFunction2);
    expect(Object.keys(eventManager.events[theEventName]).length).toBe(0);
  });

  test('Test publishing', () => {
    expect(JSON.stringify(eventManager.events)).not.toBe('{}');
    eventManager.subscribe(RoundSkipEvent.EVENTNAME, testFunction1);
    eventManager.publish(event);
  });

});