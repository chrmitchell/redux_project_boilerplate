import { testEquals, testThrows } from './reducerTestUtils';

import reducer from '../src/js/reducers/appReducer';

describe('appReducer', () => {
    it('should return current state when passed unmatched action type', function() {
        testEquals(reducer, {name: 'test'}, {type: 'SOME_OTHER_ACTION'}, {name: 'test'});        
    });
});
