class Rule{
    
    constructor(gameList){
    this.gameList=gameList;
    this.gameWinList=[];
    this.size=gameList.length;    
    }

    setWinList(){
        let win=Math.floor(this.size/2);
        let num;
        for(let i=0;i<this.size;i++){
            num=i;
            this.gameWinList[i]=[];
                for(let j=0;j<=win;j++){
                    this.gameWinList[i][j]=this.gameList[num];
                    num++
                    if(num == this.size)num=0;
                } 
        }
    }
    getGameList() {return this.gameList;}
    getWinList(){return this.gameWinList;}
}

class Help{
    constructor(gameList,gameWinList){
        this.gameList=gameList;
        this.gameWinList=gameWinList;
        this.helpList=[];
        this.size=gameList.length    
    }

    generateHelp(){
        let win=Math.floor(this.size/2);
        for(let i=0;i<this.size+1;i++){
            this.helpList[i]=[];
            for(let j=0;j<this.size+1;j++){
                if(i==0 && j==0)
                this.helpList[i][j]="Bot\\User";
                else if(i==0)
                this.helpList[i][j]=this.gameList[j-1];
                else if(j==0)
                this.helpList[i][j]=this.gameList[i-1];
                else if(i==j) 
                this.helpList[i][j]="draw";
                else {
                    if(this.gameWinList[i-1][0]==this.helpList[i][0]){
                        for(let k=1;k<=win;k++)
                        {
                            if(this.gameWinList[i-1][k]!=this.helpList[0][j])
                            {
                            this.helpList[i][j]="lose";
                        }
                            else{
                            this.helpList[i][j]="win";
                            break;}
                        }
                    }
                }
            }
        }
    }

    showHelp(){
        console.info("Game rules");
        let maxLenghtWord=this.gameList[0].length;
        for(let i=0;i<this.size;i++){
            if(maxLenghtWord<this.gameList[i].length)
            maxLenghtWord=this.gameList[i].length
        }
        if(maxLenghtWord<10)
        maxLenghtWord=10;
        let str;
        for(let i=0;i<this.size+1;i++){
            str="";
            for(let j=0;j<this.size+1;j++){
            let len=maxLenghtWord-this.helpList[i][j].length+1;
            str+='|'+this.helpList[i][j];
            for(let k=0;k<=len;k++){
            str+=' ';}
            if(j==this.size)
            str+='|';   
            }
            console.info(str);
        }
    }
}

class Check{ 
    constructor(){}

    checkStartList(message){
        if(!message){
            console.error("line is empty, please enter at least 3 words!");
            return false;  
        } else if(message.length<3){
            console.error("Please enter at least 3 words!");
            return false;  
        }else if(message.length%2==0){
            console.error("Number of words must not be even!");
            return false;  
        }
        let duplicates = [];
        let string=[];

        for (let str of message) {
            if (!string.includes(str)) {
                string.push(str);
            }else duplicates.push(str);
        }

        if(duplicates.length!=0){
            console.error("There must be no repetitions in the line! Duplicate: "+duplicates);
            return false; 
        }

        return true;   
    }

    checkMenu(message,size){
        if(!message){
            console.error("Line is empty, please make your move!");
            return false;  
        }else
        message = message.trim();
        if(message=="?"){
            return true;
        }
        let i;
        for(i=0;i<=size;i++)
            if(message==i) return true;

        console.error("Enter only 0 - "+size+" and ?");    
        return false; 
    }

}

class Table{
    constructor(gameList){
        this.gameList=gameList;
        this.size=gameList.length;
    }

    showTable(){
        let str;
        console.info("Available moves:");
        for(let i=1;i<=this.size;i++){
            str=""
            str+=i+" - "+this.gameList[i-1];
            console.info(str);
        }
        console.info("0 - exit\n? - help");
    }
}

class HMAC{
    
    constructor(){ 
        this.randomNumber;
        this.hmac;  
    }
    
    setRandomNumber(number){
        this.randomNumber=number;
    }
    generateHMAC(number){
        const {SHA256} = require("sha2");
        let num=[];
        num[0]=number;
        const n = SHA256(num);
        this.hmac=n.toString("hex");
    }
    getHMAC(){
        return this.hmac;
    }
    getRandomNumber(){
        return this.randomNumber;
    }
}

class Randomize{

    constructor(){
        this.randomNumber;
    }
    getRandomNumber(){
        return this.randomNumber;
    }

    async generate(numberMoves){
        let number=[];
        //так и не получилось закинуть await randomNumber(0, list.length-1); в метод generateKey 
        number.push(await randomNumber(0, numberMoves-1));
        this.randomNumber=number[0];
    }

}

  /**
   * @param {message} question
   * @returns {Promise<message | null>}
   */
async function ask(question) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(question, (x) => {
        rl.close();
        if (x === null || x === undefined || !/\S/.test(x)) {
          resolve(null);
        } else {
          resolve(x.trim());
        }
      });
    });
}

const readline = require('readline');
const randomNumber = require("random-number-csprng");

async function startGame(list){
    //list = ['камень','ножницы','бумага','спок','черепаха','спок1','черепаха1','спок2','черепаха2'];
    let check = new Check();

    if(!check.checkStartList(list))
    return list;
    let numberTurn=list.length;
    let hmac=new HMAC();
    let rule = new Rule(list);
    rule.setWinList();
    let help = new Help(list,rule.getWinList());
    help.generateHelp();
    let table = new Table(list);
    let randomize= new Randomize();

    while(true){

        await randomize.generate(numberTurn);
        hmac.setRandomNumber(randomize.getRandomNumber());      
        hmac.generateHMAC(randomize.getRandomNumber()); 

        console.info("SHA256/sha2:"+hmac.getHMAC());
        table.showTable();

        let playerTurn = await ask('Enter your move: ');
        

        if(check.checkMenu(playerTurn,numberTurn)){
            if(playerTurn=="?"){
                help.showHelp();
                continue;
            }else if (playerTurn=="0"){
                break;
            }else{

                let message="Your move: "+playerTurn;
                let i=playerTurn-1;
                let winner=0;
                let yourMoveW=rule.getGameList()[i];
                message+="|"+yourMoveW;
                console.info(message);
                let botTurn=rule.getGameList()[hmac.getRandomNumber()];
                console.info("Bot move:"+botTurn);
                let gameWin=rule.getWinList();
                        
                for(let j=0;j<gameWin[i].length;j++){
                    if(gameWin[i][0]==botTurn){
                        console.info("Draw");
                        winner=1;
                        break;
                    }else if(botTurn==gameWin[i][j]){
                        console.info("You win");
                        winner=2
                    break;} 
                }
                if(winner==0)console.info("You lose");
            }
        }else continue;   
    }                  
}

console.log(startGame(process.argv.slice(2)));
