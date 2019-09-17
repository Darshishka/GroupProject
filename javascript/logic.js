var breeds;
// make an Ajax request
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        // console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // Load all the Breeds
function getBreeds() {

}
}
// Made to demonstrate how to use JQuery and TheDogAPI to load breed list, and show a breed image and data on selection. Any questions hit me up at - https://forum.thatapiguy.com - Aden

var dogName;

$('#breed_search').on('input', function(e) {
  var search_str = $(this).val();
  searchBreeds(search_str);
  // Giphy API 
});

function searchBreeds(search_str) {
  var string_length = search_str.length // get the length of the search string so we know how many characters of the breed name to compare it to
  search_str = search_str.toLowerCase(); // ensure search string and breed name are same case otherwise they won't match
  for (var i = 0; i < breeds.length; i++) { // loop through all the breeds in order
    var breed_name_snippet = breeds[i].name.substr(0, string_length).toLowerCase(); // get the first few cahracters of the name
    if (breed_name_snippet == search_str) {
      getDogByBreed(breeds[i].id) // show the breed just as we did in the Select demo
      dogName = breeds[i].name;
      return; // return the function so we don't keep searching
    }
  }
}
// Setup the Controls
var $breed_select = $('select.breed_select');
$breed_select.change(function() {
  var id = $(this).children(":selected").attr("id");
  getDogByBreed(id)
});
// Load all the Breeds
function getBreeds() {
  ajax_get('https://api.thedogapi.com/v1/breeds', function(data) {
    populateBreedsSelect(data)
    breeds = data;
    console.log(breeds);
  });
}
// Put the breeds in the Select control
function populateBreedsSelect(breeds) {
  $breed_select.empty().append(function() {
    var output = '';
    $.each(breeds, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}

var name;
var temperament;
var breedClass;
var bredFor;
var lifeSpan;
var height;
var weight;
var description;
var dataTitle = ["Breed Name", "Temperament", "Breed Class", "Bred For", "Life Span", "Height (in)", "Weight (lbs)", "Breed Description"];
var dogData = [];
// triggered when the breed select control changes
function getDogByBreed(breed_id) {
  dogData = [];
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {
    var nameToGet = data[0].breeds[0].name;
    name = data[0].breeds[0].name;
    dogData.push(name);
    temperament = data[0].breeds[0].temperament;
    dogData.push(temperament);
    breedClass = data[0].breeds[0].bredFor;
    dogData.push(bredFor);
    lifeSpan = data[0].breeds[0].life_span;
    dogData.push(lifeSpan);
    height = data[0].breeds[0].height.imperial;
    dogData.push(height);
    weight = data[0].breeds[0].weight.imperial;
    dogData.push(weight);
    description = data[0].breeds[0].description;
    dogData.push(description);
//use nameToGet for ajax call to giphy
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=7ilylj0XRkujsH92cnfoMuyrE6DNoy9z&limit=5';
    console.log(queryURL) 
    $.ajax({
      url: queryURL,
      method: "GET" 
    }) 
    .then(function(results){
      $('#gifImage').empty();
      console.log(results.data) 
      var myArray = results.data
      for (var j = 0; j <myArray.length; j++){
        console.log(myArray[j].url); 
      var gifURL = myArray[j].images.fixed_height_small.url; 
      var gif = $('<img>'); 
      gif.attr('src', gifURL); 
      $("#gifImage").append(gif);  
      }
    }) 


    $("#under-image-text").empty();
    if (data.length == 0) {
      // if there are no images returned
      clearBreed();
      $("#under-image-text").text("Sorry, no Image for that breed yet");
    } else {
      //else display the breed image and data
      displayBreed(data[0]);
    }
  });
}
// clear the image and table
function clearBreed() {
  $('#breed_image').attr('src', "");
  $("#breed_data_table tr").remove();
}
// display the breed image and data
function displayBreed(image) {
  $('#breed_image').attr('src', image.url);
  $("#breed_data_table tr").remove();

  console.log(dogData);

  for (var i = 0; i < 7; i++) {
    $("#breed_data_table").append("<tr><td>" + dataTitle[i] + "</td><td>" + dogData[i] + "</td></tr>")
  }

  // var breed_data = image.breeds[0]
  // $.each(breed_data, function(key, value) {
  //   // as 'weight' and 'height' are objects that contain 'metric' and 'imperial' properties, just use the metric string
  //   if (key == 'weight' || key == 'height') value = value.imperial
  //   // add a row to the table
  //   $("#breed_data_table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  // });
}

// call the getBreeds function which will load all the Dog breeds into the select control
getBreeds();



