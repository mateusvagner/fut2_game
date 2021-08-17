class Player {

    #body;
    #head;
    #leg;
    #arm;
    #x0;
    #keys;
    #kickSide
    
    constructor(x, keys, kickSide) {
        this.#x0 = x;
        this.#keys = keys
        this.#kickSide = kickSide
        
        this.#head = Bodies.circle(this.#x0, 600-136-25, 12, { 
            friction: 0.05,
            frictionStatic: 0.01,
            collisionFilter: {
                category: headCategory,
                mask: wallsCategory | bodyCategory | goalCategory | ballCategory
            }, 
        });

        this.#body = Bodies.rectangle(this.#x0, 600-100-25, 20, 60, { 
            friction: 0.05,
            frictionStatic: 0.01,
            collisionFilter: {
                category: bodyCategory,
                mask: wallsCategory | headCategory | fieldDivisionCategory | goalCategory | ballCategory
            }, 
        });

        this.#leg = Bodies.rectangle(this.#x0, 600-35-25, 15, 70, { 
            friction: 0.05,
            frictionStatic: 0.01, 
            collisionFilter: {
                category: legCategory,
                mask: wallsCategory  | goalCategory | ballCategory
            },
        });

        this.#arm = Bodies.rectangle(this.#x0, 600-100-25, 10, 50, { 
            friction: 0.05,
            frictionStatic: 0.01,
            collisionFilter: {
                category: armCategory,
                mask: wallsCategory | goalCategory | ballCategory
            }, 
        });

        let linkHeadBody = Constraint.create({
            bodyA: this.#head,
            pointA: { x: 0, y: 0 },
            bodyB: this.#body,
            pointB: { x: 0, y: -30 },
            stiffness: 0.008
        });

        let linkLegBody = Constraint.create({
            bodyA: this.#leg,
            pointA: { x: 0, y: -35 },
            bodyB: this.#body,
            pointB: { x: 0, y: 30 },
        });

        let linkArmBody = Constraint.create({
            bodyA: this.#arm,
            pointA: { x: 0, y: -25 },
            bodyB: this.#body,
            pointB: { x: 0, y: -25 },
        });

        this.setKeysListener()
        
        Composite.add(world, [
            this.#head,
            this.#body,
            this.#arm,
            this.#leg,
            linkHeadBody,
            linkLegBody,
            linkArmBody
        ]);
    }

    setKeysListener = () => {
        document.addEventListener('keydown', (event) => {
            // console.log(event.key)
            if(!event.repeat) {
                if(event.key == this.#keys.jump) {
                    this.jump();
                } else if(event.key == this.#keys.left) {
                   this.left();  
                } else if(event.key == this.#keys.right) {
                   this.right();
                } else if(event.key == this.#keys.kick) {
                   this.kick();
                } else if (event.key == this.#keys.reset) {
                    this.initialPosition()
                }
            }
        });
    }

    jump = () => {
        Body.setVelocity(this.#body, {
            x: this.#body.velocity.x, 
            y: -15
        });
        Body.setVelocity(this.#head, {
            x: this.#head.velocity.x, 
            y: -15
        });
        Body.setVelocity(this.#leg, {
            x: this.#leg.velocity.x, 
            y: -12
        });
        Body.setVelocity(this.#arm, {
            x: this.#arm.velocity.x, 
            y: -12
        });
    }

    left = () => {
        Body.setVelocity(this.#body, {
            x: -15, 
            y: this.#body.velocity.y
        });
        Body.setVelocity(this.#head, {
            x: -15, 
            y: this.#head.velocity.y
        });
        Body.setVelocity(this.#arm, {
            x: -15, 
            y: this.#arm.velocity.y
        });
    }

    right = () => {
        Body.setVelocity(this.#body, {
            x: 15, 
            y: this.#body.velocity.y
        });
        Body.setVelocity(this.#head, {
            x: 15, 
            y: this.#head.velocity.y
        });
        Body.setVelocity(this.#arm, {
            x: 15, 
            y: this.#arm.velocity.y
        });
    }

    kick = () => {
        Body.setAngularVelocity(this.#leg, -0.5 * this.#kickSide);
        Body.setAngularVelocity(this.#body, -0.4 * this.#kickSide);
    }

    initialPosition = () => {
        Body.setVelocity(this.#body, {
            x: 0, 
            y: 0
        });
        Body.setVelocity(this.#head, {
            x: 0, 
            y: 0
        });
        Body.setVelocity(this.#arm, {
            x: 0, 
            y: 0
        });

        Body.setVelocity(this.#leg, {
            x: 0, 
            y: 0
        });

        Body.setAngularVelocity(this.#body, 0);
        Body.setAngularVelocity(this.#head, 0);
        Body.setAngularVelocity(this.#arm, 0);
        Body.setAngularVelocity(this.#leg, 0);

        Body.setAngle(this.#body, 0)
        Body.setAngle(this.#head, 0)
        Body.setAngle(this.#arm, 0)
        Body.setAngle(this.#leg, 0)

        Body.setPosition(this.#body, {x: this.#x0, y: 600-100-25})
        Body.setPosition(this.#head, {x: this.#x0, y: 600-136-25})
        Body.setPosition(this.#arm, {x: this.#x0, y: 600-100-25})
        Body.setPosition(this.#leg, {x: this.#x0, y: 600-35-25})

    }
    
}