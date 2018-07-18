import framesReducer from '../reducers/frames';
import { requestFrames, framesSuccess, framesError } from '../actions/frames';

describe('Frames Reducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = framesReducer(undefined, {type: '@@notathing!'});
    expect(state).toEqual({
      frames: [],
      loading: false,
      error: null
    });
  });

  it('Should return the current state with an unknown action', () =>{
    const currentState = {};
    const state = framesReducer(currentState, {type: '@@notathing!'});
    expect(state).toBe(currentState);
  });
  
  it('should return correct state given requestFrames', ()=>{
    let state;
    state = framesReducer(state, requestFrames());
    expect(state).toEqual({
      frames: [],
      loading: true,
      error : null
    });
  });

  it('should return correct state given framesSuccess', () => {
    let state;
    const frames = 'test frames';
    state = framesReducer(state, framesSuccess(frames));
    expect(state).toEqual({
      loading: false,
      frames,
      error: null
    });
  });

  it('should return correct state given frameError', ()=>{
    let state;
    const error = 'test';
    state = framesReducer(state, framesError(error));
    expect(state).toEqual({
      loading: false,
      frames: [],
      error
    });
  });
});