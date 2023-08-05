Webcam.set({
    width:350,
    height:300,
    img_fortmat:'png',
    png_quality:90,
    flip_horiz:true
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){

    Webcam.snap(function(data_uri){

document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';

    });
        
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/p7_9kbEFT/model.json", modelLoaded);

function modelLoaded(){
console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The gesture you made means "+prediction_1;
    var utterThis  = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}


function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);

        prediction_1 = results[0].label;
        speak();


       if(results[0].label == "Peace"){
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("update_emoji").innerHTML = "&#9996;";
       }

       if(results[0].label == "Thumbs Down"){
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("update_emoji").innerHTML = "&#128078;";
       }
       if(results[0].label == "Thumbs Up"){
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("update_emoji").innerHTML = "&#128077;";
       }
       if(results[0].label == "Punch"){
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("update_emoji").innerHTML = "&#128074;";
       }  
       if(results[0].label == "OK"){
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("update_emoji").innerHTML = "&#128076;";
       } 
}
}