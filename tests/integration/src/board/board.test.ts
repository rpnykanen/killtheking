import {describe, expect, test, jest} from "@jest/globals";
import Board from "@board/Board";
import CharacterFactory from "@board/character/CharacterFactory";
import EventManager from "@event/EventManager";
import GameUpdateEvent from "@event/events/GameUpdateEvent";
import Grid from "@board/Grid";
import King from "@board/character/King";
import Pawn from "@board/character/Pawn";
import Player from "@board/character/Player";
import Position from "@board/Position";


describe('Board', ()=>{

  const gridOptions = {
    "width": 5,
    "height": 10,
    "gridSquareWidth": 40,
    "gridSquareHeight": 40,
    "iconHeight": 25,
    "iconWidth": 20,
    "elementId": "game-container",
    "gameCanvas": "game",
    "effectCanvas": "effect"
  }

  const eventManager = new EventManager();
  const spy = jest.spyOn(eventManager, 'publish');

  /*
  const board = new Board(
    new Grid(gridOptions),
    new CharacterFactory(),
    eventManager
  );
  */
  let board: Board;

  beforeEach(()=>{
    board = new Board(
      new Grid(gridOptions),
      new CharacterFactory(),
      eventManager
    );
    board.initialize();
    spy.mockClear()
  });

  // test('Test initialization', ()=>{
    // board.initialize();
    // expect(spy).toBeCalledTimes(1)
    // expect(spy.mock.calls[0][0].eventName).toBe('game.update');
  // });

  test('Test moving against the wall', ()=>{
    board.movePlayer(true);
    expect(spy).toBeCalledTimes(0)
  });

  test('Test moving', ()=>{
    board.movePlayer(false);
    board.movePlayer(false);
    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0].eventName).toBe('game.update');
    expect(spy.mock.calls[1][0].eventName).toBe('game.update');
  });

  test('Test skip', ()=>{
    board.afterRoundActions();
    expect(spy).toBeCalledTimes(1);
  });

  test('Test shoot', ()=>{
    const mockCreatePlayer = jest.fn(()=>{return new Player()});
    const mockCreateRandomEnemy = jest.fn(()=>{return new Pawn(new Position(0,0), 1)});
    jest.mock("@board/character/CharacterFactory", ()=>{
      return jest.fn().mockImplementation(() => {
        return {
          createPlayer: mockCreatePlayer,
          createRandomEnemy: mockCreateRandomEnemy,
        };
      })
    });

    board.shoot();
    // shoot, dead enemy and next round.
    expect(spy).toBeCalledTimes(4);
    expect(spy.mock.calls[0][0].eventName).toBe('player.shoot');
    expect(spy.mock.calls[1][0].eventName).toBe('enemy.hit');
    expect(spy.mock.calls[2][0].eventName).toBe('enemy.death');
    expect(spy.mock.calls[3][0].eventName).toBe('game.update');
  });

  test('Test end game', ()=>{
    // const mockCreateKing = jest.fn(()=>{return new King(new Position(0,0), 0)});
    // FIX 
    jest.mock("@board/character/CharacterFactory", ()=>{
      return jest.fn().mockImplementation(() => {
        return {
          createRandomEnemy: jest.fn(()=>{return new King(new Position(0,0), 0)}),
        };
      })
    });
    
    board = new Board(
      new Grid(gridOptions),
      new CharacterFactory(),
      eventManager
    );
    board.initialize();

    board.afterRoundActions();
    expect(spy).toBeCalledTimes(2);
    // expect(spy.mock.calls[1][0].eventName).toBe('game.update');
    // expect(spy.mock.calls[1][0].eventName).toBe('game.win');
  })

});