import { connect }  from 'react-redux';
import ControlPanel  from './control_panel';
import { sendData } from '../../redux_actions/data_actions.js';

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  sendData: (data) => dispatch(sendData(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
