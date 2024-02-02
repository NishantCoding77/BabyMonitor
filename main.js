img="";
status ="";
objects = [];
sound = ""
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);    
    document.getElementById("status").innerHTML = "Status : Searching for Baby";
   
}

function preload(){
    img = loadImage('dog_cat.jpg');
    sound = loadSound('emergency_alert.mp3');
}


function draw(){
    
    image(video,0,0,380,380);
    if( status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            if(objects[i]=="person"){
                document.getElementById("number_of_objects").innerHTML = "Baby is detected";
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "Baby is not detected";
                sound.play();
                

            }
            
     document.getElementById("status").innerHTML = "Baby Detected";
   
     fill(r,g,b);
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y +15);
     noFill();
     stroke(r,g,b);
     rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    
        
    }
   /*
    fill("#FF0000");
    
    text("Dog",45,75);
    noFill();
    stroke("#FF0000");
    rect(30,60,450,350);
    fill("#FF0000");
    text("Cat",200,95);
    noFill();
    stroke("#FF0000");
    rect(130,80,450,350);
    */


}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    

}

function gotResults(error,results){
     if(error){
        console.log(error);
     }
     
     console.log(results);
     objects = results;
 
}