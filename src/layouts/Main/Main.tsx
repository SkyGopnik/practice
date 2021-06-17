import React from 'react';
import {
  Cell, Epic,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout
} from "@vkontakte/vkui";

import Menu from "src/components/Menu/MenuContainer";

import { QuestionnaireView } from "src/views";

import {AppReducerInterface} from "src/store/app/reducers";

interface IProps extends AppReducerInterface {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { story } = this.props;

    return (
      <SplitLayout
        header={<PanelHeader separator={false}/>}
        style={{justifyContent: "center"}}
      >
        <SplitCol fixed width="280px" maxWidth="280px">
          <Panel id="split">
            <PanelHeader />
            <Menu />
          </Panel>
        </SplitCol>

        <SplitCol
          spaced
          width="560px"
          maxWidth="560px"
        >
          <Epic activeStory={story}>
            <QuestionnaireView id="questionnaire" />
            {/*<View id="services" activePanel="services">*/}
            {/*  <Panel id="services">*/}
            {/*    <PanelHeader>Сервисы</PanelHeader>*/}
            {/*    <Group>*/}
            {/*      <Placeholder icon={<Icon28ServicesOutline width={56} height={56}/>}>*/}
            {/*      </Placeholder>*/}
            {/*    </Group>*/}
            {/*  </Panel>*/}
            {/*</View>*/}
          </Epic>
        </SplitCol>
      </SplitLayout>
    );
  }
}
