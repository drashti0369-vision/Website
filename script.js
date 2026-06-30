const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();

window.addEventListener("resize", resize);

const colors=[
"#00E5FF",
"#6C63FF",
"#FF3CAC",
"#00FFA3",
"#FFD500",
"#FF6B6B",
"#00B8FF",
"#B026FF"
];

class Blob{

    constructor(){

        this.reset();

        this.radius=180+Math.random()*170;

    }

    reset(){

        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;

        this.vx=(Math.random()-0.5)*0.45;
        this.vy=(Math.random()-0.5)*0.45;

        this.color=colors[Math.floor(Math.random()*colors.length)];
    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x<-250) this.x=canvas.width+250;
        if(this.x>canvas.width+250) this.x=-250;

        if(this.y<-250) this.y=canvas.height+250;
        if(this.y>canvas.height+250) this.y=-250;
    }

    draw(){

        const gradient=ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.radius
        );

        gradient.addColorStop(0,this.color+"AA");
        gradient.addColorStop(.35,this.color+"55");
        gradient.addColorStop(1,this.color+"00");

        ctx.fillStyle=gradient;

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();

    }

}

const blobs=[];

for(let i=0;i<10;i++){

    blobs.push(new Blob());

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#050505";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.globalCompositeOperation="lighter";

    blobs.forEach(blob=>{

        blob.update();
        blob.draw();

    });

    ctx.globalCompositeOperation="source-over";

    requestAnimationFrame(animate);

}

animate();

    