class Link{
    constructor(bodyA,bodyB){
        // fruit is a part of the rope composite & hence it is length-1, 
        // therefore, the last rectangle is at length-2
        //B=bodyA = rope & bodyB = melon
        var lastLink = bodyA.body.bodies.length-2
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[lastLink],
            pointA: {x:0, y:0},
            bodyB: bodyB, 
            pointB: {x:0, y:0},
            length:-10,
            stiffness: 0.01,
        })
        World.add(world, this.link)
    }
    
        dettach(){
            World.remove(world,this.link)
        }
    }