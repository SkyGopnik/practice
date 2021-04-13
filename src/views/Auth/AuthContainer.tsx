import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  changeSnackbar,
  updateHistory
} from 'src/store/app/actions';

import Auth from './Auth';

const AuthContainer = (props) => <Auth {...props} />;

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
  changeSnackbar,
  updateHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
