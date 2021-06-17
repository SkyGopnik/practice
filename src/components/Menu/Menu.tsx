import React from 'react';
import axios from "axios";
import {Cell, Group, Spacing} from "@vkontakte/vkui";
import {Icon28EditOutline, Icon28OnOffOutline, Icon28ServicesOutline} from "@vkontakte/icons";

import {AppReducerInterface} from "src/store/app/reducers";
import {UserInterface} from "src/store/user/reducers";

import style from "./Menu.scss";

interface IProps extends AppReducerInterface {
  user: UserInterface
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
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
    const { story, user, changeStory } = this.props;

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
          className={user && !user.questionnaire ? style.disabled : ''}
          data-story="services"
          onClick={(e) => changeStory(e.currentTarget.dataset.story)}
          before={<Icon28ServicesOutline />}
          disabled={user && !user.questionnaire}
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
