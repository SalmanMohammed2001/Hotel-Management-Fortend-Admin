import {saveKey} from "../db/db.js";


export class Login{
    constructor() {
        $('#btnLogin').click(e => {
            e.preventDefault()
            this.loginAction();
        })


    }

    loginAction() {
        console.log('xxxx')
          let userName = $('#txtUserName').val();
          let password = $('#txtPassword').val();

        console.log(userName)
        console.log(password)


          var settings = {
              "url": "http://localhost:8080/api/v1/login",
              "method": "POST",
              "timeout": 0,
              "headers": {
                  "Content-Type": "application/json"
              },
              "data": JSON.stringify({
                  "password": password,
                  "email": userName
              }),
          };

          $.ajax(settings).done(function (response) {
              let token = response.token;
              saveKey("",token)
              console.log(token)
              $('#login-form').hide()
              $('#dashboard-form').show()
          }).fail(e=>{
              console.log(e.responseJSON.message)
          });
      }

      another(){
          console.log("Another");
      }


}
new Login()

