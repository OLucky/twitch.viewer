/* jshint loopfunc:true */
$.ajaxSetup({
    async: false
});

$(function(){
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamer = null;
var index = 0;
var query;
var streamer_name = null;
var streamer_game = null;
var filter;

function setIndex (){
  index++;
}
function getStreamer(table){
  $.getJSON('https://api.twitch.tv/kraken/streams/'+ query + '?client_id=210lffk3792jtk801vu5738zdhex9vo&callback=', function(data){
    streamer = data;
    if (data.stream !== null){
      streamer_name = data.stream.channel.display_name;
      streamer_game = data.stream.game;
      streamer_link = data._links.self;

}
});
    if (streamer === null){
      $(table).append('<tr><td>'+query+'</td>' +
                              '<td class= "not_exist">Doesn\'t exist</td>'+
                              '<td>None</td></tr>');
    }
    else{
    if (streamer_name !== null){
        $(table).append('<tr><td><a href="https://www.twitch.tv/'+query+'">'+streamer_name+'</a></td>' +
                                '<td class="online">Online</td>'+
                                '<td>'+streamer_game+'</td></tr>');
        streamer_name = null;
        streamer_game = null;
        streamer = null;
        streamer_link = null;
      }
      else{
        $(table).append('<tr><td><a href="https://www.twitch.tv/'+query+'">'+query+'</a></td>' +
                                '<td class="offline">Offline</td>'+
                                '<td>None</td></tr>');
                                streamer_name = null;
                                streamer_game = null;
                                streamer = null;
                                streamer_link = null;
                              }
      }
    }
 while (index < streamers.length){
  query = streamers[index];
  getStreamer('#main_table');
  setIndex();
}

function filter_tables(){
  if(filter !== "All"){
    for (x=1; x < $('#main_table tr').length; x++){
      console.log(filter);
      if ($('#main_table tr:eq('+x+') td:eq(1)').html() === filter){
      $('#main_table tr:eq('+x+')').show();
    }
      else {
        $('#main_table tr:eq('+x+')').hide();
      }
    }
  }
  else{
    for (x=1; x < $('#main_table tr').length; x++){
      $('#main_table tr:eq('+x+')').show();
  }
}
}


$('#user_button').on('click', function(){
  query = $('#user_streamer').val();
  if (query === null || query === "")
  alert('Name is inscorrect');
  else{
  $('#user_table').html('<tr>'+
    '<th class="col-xs-5">User\'s Streamer</th>'+
    '<th class="col-xs-2">Status</th>'+
    '<th class="col-xs-5">Streams</th>'+
  '</tr>');
  getStreamer('#user_table');
}
});

$('.switch').on('click', function(){
  filter = $(this).html();
  console.log(filter);
  filter_tables();
});
});
