import { connect } from 'react-redux';
import D3Graph from './d3_chart';

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps
)(D3Graph);
