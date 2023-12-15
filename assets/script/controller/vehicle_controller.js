import {getKey} from "../db/db.js";

export class VehicleController{

    constructor() {
        $("#btnSaveVehicle").click(e => {
            e.preventDefault();
            this.saveData();
        })

        $('#vehicleSearch').keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let vehicleType = $('#vehicleSearch').val();
                console.log(vehicleType)
                this.searchVehicle(vehicleType)
            }

        });

        $('#btnClearVehicle').click(e=>{
            this.clearFormVehicle()
        })

        $('#btnUpdateVehicle').click(e=>{
            this.updateVehicle();
        })

        $('#btnDeleteVehicle').click(e=>{
            this.deleteVehicle()
        })

    }
    clearFormVehicle() {
        // Set vehicle information
        $("#vehicleId").val("");
        $("#vehicleName").val("");
        $("#fuelType").val("");
        $("#isHybrid").val("")
        $("#priceFor1Km").val("");
        $("#priceFor100Km").val("");
        $("#fuelUsage").val("");
        $("#noOfSeats").val("");
        $("#vehicleType").val("");
        $("#category").val("");
        $('#transmission').val("")



        // Assuming these fields are for the driver information
        $("#driverName").val("");
        $("#driverContactNO").val("");
        $("#driverNicNo").val("");
        $("#driverId").val("");
        $('#driverRemarks').val("")

        // Assuming these fields are for driver license images
        // Assuming 'licenseImageFront' and 'licenseImageRear' are byte arrays in vehicleDTO
        // You'll need to handle these separately, possibly using FileReader to display images
        // Assuming 'vehicleDTO' is the response from your Spring Boot API

        // Display vehicle images
        $('#vehicle_front_view_img').attr('src', ``);
        $('#vehicle_rear_view_img').attr('src', ``);
        $('#vehicle_side_view_img').attr('src', ``);
        $('#vehicle_front_interior_img').attr('src', ``);
        $('#vehicle_rear_interior_img').attr('src', ``);

        // Display driver license images
        $('#licenseImageFrontShow').attr('src', ``);
        $('#licenseImageRearShow').attr('src', ``);



    }

    searchVehicle(vehicle){
        console.log(vehicle)

        var settings = {
            "url": "http://localhost:8083/api/v1/vehicle/"+vehicle,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };

        $.ajax(settings).done(function (vehicleDTO) {
            console.log(vehicleDTO);
            // Assuming 'vehicleDTO' is the response from your Spring Boot API

            // Set vehicle information
            $("#vehicleId").val(vehicleDTO.id);
            $("#vehicleName").val(vehicleDTO.vehicleName);
            $("#fuelType").val(vehicleDTO.fuelType);
            $("#isHybrid").val(vehicleDTO.hybrid)
            $("#priceFor1Km").val(vehicleDTO.priceFor1Km);
            $("#priceFor100Km").val(vehicleDTO.priceFor100Km);
            $("#fuelUsage").val(vehicleDTO.fuelUsage);
            $("#noOfSeats").val(vehicleDTO.seatCapacity);
            $("#vehicleType").val(vehicleDTO.vehicleType);
            $("#category").val(vehicleDTO.category);
            $('#transmission').val(vehicleDTO.transmission)



            // Assuming these fields are for the driver information
            $("#driverName").val(vehicleDTO.driverDTO.driverName);
            $("#driverContactNO").val(vehicleDTO.driverDTO.driverContact);
            $("#driverNicNo").val(vehicleDTO.driverDTO.driverNic);
            $("#driverId").val(vehicleDTO.driverDTO.id);
            $('#driverRemarks').val(vehicleDTO.driverDTO.driverRemarks)

            // Assuming these fields are for driver license images
            // Assuming 'licenseImageFront' and 'licenseImageRear' are byte arrays in vehicleDTO
            // You'll need to handle these separately, possibly using FileReader to display images
            // Assuming 'vehicleDTO' is the response from your Spring Boot API

            // Display vehicle images
            $('#vehicle_front_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[0]}`);
            $('#vehicle_rear_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[1]}`);
            $('#vehicle_side_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[2]}`);
            $('#vehicle_front_interior_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[3]}`);
            $('#vehicle_rear_interior_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[4]}`);

            // Display driver license images
            $('#licenseImageFrontShow').attr('src', `data:image/jpg;base64,${vehicleDTO.driverDTO.licenseImageFront}`);
            $('#licenseImageRearShow').attr('src', `data:image/jpg;base64,${vehicleDTO.driverDTO.licenseImageRear}`);


        });
    }
    saveData(){

        let vehicleName = $("#vehicleName").val();
        let fuelType = $("#fuelType").val();
        let isHybrid = $("#isHybrid").val()
        let priceFor1Km = $("#priceFor1Km").val();
        let priceFor100Km = $("#priceFor100Km").val();
        let fuelUsage = $("#fuelUsage").val();
        let noOfSeats = $("#noOfSeats").val();
        let vehicleType= $('#vehicleType').val();
        let category = $("#category").val();
        let transmission = $("#transmission").val();


        let frontview = $('#vehicle_front_view').prop('files')[0];
        let backview = $('#vehicle_rear_view').prop('files')[0];
        let front_interior = $("#vehicle_front_interior_view").prop("files")[0];
        let back_interior = $("#vehicle_side_view").prop("files")[0];





        let driverName = $("#driverName").val();
        let driverContactNO = $("#driverContactNO").val();
        let driverNicNo = $("#driverNicNo").val();
        let driverRemarks = $("#driverRemarks").val();

        let licenseImageFront = $("#licenseImageFront").prop("files")[0];
        let licenseImageRear = $("#licenseImageRear").prop("files")[0];

  /*      console.log("Name : "+vehicleName);
        console.log("Type : "+fuelType);
        console.log("Fuel Type : "+isHybrid);

        console.log("Price For 1KM : "+priceFor1Km);
        console.log("Price For 100KM : "+priceFor100Km);
        console.log("Fuel Usage : "+fuelUsage);
        console.log("Seat Capacity : "+noOfSeats);
        console.log("vehicleType : "+vehicleType);
        console.log("Category : "+category);
        console.log("Transmission : "+transmission);
        console.log("frontView : +"+frontview);
        console.log("blackView : "+backview);
        console.log("front_interior : "+front_interior);
        console.log("back_interior : "+back_interior);


        console.log("driverName : "+driverName);
        console.log("driverContact : "+driverContactNO);
        console.log("driverNic : "+driverNicNo);
        console.log("driverRemarks : "+driverRemarks);
        console.log("licenseImageFront : "+licenseImageFront);
        console.log("licenseImageRear : "+licenseImageRear);*/





       var form = new FormData();
        form.append("vehicleName", vehicleName);
        form.append("fuelType", fuelType);
        form.append("isHybrid", isHybrid);
        form.append("files", frontview);
        form.append("files", backview);
        form.append("files", front_interior);
        form.append("files", back_interior);
        form.append("priceFor1Km", priceFor1Km);
        form.append("priceFor100Km", priceFor100Km);
        form.append("fuelUsage", fuelUsage);
        form.append("noOfSeats", noOfSeats);
        form.append("vehicleType", vehicleType);
        form.append("category", category);
        form.append("transmission", transmission);
        form.append("driverName", driverName);
        form.append("driverNicNo", driverNicNo);
        form.append("driverContactNO", driverContactNO);
        form.append("licenceImageFront", licenseImageFront, "0 K7AX-9LifDGEKEoZ.jpg");
        form.append("licenceImageRear", licenseImageRear, "Importance-of-Driving-License.jpg");
        form.append("driverRemarks", "No");

       var settings = {
            "url": "http://localhost:8083/api/v1/vehicle",
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
            $('#btnClearVehicle').trigger('click');
        });
    }

    updateVehicle(){


        let vehicleName = $("#vehicleName").val();
        let fuelType = $("#fuelType").val();
        let isHybrid = $("#isHybrid").val()
        let priceFor1Km = $("#priceFor1Km").val();
        let priceFor100Km = $("#priceFor100Km").val();
        let fuelUsage = $("#fuelUsage").val();
        let noOfSeats = $("#noOfSeats").val();
        let vehicleType= $('#vehicleType').val();
        let category = $("#category").val();
        let transmission = $("#transmission").val();

        let frontview = $('#vehicle_front_view').prop('files')[0];
        let backview = $('#vehicle_rear_view').prop('files')[0];
        let front_interior = $("#vehicle_front_interior_view").prop("files")[0];
        let back_interior = $("#vehicle_side_view").prop("files")[0];

        let driverName = $("#driverName").val();
        let driverContactNO = $("#driverContactNO").val();
        let driverNicNo = $("#driverNicNo").val();
        let driverRemarks = $("#driverRemarks").val();
        let licenseImageFront = $("#licenseImageFront").prop("files")[0];
        let licenseImageRear = $("#licenseImageRear").prop("files")[0];



        if (!frontview){
            frontview = this.dataURLtoFile($('#vehicle_front_view_img').attr('src'),"Front.jpg")
        }
        if (!backview){
            backview = this.dataURLtoFile($('#vehicle_rear_view_img').attr('src'),"Back.jpg");
        }
        if (!front_interior){
            front_interior = this.dataURLtoFile($('#vehicle_front_interior_img').attr('src'),"Front.jpg");
        }
        if (!back_interior){
            back_interior = this.dataURLtoFile($('#vehicle_side_view_img').attr('src'),"Back.jpg");
        }

        if (!licenseImageFront){
            licenseImageFront = this.dataURLtoFile($('#licenseImageFrontShow').attr('src'),"Front.jpg");
        }
        if (!licenseImageRear){
            licenseImageRear = this.dataURLtoFile($('#licenseImageRearShow').attr('src'),"Back.jpg");
        }

        var form = new FormData();
        form.append("vehicleName", vehicleName);
        form.append("fuelType", fuelType);
        form.append("isHybrid", isHybrid);
        form.append("files", frontview);
        form.append("files", backview);
        form.append("files", front_interior);
        form.append("files", back_interior);
        form.append("priceFor1Km", priceFor1Km);
        form.append("priceFor100Km", priceFor100Km);
        form.append("fuelUsage", fuelUsage);
        form.append("noOfSeats", noOfSeats);
        form.append("vehicleType", vehicleType);
        form.append("category", category);
        form.append("transmission", transmission);
        form.append("driverName", driverName);
        form.append("driverNicNo", driverNicNo);
        form.append("driverContactNO", driverContactNO);
        form.append("licenceImageFront", licenseImageFront, "0 K7AX-9LifDGEKEoZ.jpg");
        form.append("licenceImageRear", licenseImageRear, "Importance-of-Driving-License.jpg");
        form.append("driverRemarks", "No");

        var settings = {
            "url": "http://localhost:8083/api/v1/vehicle/"+$("#vehicleId").val()+"/"+$('#driverId').val(),
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
            $('#btnClearVehicle').trigger('click');
        });


    }

    deleteVehicle(){
        var settings = {
            "url": "http://localhost:8083/api/v1/vehicle/"+$("#vehicleId").val(),
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
            $('#btnClearVehicle').trigger('click');
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


}
new VehicleController();

/*$('#v').click(function (){

    /!*$('#dashboard-form').show()
    $('#vehicle-form').hide()*!/
    alert("sss")
})*/
