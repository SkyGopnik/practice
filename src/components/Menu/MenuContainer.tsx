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
} from 'src/store/app/actions';

import Menu from './Menu';

const MenuContainer = (props) => <Menu {...props} />;

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

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
