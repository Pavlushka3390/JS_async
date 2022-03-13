const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const game = readline.createInterface({ input, output });

function log(filePath) {
    if(filePath) {
        fs.unlinkSync(filePath); 
    }

    return function out(string) {
        if(filePath) {
            fs.appendFile(filePath, string, "utf-8", (err) => {
                if(err) {
                    console.log("Ошибка открытыия файла\n");
                } 
            })
                      
        }
        console.log(string);
    }
}


async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        let result = null;

        game.question('введите число или q: ', (input) => {
            result = input;
            game.pause();
            return resolve(result); 
        });  
    })
    return await promise;
}

let gameState = {
    tryingCounter: 0,
    userNumber: NaN,
    minValue: 0,
    maxValue: 100,
    randomNumber: Math.floor(Math.random() * 100),
}


async function main() {
    while(true) {
        let userInput = await getUserInput();
        if(userInput.toLowerCase() === "q") {
            break;
        }

        let number = parseInt(userInput);


        console.log(`Ваше число: ${number}\n`)

        gameState.tryingCounter++;
        gameState.userNumber = number;
    
        if(number === gameState.randomNumber) {
            console.log(`угадано за ${gameState.tryingCounter} попыток\n`);
            break;
        }
    
        if(number > gameState.randomNumber) {
            console.log("Нужно число меньше\n");
        } else {
            console.log("Нужно число больше\n");
        }

    }
    game.close();
}


main();