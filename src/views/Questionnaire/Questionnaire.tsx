import React from 'react';
import {FormItem, FormLayout, Group, Input, Panel, PanelHeader, View} from "@vkontakte/vkui";

export class Questionnaire extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Анкета</PanelHeader>
          <Group>
            <FormLayout>
              <FormItem>
                <Input />
              </FormItem>
            </FormLayout>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default Questionnaire;
