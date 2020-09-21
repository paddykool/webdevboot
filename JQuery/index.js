$("h1").click(function() {
  $("h1").css("color","purple");
})

$("button").click(function() {
  $("h1").css("color","purple");
})

$(document).keypress(function(evn) {
  console.log(evn.key);
  $("h1").text(evn.key);
})
