class Login {
  get username()               { return "#username"};
  get password()               { return "#password"};
  get btnLogIn()               { return "#kc-login"};
  get errorField()			   { return "#kc-content-wrapper > div.alert.alert-error"};
}

module.exports = { Login: Login };
