import React from 'react';
import {Cell, Group, Spacing} from "@vkontakte/vkui";
import {Icon28EditOutline, Icon28OnOffOutline, Icon28ServicesOutline} from "@vkontakte/icons";

import style from "./Menu.scss";
import {AppReducerInterface} from "src/store/app/reducers";
import axios from "axios";

interface IProps extends AppReducerInterface {}

export default class extends React.Component<IProps, any> {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { changeView } = this.props;

    // Обнуляем токен в памяти
    axios.defaults.headers.common.token = undefined;
    localStorage.removeItem('token');

    // Перекидываем на авторизацию
    changeView('auth');
  }

  render() {
    const { story, changeStory } = this.props;

    return (
      <Group className={style.menu}>
        <Cell
          className={story === '' ? style.active : ''}
          disabled={story === 'questionnaire'}
          data-story="questionnaire"
          onClick={(e) => changeStory(e.currentTarget.dataset.story)}
          before={<Icon28EditOutline />}
        >
          Анкета
        </Cell>
        <Cell
          className={style.disabled}
          data-story="services"
          onClick={(e) => changeStory(e.currentTarget.dataset.story)}
          before={<Icon28ServicesOutline />}
          disabled
        >
          services
        </Cell>
        <Spacing separator />
        <Cell
          onClick={this.logout}
          before={<Icon28OnOffOutline />}
        >
          Выйти
        </Cell>
      </Group>
    );
  }
}
