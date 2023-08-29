// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events;

// create an engine
var engine = Engine.create({
    timing: {
        timeScale: 1 
    }
}),
world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'black',
    }
});

// Categories
const wallsCategory = 0x0001,
    fieldDivisionCategory = 0x0002,
    goalCategory = 0x0004,
    armCategory = 0x0008,
    legCategory = 0x00010,
    headCategory = 0x0020,
    bodyCategory = 0x0040,
    ballCategory = 0x0080;

var walls = new Walls();

var goals = new Goals();

var joystick = new Joystick();

var player1 = new Player(600, joystick.playerOneKeys, -1);
var player2 = new Player(200, joystick.playerTwoKeys, 1);
let player1Points = 0;
let player2Points = 0;

var ball = new Ball();

Events.on(engine, "afterUpdate", () => { 
    if(ball.positionX() < 0.0) {
        setTimeout(() => {
            player2Points += 1;
            ball.restartBall();
            player1.initialPosition();
            player2.initialPosition();
        }, 500);  
    }

    if (ball.positionX() > 800) {
        setTimeout(() => {
            player1Points += 1;
            ball.restartBall();
            player1.initialPosition();
            player2.initialPosition();
        }, 500);
    }
    
    document.getElementById('score').innerHTML = `Score: ${player1Points} X ${player2Points}`;     
});


// add mouse control
let mouse = Mouse.create(render.canvas)
let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 1,
        render: {
            visible: true
        }
    }
});

Composite.add(world, mouseConstraint);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);
