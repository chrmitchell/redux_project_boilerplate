import expect from 'expect';
import deepFreeze from 'deep-freeze';

export const testEquals = ( reducer, stateBefore, action, stateAfter ) => {
	deepFreeze( stateBefore );
	deepFreeze( action );
	expect( reducer(stateBefore, action) )
		.toEqual( stateAfter );
};

export const testThrows = ( reducer, stateBefore, action, errorRegExp ) => {
	deepFreeze( stateBefore );
	deepFreeze( action );
	expect( () => reducer( stateBefore, action ) )
		.toThrow( errorRegExp );
};
