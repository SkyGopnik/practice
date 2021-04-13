import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  updateHistory
} from '../store/app/actions';

import App from './App';

const AppContainer = (props) => <App {...props} />;

const mapStateToProps = (state) => ({
  ...state.app
});

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  updateHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
