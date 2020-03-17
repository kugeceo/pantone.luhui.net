//configuration object for firebase database
var config = {
    apiKey: "AIzaSyCUr1lqtPtcstJIoxatseGsne6ns_q7XYM",
    authDomain: "hexed-149b0.firebaseapp.com",
    databaseURL: "https://hexed-149b0.firebaseio.com",
    projectId: "hexed-149b0",
    storageBucket: "hexed-149b0.appspot.com",
    messagingSenderId: "1067070807723"
  };
//initializing firebase  
firebase.initializeApp(config);
//setting firebase database to variable database
var database = firebase.database();
//creating arrays to hold specific data from JSON data
var hex = [];
var pantone = [];

$(document).ready( function(){     
  //emptying all divs of content. 
  $("#Last_Palette").empty();
  $("#userLikeSaved").empty();
  $("#primaryHex").empty();
  $("#primaryPantone").empty();
  $("#secondaryHex").empty();
  $("#secondaryPantone").empty();
  $("#tertiaryHex").empty();
  $("#tertiaryPantone").empty();
  
  // Function triggered on click function that sends the api call
  $("#get_palette").on("click", function() {
    //Stopping page from perfoming default function
    event.preventDefault();
    //emptying all divs of content. 
    $("#Last_Palette").empty();
    $("#userLikeSaved").empty();
    $("#primaryHex").empty();
    $("#primaryPantone").empty();
    $("#secondaryHex").empty();
    $("#secondaryPantone").empty();
    $("#tertiaryHex").empty();
    $("#tertiaryPantone").empty();

    //getting the url value from the user, encoding url for api call, and concatenating it to variable
    var url = $("#url_input").val();
    var enc_url = encodeURIComponent(url);
    $("#url_input").val("");
    var queryURL = "https://fathomless-plains-61908.herokuapp.com/?link=" + enc_url + "&palette=PantoneC";
    
    //Ajax function to get JSON data
    $.ajax({
      url: queryURL,
      method: "GET",
      success: function(json){
      console.log('EXCELLENT!');//If data was received back from api
      },
      error: function() { //If error message was sent back from server
      console.log('BOGUS!');
      $("#Last_Palette").prepend(`
      <div>
        <img src="assets/images/IMG_7366.jpg" alt="" class="url_img">
      </div>`);
       }
      }).done(function(response) {
        //When data is received, putting specific data into corresponding arrays
        hex[0]=response[0].primary.hex;
        pantone[0]=response[0].primary.name;
        hex[1]=response[0].secondary.hex;
        pantone[1]=response[0].secondary.name;
        hex[2]=response[0].tertiary.hex;
        pantone[2]=response[0].tertiary.name;

        database.ref().push({//putting data parsed from JSON into the Firebase database
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

    //Function to add picture and JSON info gathered from api to screen
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  $("#Last_Palette").prepend(
    `<div>
    <img src="` + snapshot.val().url + `" alt="" class="url_img">
    </div>`);
      
    //adding data to corresponding divs from Firebase
    $("#primaryHex").append(snapshot.val().prim_hex).css("background-color", snapshot.val().prim_hex);
    $("#primaryPantone").append(snapshot.val().prim_pant).css("background-color", snapshot.val().prim_hex);
    $("#secondaryHex").append(snapshot.val().sec_hex).css("background-color", snapshot.val().sec_hex);
    $("#secondaryPantone").append(snapshot.val().sec_pant).css("background-color", snapshot.val().sec_hex);
    $("#tertiaryHex").append(snapshot.val().tert_hex).css("background-color", snapshot.val().tert_hex);
    $("#tertiaryPantone").append(snapshot.val().tert_pant).css("background-color", snapshot.val().tert_hex);
    $("#userLikeSaved").append(`
      <br>
      <span><mark>${snapshot.val().prim_hex}</mark></span>
      <span><mark>${snapshot.val().sec_hex}<mark></span>
      <span><mark>${snapshot.val().tert_hex}<mark></span>
      <br><br><br>
      `);

    $("#message_html").append(
      `<span>${snapshot.val().prim_hex}</span>&nbsp;&nbsp;
      <span>${snapshot.val().prim_pant}</span>
      <br>
      <span>${snapshot.val().sec_hex}</span>&nbsp;&nbsp;
      <span>${snapshot.val().sec_pant}</span>
      <br>
      <span>${snapshot.val().tert_hex}</span>&nbsp;&nbsp; 
      <span>${snapshot.val().tert_pant}</span>`);

      // Adds the names of specific colors into the array
      var send_email = hex.concat(pantone);
      send_email.splice(0,0,"Primary Hex");
      send_email.splice(2,0,"Secondary Hex");
      send_email.splice(4,0,"Tertiary Hex");
      send_email.splice(6,0,"Primary Pantone");
      send_email.splice(8,0,"Secondary Pantone");
      send_email.splice(10,0,"Tertiary Pantone");
      //converts the array into a string and puts it in corresponding id
      $("#message_html").val(send_email.toString());
      //whenever page is reloaded or closed, Firebase erases
      database.ref().onDisconnect().remove();
});

//function for the Google Custom Search API
(function() {
   var cx = '000614227564380928360:tx02h79kr_m';
   var gcse = document.createElement('script');
   gcse.type = 'text/javascript';
   gcse.async = true;
   gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(gcse, s);
 })();


//main function to initalize the email api to our account information
  (function(){
      emailjs.init("user_Hbny5JSRgeT6X9d5CL3nA");
   })();    
//creating elements for form and email submit function
var myform = $("form#myform");
myform.submit(function(event){
  event.preventDefault();
//initializing necessary tempaltes and service id for email api to work
  var service_id = "default_service";
  var template_id = "template_twHIZmp5";

//Email api function.
  emailjs.sendForm(service_id,template_id,"myform")
      .then(function(){ 
        alert("Sent!");
         myform.find("button");
     }, function(err) {
         alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        myform.find("button");
       });
      return false;
    });
});