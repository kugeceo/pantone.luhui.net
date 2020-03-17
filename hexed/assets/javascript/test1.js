var config = {
    apiKey: "AIzaSyCUr1lqtPtcstJIoxatseGsne6ns_q7XYM",
    authDomain: "hexed-149b0.firebaseapp.com",
    databaseURL: "https://hexed-149b0.firebaseio.com",
    projectId: "hexed-149b0",
    storageBucket: "hexed-149b0.appspot.com",
    messagingSenderId: "1067070807723"
  };
  
firebase.initializeApp(config);

var database = firebase.database();


var palette = "palette=PantoneC";


// var colors = [];

// var url = "https://i.imgur.com/t8GBxnZ.jpg";
// var enc_url = encodeURIComponent("https://i.imgur.com/t8GBxnZ.jpg");
var hex = [];
var pantone = [];
// var queryURL = "https://fathomless-plains-61908.herokuapp.com/?link=" + enc_url + "&" + palette;
// var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
$(document).ready( function(){
     
$("#get_palette").on("click", function() {

      event.preventDefault();
      
      $("#Last_Palette").empty();
      $("#userLikeSaved").empty();
      $("#primaryHex").empty();
      $("#primaryPantone").empty();
      $("#secondaryHex").empty();
      $("#secondaryPantone").empty();
      $("#tertiaryHex").empty();
      $("#tertiaryPantone").empty();

      var url = $("#url_input").val();
      var enc_url = encodeURIComponent(url);
      $("#url_input").val("");
      var queryURL = "https://fathomless-plains-61908.herokuapp.com/?link=" + enc_url + "&" + palette;
      $.ajax({
      url: queryURL,
      method: "GET",
      success: function(json){
      console.log('EXCELLENT!');
               //perform operation
        },
        error: function() {
        console.log('BOGUS!');
        $("#Last_Palette").prepend(`
          <div>
            <img src="IMG_7366.jpg" alt="" class="url_img">
          </div>`);
       }
    }).done(function(response) {
      console.log(response);
      // var results = Json.parse(response);
      // console.log(response[0].primary.hex);
        hex[0]=response[0].primary.hex;
        pantone[0]=response[0].primary.name;
        hex[1]=response[0].secondary.hex;
        pantone[1]=response[0].secondary.name;
        hex[2]=response[0].tertiary.hex;
        pantone[2]=response[0].tertiary.name;

        database.ref().push({
          url: url,
          prim_hex: hex[0],
          prim_pant: pantone[0],
          sec_hex: hex[1],
          sec_pant: pantone[1],
          tert_hex: hex[2],
          tert_pant: pantone[2],
      });
    });

    });

     database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
      $("#Last_Palette").prepend(
        `<div>
          <img src="` + snapshot.val().url + `" alt="" class="url_img">
        </div>`
        );

      $("#primaryHex").append(snapshot.val().prim_hex).css("background-color", snapshot.val().prim_hex);
      $("#primaryPantone").append(snapshot.val().prim_pant).css("background-color", snapshot.val().prim_hex);
      $("#secondaryHex").append(snapshot.val().sec_hex).css("background-color", snapshot.val().sec_hex);
      $("#secondaryPantone").append(snapshot.val().sec_pant).css("background-color", snapshot.val().sec_hex);
      $("#tertiaryHex").append(snapshot.val().tert_hex).css("background-color", snapshot.val().tert_hex);
      $("#tertiaryPantone").append(snapshot.val().tert_pant).css("background-color", snapshot.val().tert_hex);

      $("#userLikeSaved").append(
        `<div class="emailContent">
          <span>${snapshot.val().prim_hex}</span>&nbsp;&nbsp;
          <span>${snapshot.val().prim_pant}</span>
          <br>
          <span>${snapshot.val().sec_hex}</span>&nbsp;&nbsp;
          <span>${snapshot.val().sec_pant}</span>
          <br>
          <span>${snapshot.val().tert_hex}</span>&nbsp;&nbsp; 
          <span>${snapshot.val().tert_pant}</span>
        </div>`
      );


      var send_email = hex.concat(pantone);
      send_email.splice(0,0,"Primary Hex");
      send_email.splice(2,0,"Secondary Hex");
      send_email.splice(4,0,"Tertiary Hex");
      send_email.splice(6,0,"Primary Pantone");
      send_email.splice(8,0,"Secondary Pantone");
      send_email.splice(10,0,"Tertiary Pantone");

      $("#message_html").val(send_email.toString());
      // var app = angular.module('myApp', []);
      // app.controller('myCtrl', function($scope) {
      //   $scope.name = "farts";
      // });
      database.ref().onDisconnect().remove();
  });


  (function() {
    var cx = '000614227564380928360:tx02h79kr_m';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
  var myform = $("form#myform");
  myform.submit(function(event){
  event.preventDefault();

  // Change to your service ID, or keep using the default service
  var service_id = "default_service";
  var template_id = "template_twHIZmp5";

  myform.find("button").text("Sending...");
  emailjs.sendForm(service_id,template_id,"myform")
    .then(function(){ 
      alert("Sent!");
       myform.find("button").text("Send");
      $("#from_name").val("");
      $("#message_html").val("");

    }, function(err) {
       alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
       myform.find("button").text("Send");
    });
  return false;
});
});

// 1. Load the JavaScript client library.
// gapi.load('client', start);