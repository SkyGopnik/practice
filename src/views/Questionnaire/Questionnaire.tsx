import React from 'react';
import axios from "axios";
import lo from 'lodash';
import {
  Avatar, Button,
  CustomSelectOption,
  FormItem,
  FormLayout,
  Group,
  Input, NativeSelect,
  Panel,
  PanelHeader, Select, Textarea,
  View
} from "@vkontakte/vkui";

import {AppReducerInterface} from "src/store/app/reducers";
import {UserInterface} from "src/store/user/reducers";

interface IProps extends AppReducerInterface {
  id: string,
  user: UserInterface,
  syncUser(data: any)
}

interface FormItem {
  value: string,
  error: null | string,
  rules?: {
    required?: boolean
  }
}

interface IState {
  firstName: FormItem,
  lastName: FormItem,
  age: FormItem,
  sex: FormItem,
  phone: FormItem,
  about: FormItem
}

const inputs = [
  {
    name: 'firstName',
    title: 'Имя',
    type: 'text',
    placeholder: 'Алексей'
  },
  {
    name: 'lastName',
    title: 'Фамилия',
    type: 'text',
    placeholder: 'Панин'
  },
  {
    name: 'age',
    title: 'Возраст',
    type: 'number',
    placeholder: '17'
  },
  {
    name: 'sex',
    title: 'Пол',
    type: 'text',
    placeholder: '',
    options: [
      {
        label: 'Не выбран',
        value: 0
      },
      {
        label: 'Женский',
        value: 1
      },
      {
        label: 'Мужской',
        value: 2
      },
    ]
  },
  {
    name: 'phone',
    title: 'Номер телефона',
    type: 'text',
    placeholder: '89453421256'
  },
  {
    name: 'about',
    title: 'О себе',
    type: 'text',
    placeholder: 'Образован, красив и просто персик'
  }
];

const form = {
  firstName: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  },
  lastName: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  },
  age: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  },
  sex: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  },
  phone: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  },
  about: {
    value: '',
    error: null,
    rules: {
      required: true
    }
  }
};

export class Questionnaire extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);


    this.state = {
      ...form
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    const { user } = this.props;

    if (user && !lo.isEqual(user.questionnaire, prevProps.user && prevProps.user.questionnaire)) {
      const newForm = { ...this.state };

      ['firstName', 'lastName', 'sex', 'age', 'phone', 'about'].forEach((name) => {
        newForm[name].value = user.questionnaire[name];
      });

      this.setState({
        ...newForm
      });
    }
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

  isFormValid() {
    let isValid = true;

    inputs.forEach((item) => {
      const { value, rules } = this.state[item.name];

      if (value.length == 0 && rules && rules.required) {
        isValid = false;
      }
    });

    return isValid;
  }

  getError(name: string) {
    const item: FormItem = this.state[name];

    return item.error ? item.error : null;
  }

  getStatus(name: string) {
    const item: FormItem = this.state[name];

    return item.error !== null ? (item.error ? 'error' : 'valid') : 'default';
  }

  async sendQuestionnaire() {
    const { user, syncUser, changeSnackbar } = this.props;

    const {
      firstName,
      lastName,
      age,
      sex,
      phone,
      about
    } = this.state;

    try {
      const { data } = await axios.post('/questionnaire/', {
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
        sex: sex.value,
        phone: phone.value,
        about: about.value
      });

      syncUser(lo.merge(user, {
        questionnaire: data
      }));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const buttonDisabled = !this.isFormValid();

    return (
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Анкета</PanelHeader>
          <Group>
            <FormLayout>
              {inputs.map((item, index) => (
                <FormItem
                  key={index}
                  top={item.title}
                  bottom={this.getError(item.name)}
                  status={this.getStatus(item.name)}
                >
                  {item.name !== 'sex' && item.name !== 'about' && (
                    <Input
                      name={item.name}
                      type={item.type}
                      value={this.state[item.name].value}
                      placeholder={item.placeholder}
                      onChange={this.handleInputChange}
                    />
                  )}
                  {item.name === 'sex' && (
                    <NativeSelect
                      name={item.name}
                      value={this.state[item.name].value}
                      onChange={this.handleInputChange}
                    >
                      {item.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </NativeSelect>
                  )}
                  {item.name === 'about' && (
                    <Textarea
                      name={item.name}
                      value={this.state[item.name].value}
                      placeholder={item.placeholder}
                      onChange={this.handleInputChange}
                    />
                  )}
                </FormItem>
              ))}
              <FormItem>
                <Button
                  size="l"
                  disabled={buttonDisabled}
                  stretched
                  onClick={() => this.sendQuestionnaire()}
                >
                  Сохранить
                </Button>
              </FormItem>
            </FormLayout>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default Questionnaire;
