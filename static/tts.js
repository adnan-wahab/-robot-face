function html5_audio(){
    var a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}

function get (q) { 
  return document.querySelector(q)
}

var play_html5_audio = false;
if(html5_audio()) play_html5_audio = true;
 
function play_sound(url){
    if(play_html5_audio){
        var snd = new Audio(url);
        snd.load();
        snd.play();
    }else{
      
        $("#sound").remove();
        var sound = $("<embed id='sound' type='audio/mpeg' />");
        sound.attr('src', url);
        sound.attr('loop', false);
        sound.attr('hidden', true);
        sound.attr('autostart', true);
        $('body').append(sound);
    }
}
function readme(txt){
    play_sound("http://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(txt)+"&tl=en&total=1&idx=0prev=input");           
}
readme('hello world');
$(function(){
    $('#btnread').click(function(){
        readme($('#inp').val());
    });
});
