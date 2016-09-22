import { connect } from 'react-redux';
import WelcomeMessage from './welcome_message';
import { sendData } from '../../redux_actions/data_actions';

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  sendData: data => dispatch(sendData(data))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeMessage);
