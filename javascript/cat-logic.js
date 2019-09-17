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
// Made to demonstrate how to use JQuery and TheCatAPI to load breed list, and show a breed image and data on selection. Any questions hit me up at - https://forum.thatapiguy.com - Aden

var catName;

$('#breed_search').on('input', function(e) {
  var search_str = $(this).val();
  searchBreeds(search_str);
});

function searchBreeds(search_str) {
  var string_length = search_str.length // get the length of the search string so we know how many characters of the breed name to compare it to
  search_str = search_str.toLowerCase(); // ensure search string and breed name are same case otherwise they won't match
  for (var i = 0; i < breeds.length; i++) { // loop through all the breeds in order
    var breed_name_snippet = breeds[i].name.substr(0, string_length).toLowerCase(); // get the first few cahracters of the name
    if (breed_name_snippet == search_str) {
      getCatByBreed(breeds[i].id) // show the breed just as we did in the Select demo
      catName = breeds[i].name;
      return; // return the function so we don't keep searching
    }
  }
}
// Setup the Controls
var $breed_select = $('select.breed_select');
$breed_select.change(function() {
  var id = $(this).children(":selected").attr("id");
  getCatByBreed(id)
});
// Load all the Breeds
function getBreeds() {
  ajax_get('https://api.thecatapi.com/v1/breeds', function(data) {
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
var description;
var temperament;
var lifeSpan;
var weight;
var hypoallergenic;
var adaptability;
var affection;
var childFriendly;
var dogFriendly;
var catFriendly;
var energy;
var intelligence;
var shedding;
var vocalisation;
var dataTitle = ["Breed", "Description", "Temperment", "Life Span", "Weight (lbs)", "Hypoallergenic", "Adaptability", "Affection", "Child Friendly", "Dog Friendly", "Cat Friendly", "Energy", "Intelligence", "Shedding", "Vocalization"];
var catData = [];
// triggered when the breed select control changes
function getCatByBreed(breed_id) {
  catData = [];
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thecatapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {
    name = data[0].breeds[0].name;
    catData.push(name);
    description = data[0].breeds[0].description;
    catData.push(description);
    temperament = data[0].breeds[0].temperament;
    catData.push(temperament);
    lifeSpan = data[0].breeds[0].life_span;
    catData.push(lifeSpan);
    weight = data[0].breeds[0].weight.imperial;
    catData.push(weight);
    hypoallergenic = data[0].breeds[0].hypoallergenic;
    if (hypoallergenic == 0) {
      hypoallergenic = "No";
      catData.push(hypoallergenic);
    } else if (hypoallergenic == 1) {
      hypoallergenic = "Yes";
      catData.push(hypoallergenic);
    }
    adaptability = data[0].breeds[0].adaptability;
    catData.push(adaptability);
    affection = data[0].breeds[0].affection_level;
    catData.push(affection);
    childFriendly = data[0].breeds[0].child_friendly;
    catData.push(childFriendly);
    dogFriendly = data[0].breeds[0].dog_friendly;
    catData.push(dogFriendly);
    catFriendly = data[0].breeds[0].cat_friendly;
    catData.push(catFriendly);
    energy = data[0].breeds[0].energy_level;
    catData.push(energy);
    intelligence = data[0].breeds[0].intelligence;
    catData.push(intelligence);
    shedding = data[0].breeds[0].shedding;
    catData.push(shedding);
    vocalisation = data[0].breeds[0].vocalisation;
    catData.push(vocalisation);
//use nameToGet for ajax call to giphy
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

  console.log(catData);

  for (var i = 0; i < 15; i++) {
    $("#breed_data_table").append("<tr><td>" + dataTitle[i] + "</td><td>" + catData[i] + "</td></tr>")
  }

  // var breed_data = image.breeds[0]
  // $.each(breed_data, function(key, value) {
  //   // as 'weight' and 'height' are objects that contain 'metric' and 'imperial' properties, just use the metric string
  //   if (key == 'weight' || key == 'height') value = value.imperial
  //   // add a row to the table
  //   $("#breed_data_table").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  // });
}

// call the getBreeds function which will load all the Cat breeds into the select control
getBreeds();

