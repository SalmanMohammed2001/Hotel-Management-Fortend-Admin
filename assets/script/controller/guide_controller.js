import {getKey} from "../db/db.js";

export class GuideController{
    constructor() {
        $("#btnSaveGuide").click(e=>{
            e.preventDefault();
            this.save();
        })


        $('#GuideSearch').keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let guideCode = $('#GuideSearch').val();
                console.log(guideCode)
                this.searchGuide(guideCode)
            }

        });

        $("#btnUpdateGuide").click(e=>{
            e.preventDefault();
            this.update();
        });

        $('#btnClearGuide').click(e=>{
            this.clear()
        })

        $('#btnDeleteGuide').click(e=>{
           this .deleteGuide()
        })


    }


    deleteGuide(){
        var settings = {
            "url": "http://localhost:8084/api/v1/guide/"+$("#guideId").val(),
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,

        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#btnClearGuide').trigger('click');
        });
    }
    save(){
        let guideName = $("#guideName").val();
        let guideAddress = $("#guideAddress").val();
        let guideContact = $("#guideContact").val();
        let guideBirthDate = $("#guideBirthDate").val();
        let guideManDayValue = $("#guideManDayValue").val();
        let guideExperience = $("#guideExperience").val();

        let guideIdFront = $("#guideIdFront").prop("files")[0];
        let guideIdRear = $("#guideIdRear").prop("files")[0];
        let guideNicFront = $("#guideNicFront").prop("files")[0];
        let guideNicRear = $("#guideNicRear").prop("files")[0];
        let guideProfilePic = $("#guideProfilePic").prop("files")[0];

        var form = new FormData();
        form.append("guideName", guideName);
        form.append("guideAddress", guideAddress);
        form.append("guideContact", guideContact);
        form.append("guideBirthDate", guideBirthDate);
        form.append("guideManDayValue", guideManDayValue);
        form.append("guideExperience", guideExperience);
        form.append("guideIdFront", guideIdFront, "guide_id_front.jpg");
        form.append("guideIdRear", guideIdRear, "guide_id_rear.jpg");
        form.append("guideNicFront", guideNicFront, "guide_nic_front.jpg");
        form.append("guideNicRear", guideNicRear, "guide_nic_rear.jpg");
        form.append("guideProfilePic", guideProfilePic, "guide_profile_pic.jpg");

        var settings = {
            "url": "http://localhost:8084/api/v1/guide",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXNpbmR1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiU2FtcGF0aCBCYW5kYXJhIiwidXNlclBhc3N3b3JkIjoiMzMzMzMiLCJyb2xlcyI6WyJHdWlkZV9BZG1pbiJdLCJleHAiOjE5MTM2NTAwODN9.LtjSBTNfrfmaJv-U3BufOiq5sYoPqvWQexCtNSFMIKo"
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#btnClearGuide').trigger('click');
        });

    }

    searchGuide(guideCode){
        console.log('http://localhost:8084/api/v1/guide/'+guideCode)
            var settings = {
                "url": "http://localhost:8084/api/v1/guide/"+guideCode,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + getKey()
                },
            };

            $.ajax(settings).done(function (response) {
                $("#guideId").val(response.id);
                $("#guideName").val(response.name);
                $("#guideAddress").val(response.address);
                $("#guideContact").val(response.contact);
                $("#guideBirthDate").val(response.birthDate);
                $("#guideManDayValue").val(response.manDayValue);
                $("#guideExperience").val(response.experience);

                $("#guideProfilePicImg").prop("src",`data:image/jpg;base64,${response.profilePic}`);
                $("#guideIdFrontImg").prop("src",`data:image/jpg;base64,${response.guideIdFront}`);
                $("#guideIdRearImg").prop("src",`data:image/jpg;base64,${response.guideIdRear}`);
                $("#guideNicFrontImg").prop("src",`data:image/jpg;base64,${response.nicFront}`);
                $("#guideNicRearImg").prop("src",`data:image/jpg;base64,${response.nicRear}`);
                console.log(response);
            });
        }
    update(){
        let guideName = $("#guideName").val();
        let guideAddress = $("#guideAddress").val();
        let guideContact = $("#guideContact").val();
        let guideBirthDate = $("#guideBirthDate").val();
        let guideManDayValue = $("#guideManDayValue").val();
        let guideExperience = $("#guideExperience").val();

        let guideIdFront = $("#guideIdFront").prop("files")[0];
        let guideIdRear = $("#guideIdRear").prop("files")[0];
        let guideNicFront = $("#guideNicFront").prop("files")[0];
        let guideNicRear = $("#guideNicRear").prop("files")[0];
        let guideProfilePic = $("#guideProfilePic").prop("files")[0];



        if (!guideIdFront){
            guideIdFront = this.dataURLtoFile($("#guideIdFrontImg").attr("src"), "guide_id_front.jpg");
        }
        if (!guideIdRear){
            guideIdRear = this.dataURLtoFile($("#guideIdRearImg").attr("src"), "guide_id_rear.jpg");
        }
        if (!guideProfilePic){
            guideProfilePic = this.dataURLtoFile($("#guideProfilePicImg").attr("src"), "guide_profile_pic.jpg");
        }
        if (!guideNicFront){
            guideNicFront = this.dataURLtoFile($("#guideNicFrontImg").attr("src"), "guide_nic_front.jpg");
        }
        if (!guideNicRear){
            guideNicRear = this.dataURLtoFile($("#guideNicRearImg").attr("src"), "guide_nic_rear.jpg");
        }

        var form = new FormData();
        form.append("guideName", guideName);
        form.append("guideAddress", guideAddress);
        form.append("guideContact", guideContact);
        form.append("guideBirthDate", guideBirthDate);
        form.append("guideManDayValue", guideManDayValue);
        form.append("guideExperience", guideExperience);
        form.append("guideIdFront", guideIdFront, "guide_id_front.jpg");
        form.append("guideIdRear", guideIdRear, "guide_id_rear.jpg");
        form.append("guideNicFront", guideNicFront, "guide_nic_front.jpg");
        form.append("guideNicRear", guideNicRear, "guide_nic_rear.jpg");
        form.append("guideProfilePic", guideProfilePic, "guide_profile_pic.jpg");

        var settings = {
            "url": "http://localhost:8084/api/v1/guide/"+$("#guideId").val(),
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            $('#btnClearGuide').trigger('click');
        });


    }

    clear(){
        $("#guideId").val("");
        $("#guideName").val("");
        $("#guideAddress").val("");
        $("#guideContact").val("");
        $("#guideBirthDate").val("");
        $("#guideManDayValue").val("");
        $("#guideExperience").val("");

        $("#guideProfilePicImg").prop("src","");
        $("#guideIdFrontImg").prop("src","");
        $("#guideIdRearImg").prop("src","");
        $("#guideNicFrontImg").prop("src","");
        $("#guideNicRearImg").prop("src"," ");
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

}

new GuideController();