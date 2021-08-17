class Goals {
    #leftGoal;
    #rightGoal;

    constructor() {
        this.#leftGoal = Bodies.rectangle(25/2, 400, 25, 200, { 
            isStatic: true,
            collisionFilter: {
                category: goalCategory
            },
            render: {
                fillStyle: 'gray',
                strokeStyle: 'gray',
                lineWidth: 1
           }
        });

        this.#rightGoal = Bodies.rectangle(800-25/2, 400, 25, 200, { 
            isStatic: true,
            collisionFilter: {
                category: goalCategory
            },
            render: {
                fillStyle: 'gray',
                strokeStyle: 'gray',
                lineWidth: 1
           } 
        });
    
        Composite.add(world, [
            this.#leftGoal,
            this.#rightGoal
        ]);

    }



}