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
        return `${this.name}: ${this.health}`
    }
}
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
function WarriorAttack(warrior,dragon){
    if(getRandomInt(100)<75){
        const damage = warrior.attack + warrior.weapon - dragon.defense;
        dragon.changeHP(-damage);
        console.log(`${warrior.name} попал по ${dragon.name}`)
        console.log(`Урон: ${damage}`);
    }else{
        console.log(`${warrior.name} не попал`);
    }
    console.log(dragon.getStatus());

}
function DragonAttack(warrior,dragon){
    if(getRandomInt(2)==1){
        const damage = dragon.attack + dragon.weapon - warrior.defense;
        warrior.changeHP(-damage);
        console.log(`${dragon.name} попал по ${warrior.name}`);
        console.log(`Урон: ${damage}`);
    }else{
        console.log("Дракон не стал атаковать и улетел");
    }
    console.log(warrior.getStatus());

}
function battle(warrior,dragon){
    console.log("Битва начинается")
    while(dragon.isAlive() && warrior.isAlive()){
        console.log("\n============ Новый ход ============");

        WarriorAttack(warrior,dragon);

        if(!dragon.isAlive()){
        console.log("Dragon lose");
        break
        }
        DragonAttack(warrior,dragon);
        if(!warrior.isAlive()){
            console.log("Warrior lose");   
            break
        }
    }
    console.log("Битва окончена!")
}

let warrior=new Character("Warrior",100,20,5);
warrior.weapon=10;
let dragon=new Character("Dragon",150,15,10);
dragon.weapon=5
battle(warrior,dragon);