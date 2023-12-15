import {getKey} from "../db/db.js";

export class HotelController {
    constructor() {
        $("#btnSaveHotel").click(e => {
            e.preventDefault();
            this.save();
        })

        $('#hotelSearch').keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let guideCode = $('#hotelSearch').val();
                console.log(guideCode)
                this.hotelSearch(guideCode)
            }

        });




    }

    save() {
        let h_name = $("#hotelName").val();
        let h_address = $("#hotelAddress").val();
        let h_star_rate = $("#hotelStarRate").val();
        let isPetAllowed = $("#petAllowed").val()
        let h_location = $("#hotelLocation").val();
        let h_mobile1 = $("#hotelMobile1").val();
        let h_mobile2 = $("#hotelMobile2").val();
        let h_email = $("#hotelMail").val();
        let full_board_with_ac_luxury_room_double = $("#type1").val();
        let half_board_with_ac_luxury_room_double = $("#type2").val();
        let full_board_with_ac_luxury_room_triple = $("#type3").val();
        let half_board_with_ac_luxury_room_triple = $("#type4").val();
        let h_view1 = $("#hotelImage1").prop("files")[0];
        let h_view2 = $("#hotelImage2").prop("files")[0];
        let h_view3 = $("#hotelImage3").prop("files")[0];
        let h_view4 = $("#hotelImage4").prop("files")[0];

        console.log(h_mobile1)
        console.log(h_mobile2)

        var form = new FormData();

        form.append("name", h_name);
        form.append("petAllowed", isPetAllowed);
        form.append("mapLink", h_location);
        form.append("address", h_address);
        form.append("phone", h_mobile1[0]);
        form.append("phone", h_mobile2[1]);
        form.append("email", h_email);
        form.append("prices", "[" +
            "{\"key\" : \"full-board-with-ac-luxery-room-double\",\"value\" : " + full_board_with_ac_luxury_room_double + "}" +
            ",{\"key\" : \"half-board-with-ac-luxery-room-double\",\"value\" : " + half_board_with_ac_luxury_room_double + "}," +
            "{\"key\" : \"half-board-with-ac-luxery-room-triple\",\"value\" : " + half_board_with_ac_luxury_room_triple + "}," +
            "{\"key\" : \"full-board-with-ac-luxery-room-triple\",\"value\" : " + full_board_with_ac_luxury_room_triple + "}]");

        form.append("remarks", "none");
        form.append("category", h_star_rate);
        form.append("files", h_view1, "h_1.jpg");
        form.append("files", h_view2, "h_2.jpg");
        form.append("files", h_view3, "h_3.jpg");
        form.append("files", h_view4, "h_4.jpg");

        var settings = {
            "url": "http://localhost:8082/api/v1/hotel",
            "method": "POST",
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
        });

    }


    hotelSearch(id) {
        console.log('http://localhost:8082/api/v1/hotel/' + id)
        var settings = {
            "url": "http://localhost:8082/api/v1/hotel/" + id,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };


        $.ajax(settings).done(function (hotelData) {
            console.log(hotelData[0].phone);

           /// Set response data to the HTML elements
            let id=  $("#hotelId").val(hotelData.id);
            console.log(id)
             $("#hotelName").val(hotelData[0].name);
              $("#hotelAddress").val(hotelData[0].address);
              $("#hotelStarRate").val(hotelData[0].category);
              $("#petAllowed").val(hotelData[0].petAllowed);
              $("#hotelLocation").val(hotelData[0].mapLink);
              $("#hotelMobile1").val(hotelData[0].phone[0]);
              $("#hotelMobile2").val(hotelData[0].phone[1]);
              $("#hotelMail").val(hotelData[0].email);

              //$("#type1").val(5000)

              let imgs = ["#hotelImage1View", "#hotelImage2View", "#hotelImage3View", "#hotelImage4View"];

              hotelData[0].prices.forEach(element => {
                  if (element.key === "full-board-with-ac-luxery-room-double") {
                      $("#type1").val(element.value)
                  }
                  if (element.key === "half-board-with-ac-luxery-room-double") {
                      $("#type2").val(parseInt(element.value));
                  }
                  if (element.key === "full-board-with-ac-luxery-room-triple") {
                      $("#type3").val(element.value);
                  }
                  if (element.key === "half-board-with-ac-luxery-room-triple") {
                      $("#type4").val(element.value);
                  }
              });

              let i = 0;
              for (const hotelDataKey of hotelData[0].images) {
                  console.log(imgs[i])
                  $(`${imgs[i++]}`).prop("src", "data:image/jpeg;base64," + hotelDataKey)
              }

          });

    }



}
new HotelController()