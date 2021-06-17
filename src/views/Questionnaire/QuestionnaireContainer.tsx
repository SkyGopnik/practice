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
import { syncUser } from "src/store/user/actions";

import Questionnaire from './Questionnaire';

const QuestionnaireContainer = (props) => <Questionnaire {...props} />;

const mapStateToProps = (state) => ({
  ...state.app,
  user: state.user.data
});

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  changeSnackbar,
  updateHistory,
  syncUser
};

export default connect<any, any, {
  id: string
}>(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
