import React from 'react';
import axios from 'axios';
import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Root
} from '@vkontakte/vkui';

/* Layouts */
import MainLayout from "src/layouts/Main/MainContainer";
import { AuthView } from "src/views";

import {AppReducerInterface} from "src/store/app/reducers";

import '../styles/all.scss';

interface IProps extends AppReducerInterface {
  syncUser(data: any)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.menu = this.menu.bind(this);
  }

  async componentDidMount() {
    const { changeView, syncUser } = this.props;

    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

    // Получаем токен если он есть
    const token = localStorage.getItem('token');

    if (token) {
      console.log(token);
      try {
        const { data } = await axios.get('/auth/' + token);

        // Проверяем токен на валидность и запоминаем его
        axios.defaults.headers.common.token = token;

        changeView('main');
        syncUser(data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  menu = (e) => {
    const {
      changeModal,
      changePopout,
      changeViewPanelStory
    } = this.props;

    const currentView = this.props.view;

    if (currentView === 'main') {
      // Если история переходов существует
      if (e.state) {
        const {view, panel, story, modal, modalData} = e.state;
        // Отменяем стандартное событие
        e.preventDefault();

        console.log('popstate');

        /*
          В общем, в чём прикол этого бреда, когда мы возвращаемся назад,
          в прошлой модалке у нас может использоваться информация из modalData
          изменять modalData сразу нельзя, т.к. тогда на модалке которая закрывается
          будет undefined
          TODO: Как вариант сохранять modalData во внутреннее состояние модалки, чтобы избавить её от зависимости и предотварить баги
        */
        changeModal(null, undefined, true);
        setTimeout(() => changeModal(modal, modalData ? JSON.parse(modalData) : null, true), 400);

        changePopout(null, true);

        // Устанавливаем новые значения для View и Panel
        changeViewPanelStory(view, panel, story, null, true);
      } else {
        changeViewPanelStory('main', 'main', 'game', null, true);
      }
    }
  }

  render() {
    const { view, story, popout } = this.props;

    return (
      <ConfigProvider
        scheme="bright_light"
        transitionMotionEnabled={false}
      >
        <AdaptivityProvider>
          <AppRoot>
            <Root
              activeView={view}
              popout={popout}
            >
              {/*// @ts-ignore*/}
              <MainLayout id="main" />
              {/*// @ts-ignore*/}
              <AuthView id="auth" />
            </Root>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}
