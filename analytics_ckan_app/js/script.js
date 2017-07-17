$(document).ready(function(){

  $.get('http://localhost:5000/data_gov_uk', function(data){
    console.log(data);
  });

});
