let formItems =  {
    username: {
      name: 'username',
      regExp: /^[a-zA-Zа-яА-Я]{0,20}$/i,
    },
    email: {
      name: 'email',
      regExp: /.+@.+\..+/i,
    },
    phone: {
      name: 'phone',
      type: 'text',
      regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    },
    date: {
      name: 'date',
      // regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
      errorMsg: 'Некорректная дата',
    },
    password: {
      name: 'password',
      regExp: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
    },
    passwordRepeat: {
      name: 'password-repeat',
    },
  };
