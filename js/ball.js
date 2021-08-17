class Ball {
    #ball;

    constructor() {
        this.#ball = Bodies.circle(400, 40, 50, { 
            restitution: 1,
            friction: 0.05,
            collisionFilter: {
                category: ballCategory,
                mask: bodyCategory | headCategory | armCategory | legCategory | wallsCategory
            }, 
        });

        Body.setMass(this.#ball, 0.2);
        Composite.add(world, this.#ball);
    }

    positionX() {
        return this.#ball.position.x;
    }

    restartBall() {
        Body.setPosition(this.#ball, { 
            x: 400, 
            y: 40
        });
        Body.setVelocity(this.#ball, {
            x: 0, 
            y: 0
        });
        Body.setAngularVelocity(this.#ball, 0);
    }
}