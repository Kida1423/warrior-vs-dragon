class Character{
    constructor(name,health,attack,defense){
        this.name=name;
        this.health=health;
        this.attack=attack;
        this.defense=defense;
    }
    isAlive(){
        return this.health>0;
    }
    changeHP(amount){
        this.health=Math.max(this.health+amount,0);
    }
    getStatus(){
        console.log(`${this.name}: ${this.health}`)
    }
}
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
function battle(warrior,dragon){
    while(dragon.isAlive()){
        if(getRandomInt(100)<75){
            const damage = warrior.attack + warrior.weapon - dragon.defense;
            dragon.changeHP(-damage);
        }else{
            console.log("Воин не попал");
        }
        dragon.getStatus();
        if(!dragon.isAlive()){
            console.log("Dragon lose");
            break
        }
    }
}

let warrior=new Character("Warrior",100,20,5);
warrior.weapon=10;
let dragon=new Character("Dragon",150,15,5);
battle(warrior,dragon);