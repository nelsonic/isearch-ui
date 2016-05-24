import { createFingerprint, initialise } from '../../src/services/fingerprint.js';
import { expect } from 'chai';
import simple from 'simple-mock';
import thunk from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { SET_FINGERPRINT } from '../../src/constants/actionTypes';
require('../dom-mock.js')('<html><body></body></html>');
import jsdom from 'mocha-jsdom';

// mock redux store
import configureMockStore from '../actions/test-helpers';
const mockStore = configureMockStore([thunk]);

describe('Fingerprint Service', () => {
  jsdom({ skipWindowCheck: true });
  let localStorage = global.localStorage;
  it('createFingerprint - creates a unique id based on the window object', done => {
    window.navigator.mimeTypes = '123';
    window.navigator.plugins = '';
    window.screen.height = '';
    window.screen.width = '';
    window.screen.pixelDepth = '';
    const fingerprint = createFingerprint().split('');
    expect(fingerprint[0]).to.equal('3'); // 2 characters in the mimeTypes property
    expect(fingerprint.slice(-1)[0]).to.equal('0'); // 2 characters in the mimeTypes property
    done();
  });
  it('initialise - calls the SET FINGERPRINT action with the existing fingerprint if there is one in local storage', done => {
    const store = mockStore({});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    simple.mock(localStorage, 'getItem').returnWith('1234');
    const expectedActions = [{ type: SET_FINGERPRINT, fingerprint: '1234' }];
    initialise(actionCreatorBinder);
    expect(store.getActions()).to.deep.equal(expectedActions);
    expect(localStorage.getItem('fingerprint')).to.equal('1234');
    simple.restore();
    done();
  });
  it('initialise - calls the SET FINGERPRINT action with a new fingerprint if there isnt one in local storage', done => {
    const store = mockStore({});
    const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);
    simple.mock(localStorage, 'getItem').returnWith(null);
    const expectedActions = [{ type: SET_FINGERPRINT, fingerprint: '34320' }];
    initialise(actionCreatorBinder);
    expect(store.getActions()).to.deep.equal(expectedActions);
    simple.restore();
    expect(localStorage.getItem('fingerprint')).to.equal('34320');
    done();
  });
});
