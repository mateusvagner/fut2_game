class Walls {
    
    #leftUpperWall;
    #rightUpperWall;
    #leftLowerWall;
    #rightLowerWall;
    #floor;
    #roof;
    #fieldDivision;

    
    constructor () {

        this.#leftUpperWall = Bodies.rectangle(25/2, 150, 25, 300, { 
            isStatic: true,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'black',
                strokeStyle: 'black',
                lineWidth: 1
           } 
        });
        
        this.#rightUpperWall = Bodies.rectangle(800-25/2, 150, 25, 300, { 
            isStatic: true,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'black',
                strokeStyle: 'black',
                lineWidth: 1
           } 
        });

        this.#leftLowerWall = Bodies.rectangle(25/2, 600-50, 25, 100, { 
            isStatic: true,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'green',
                strokeStyle: 'green',
                lineWidth: 1
           } 
        });
        
        this.#rightLowerWall = Bodies.rectangle(800-25/2, 600-50, 25, 100, { 
            isStatic: true,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'green',
                strokeStyle: 'green',
                lineWidth: 1
           } 
        });
        
        this.#floor =  Bodies.rectangle(400, 600-25/2, 800, 25, { 
            isStatic: true , 
            restitution: 1,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'green',
                strokeStyle: 'green',
                lineWidth: 1
           }
        });
        
        this.#roof = Bodies.rectangle(400, 25/2, 800, 25, { 
            isStatic: true,
            collisionFilter: {
                category: wallsCategory
            },
            render: {
                fillStyle: 'black',
                strokeStyle: 'black',
                lineWidth: 1
           } 
        });

        this.#fieldDivision = Bodies.rectangle(400, 300, 10, 600, { 
            isStatic: true,
            collisionFilter: {
                category: fieldDivisionCategory
            },  
            render: {
                visible: false
            } 
        });
        
        Composite.add(world, [
            this.#leftUpperWall,
            this.#rightUpperWall,
            this.#leftLowerWall,
            this.#rightLowerWall,
            this.#floor,
            this.#roof,
            this.#fieldDivision
        ]);

    }   
}