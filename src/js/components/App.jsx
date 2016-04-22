import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ( state ) => ({
	message: state.message
});

const mapDispatchToProps = ( dispatch ) => ({});

const App = ({
	message
}) => {
	return (
		<div className="message">{message}</div>
	);
};

export default connect( mapStateToProps, mapDispatchToProps )( App );
