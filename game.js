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
    getFireballDamage(){
        return getRandomInt(51)+150
    }
    drinkElixir() {
        let elixirHeal=getRandomInt(101)+100;
        this.changeHP(elixirHeal);
        return elixirHeal;
    }
}
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
function WarriorAttack(warrior,dragon){
    let action = parseInt(prompt("Выберите действие:\n1. Атаковать\n2. Магия \"Фаербол\"\n3. Слушать мудреца\n4. Убежать\n5. Выпить эликсир жизни"));
    while(![1,2,3,4,5].includes(action)){
        action = parseInt(prompt("Некорректный выбор. Пожалуйста, выберите действие:\n1. Атаковать\n2. Магия \"Фаербол\"\n3. Слушать мудреца\n4. Убежать\n5. Выпить эликсир жизни"));
    }
    switch(action){
        case 1:
            if(getRandomInt(100)<75){
                const damage = warrior.attack + warrior.weapon - dragon.defense;
                dragon.changeHP(-damage);
                console.log(`${warrior.name} попал по ${dragon.name}`)
                console.log(`Урон: ${damage}`);
            }else{
                console.log(`${warrior.name} не попал`);
            }
            break
        case 2:
            let FireballDamage=warrior.getFireballDamage();
            dragon.changeHP(-FireballDamage);
            console.log(`${dragon.name} использовал файрбол и нанес ${FireballDamage} урона по ${warrior.name}`)
            break;
        case 3:
            let mudrec=[
                "Хватит валять дурака, пора уже побеждать дракона.",
                "Говорят, дракон никогда не наступит на лежащего воина.",
                "Когда мудрец отдыхал от дел, с воином из Ривии, он песню эту пел...",
                "Трус умирает сто раз. Мужественный человек – лишь однажды.",
                "Людям для жизни необходимы три вещи: еда, питье и сплетни.",
            ]
            console.log(`Мудрец говорит: ${mudrec[getRandomInt(mudrec.length)]}`);
            break;
        case 4:
            console.log(`${warrior.name} убежал`);
            console.log(warrior.getStatus());
            console.log(dragon.getStatus());
            return false;
        case 5:
            let healAmount= warrior.drinkElixir();
            console.log(`${warrior.name} выпил эликсир жизни и восстановил ${healAmount} HP.`);
            break;
    }
    
    console.log(dragon.getStatus());
    return true;
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
        if (!WarriorAttack(warrior,dragon)) {
            console.log("Битва окончена! Воин сбежал.");
            return;
        }
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