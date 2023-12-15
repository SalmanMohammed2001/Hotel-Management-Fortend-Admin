import {getKey} from "../db/db.js";

export class UserController {
    constructor() {

        $('#btnSaveUser').click(e => {
            this.saveUser()
        })

        $('#search').keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let customerMail = $('#search').val();
                console.log(customerMail)
                this.searchCustomer(customerMail)
            }

        });


        $('#btnClear').click(e => {
            this.clearForm()
        })

        $('#btnDelete').click(e => {
            this.delete()
        })

        $('#btnUpdate').click(e => {
            this.updateUser()
        })


        $('#header-inner-user').click(e => {
            $('#user-form').hide()
            $('#dashboard-form').show()

        })


    }
    clearForm() {
        $("#userName").val('');
        $("#password").val('');
        $("#email").val('');
        $("#birthday").val('');
        $("#gender").val('');
        $('#profilePic').val('');
        $('#nicFront').val('');
        $('#nicRear').val('');
        $("#nicNo").val('');

        // Change the src of the image elements
        $("#profilePic-img-show").attr('src', '');
        $("#nicRear-img-show").attr('src', '');
        $("#nicFront-img-show").attr('src', '');
        // $("#user_email").prop('readonly', false);


    }

    callMethod() {
        $('#tblCustomerJson>tr').click(function () {

            let id = $(this).children().eq(0).text()
            let name = $(this).children().eq(1).text()
            let email = $(this).children().eq(2).text()
            let password = $(this).children().eq(3).text()
            let ContactNo = $(this).children().eq(4).text()
            let NicNo = $(this).children().eq(5).text()
            let Address = $(this).children().eq(6).text()
            let Birthday = $(this).children().eq(7).text()
            let Gender = $(this).children().eq(8).text()


            $('#userName').val(responseData.username);
            $('#nicNo').val(responseData.usernic);
            $('#contact').val(responseData.contact);
            $('#email').val(responseData.email);
            $('#birthday').val(responseData.birthday);
            $('#password').val(responseData.password)
            $('#gender').val(responseData.gender);
            $("#nicNo").val(responseData.usernic);

        })

    }

    delete(){
        var settings = {
            "url": "http://localhost:8081/api/v1/user?email="+$('#email').val(),
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
        };


        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#btnClear').trigger('click');
        });

    }

    updateUser() {
        let userName = $('#userName').val();
        let email = $('#email').val()
        let password = $('#password').val()
        let birthday = $('#birthday').val()
        let contact = $('#contact').val()
        let gender = $('#gender').val();
        var profilePic = $('#profilePic').prop('files')[0];
        var nicFront = $('#nicFront').prop('files')[0];
        var nicRear = $('#nicRear').prop('files')[0];
        let nicNo = $("#nicNo").val();


        var form = new FormData();
        form.append("userName", userName);
        form.append("email", email);
        form.append("password", password);
        form.append("birthday", birthday);
        form.append("password", password);
        form.append("gender", gender);
        form.append("contact", contact);
        form.append("nicNo", nicNo);
        if (profilePic) {
            form.append("profilePic", profilePic, "ab.jpg");
        }
        if (nicFront) {
            form.append("nicFront", nicFront, "aa.jpg");
        }
        if (nicRear) {

            form.append("nicRear", nicRear, "ac.jpg");

        }

       /* if(!profilePic){
            profilePic=this.dataURLtoFile($('#profilePic-img-show').attr("src"),"")
        }*/

            var settings = {
                "url": "http://localhost:8081/api/v1/user/0",
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + getKey()
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };


        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#btnClear').trigger('click');
        });

    }


    searchCustomer(email) {
        var settings = {
            "url": "http://localhost:8081/api/v1/user/0/" + email,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };

        $.ajax(settings).done(function (responseData) {

            $("#email").prop('readonly', true);
            /* console.log(responseData.nicFrontByte)
             console.log(responseData.nicRearByte)
             console.log(responseData.profilePic)
             console.log(responseData.nicFront)
             console.log(responseData.nicRear)*/
            console.log(responseData.password)

            $('#userName').val(responseData.username);
            $('#nicNo').val(responseData.usernic);
            $('#contact').val(responseData.contact);
            $('#email').val(responseData.email);
            $('#birthday').val(responseData.birthday);
            $('#password').val(responseData.password)
            $('#gender').val(responseData.gender);

            $("#nicNo").val(responseData.usernic);


            $('#nicFront-img-show').attr('src', "data:image/jpeg;base64," + responseData.nicFront); // Set the src attribute for an image element
            $('#nicRear-img-show').attr('src', "data:image/jpeg;base64," + responseData.nicRear);   // Set the src attribute for an image element
            $('#gender').val(responseData.gender)
            $('#profilePic-img-show').attr('src', "data:image/jpeg;base64," + responseData.profilePic); // Set the src attribute for an image element


            $('#search').val('')

        });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }


    saveUser() {
        let userName = $('#userName').val();
        let email = $('#email').val()
        let password = $('#password').val()
        let birthday = $('#birthday').val()
        let contact = $('#contact').val()
        let gender = $('#gender').val();
        let nicNo = $("#nicNo").val();
        var profilePic = $('#profilePic').prop('files')[0];
        var nicFront = $('#nicFront').prop('files')[0];
        var nicRear = $('#nicRear').prop('files')[0];


        console.log(userName)
        console.log(email)
        console.log(password)
        console.log(birthday)
        console.log(gender)
        console.log(contact)
        console.log(profilePic)
        console.log(nicFront)
        console.log(nicRear)
        console.log(nicNo)


        var form = new FormData();
        form.append("userName", userName);
        form.append("email", email);
        form.append("password", password);
        form.append("birthday", birthday);
        form.append("password", password);
        form.append("gender", gender);
        form.append("contact", contact);
        if (profilePic)
            form.append("profilePic", profilePic, "ab.jpg");
        if (nicFront)
            form.append("nicFront", nicFront, "aa.jpg");
        if (nicRear)
            form.append("nicRear", nicRear, "ac.jpg");


        form.append("nicNo", nicNo);


        var settings = {
            "url": "http://localhost:8081/api/v1/user/0",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey(),
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);

            $('#btnClear').trigger('click');

        }).fail(e => {
            console.log(e.code)
        });

    }



}

new UserController()