

// if(jQuery('#single_page').length > 0){
  function logHTML(e, data) {
    // log.innerHTML += "\n" + e + " " + (data || '');
  }


  var audioContext;
  var audioRecorder;


  var _realAudioInput;

  var sentence;

  function handlerStartUserMedia(stream) {

    console.log('handlerStartUserMedia');
    console.log('sampleRate:'+ audioContext.sampleRate);

    // MEDIA STREAM SOURCE -> ZERO GAIN >
    _realAudioInput = audioContext.createMediaStreamSource(stream);

    audioRecorder = new Recorder(_realAudioInput);


  }

  function handlerErrorUserMedia(e) {
      logHTML('No live audio input: ' + e);
  }


  function startRecording() {
    
	
	if(!audioRecorder)
      return;    
 
    jQuery('#start_record').prop('disabled', true);
	jQuery('html').addClass('disabled_body');
	jQuery('#record_element').remove();
    audioRecorder && audioRecorder.record();
	
	setTimeout(function(){
		stopRecording();
		
		jQuery('#start_record').prop('disabled', false);
		jQuery('html').removeClass('disabled_body');
		jQuery('#next_sentence').addClass('fade_me_in');
	// }, (sentence.duration * 1000) + 5000);
	}, (get_duration() * 1000) + 2000);
	
  }

  function stopRecording() {
    if(!audioRecorder)
      return;

    audioRecorder && audioRecorder.stop();
   }

  window.onload = function init() {
	 // sentence = document.getElementById("sentences_audio_element");
      // webkit shim.
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      window.URL = window.URL || window.webkitURL;
      audioContext = new AudioContext;
      logHTML('Audio context set up.');
      logHTML('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

      navigator.getUserMedia({vide:false, audio: true}, handlerStartUserMedia, handlerErrorUserMedia);

  };
// }

jQuery(document).ready(function(){	
	jQuery('#start_record').on('click', function(){
		startRecording();
	});
});