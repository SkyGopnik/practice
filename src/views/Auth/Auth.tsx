import React from 'react';
import axios from "axios";
import {
  Group,
  Panel,
  View,
  FormLayout,
  FormItem,
  Input,
  Button,
  Link,
  Subhead,
  Title, Snackbar, Avatar
} from "@vkontakte/vkui";
import {Icon16Cancel} from "@vkontakte/icons";

import {AppReducerInterface} from "src/store/app/reducers";

import style from './Auth.scss';

interface IProps extends AppReducerInterface {
  id: string
}

interface FormItem {
  value: string,
  error: null | string
}

interface IState {
  tab: 'login' | 'reg',
  login: FormItem,
  password: FormItem
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'login',
      login: {
        value: '',
        error: null
      },
      password: {
        value: '',
        error: null
      }
    };

    this.auth = this.auth.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  changeTab(tab: 'login' | 'reg') {
    this.setState({
      tab
    });
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    let error = '';

    if (value.length === 0) {
      error = 'Поле обязательно для заполнения';
    }

    this.setState({
      ...this.state,
      [name]: {
        value,
        error
      }
    });
  }

  async auth() {
    const { changeSnackbar, changeView } = this.props;
    const { tab, login, password } = this.state;

    try {
      const { data } = await axios.post('/auth/' + tab, {
        login: login.value,
        password: password.value
      });

      axios.defaults.headers.common.token = data.token;
      localStorage.setItem('token', data.token);

      changeView('main');
    } catch (e) {
      console.log(e);

      changeSnackbar(
        <Snackbar
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          <div>Произошла ошибка</div>
          <div>{JSON.stringify(e.response.data.message)}</div>
        </Snackbar>
      );
    }
  }

  getError(item: FormItem) {
    return item.error ? item.error : null;
  }

  getStatus(item: FormItem) {
    return item.error !== null ? (item.error ? 'error' : 'valid') : 'default';
  }

  checkDisabled() {
    const { login, password } = this.state;

    return (
      (login.value === null || login.error !== '')
      || (password.value === null || password.error !== '')
    );
  }

  render() {
    const { snackbar } = this.props;
    const {
      tab,
      login,
      password
    } = this.state;
    const buttonDisabled = this.checkDisabled();

    return (
      <View activePanel="main">
        <Panel id="main" className={style.auth}>
          <Group className={style.form}>
            <FormLayout>
              <FormItem className={style.middle}>
                <Title level="1" weight="regular">{tab === 'login' ? 'Авторизация' : 'Регистрация'}</Title>
              </FormItem>
              <FormItem
                top="Логин"
                bottom={this.getError(login)}
                status={this.getStatus(login)}
              >
                <Input
                  name="login"
                  type="text"
                  placeholder="Введите логин"
                  value={login.value}
                  onChange={this.handleInputChange}
                />
              </FormItem>
              <FormItem
                top="Пароль"
                bottom={this.getError(password)}
                status={this.getStatus(password)}
              >
                <Input
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password.value}
                  onChange={this.handleInputChange}
                />
              </FormItem>
              <FormItem className={style.middle}>
                {tab === 'login' ? (
                  <Subhead weight="regular">
                    <div>Еще не зарегистрированы?</div>
                    <Link onClick={() => this.changeTab('reg')}>Регистрация</Link>
                  </Subhead>
                ) : (
                  <Subhead weight="regular">
                    <div>Уже зарегистрированы?</div>
                    <Link onClick={() => this.changeTab('login')}>Войти</Link>
                  </Subhead>
                )}
              </FormItem>
              <FormItem>
                <Button
                  size="l"
                  stretched
                  disabled={buttonDisabled}
                  onClick={this.auth}
                >
                  {tab === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </FormItem>
            </FormLayout>
          </Group>
          {snackbar}
        </Panel>
      </View>
    );
  }
}
