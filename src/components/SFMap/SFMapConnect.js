import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SFMap } from './SFMap';
import {getMuniLocations} from '../../thunks/nextbus';

function mapStateToProps(state, ownProps) {
  return {
    muniLocs: state.mapInfo.muniLocs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getMuniLocations
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SFMap);
