status = "";
objects = [];

function setup()
{
    Canvas = createCanvas(400, 400);
    Canvas.center();

    video = createCapture(VIDEO);

    video.hide();

    objectDetector = ml5.objectDetector("cocosd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modelLoaded()
{
    console.log("Modelo cargado!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.error("error");
    }
    else
    {
        console.log(results);

        objects = results;
    }
}

function preload()
{

}

function draw()
{
    image(video, 0, 0, 400, 400);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: objeto detectado";

            document.getElementById("NOObjects").innerHTML = "El número de objetos detectados es: "+ objects.length;

            fill(r,g,b);

            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

            textSize(20);
            
            stroke(r,g,b);
        
            noFill();
        
            rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
        }
    }
}