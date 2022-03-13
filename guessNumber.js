const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const game = readline.createInterface({ input, output });

let gameState = {
    tryingCounter: 0,
    userNumber: NaN,
    minValue: 0,
    maxValue: 100,
    randomNumber: Math.floor(Math.random() * 100),
}

function log(filePath) {
    if(filePath) {
        fs.writeFileSync(filePath, "", "utf-8"); 
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

function question(logger) {
    game.question('введите число или q для выхода: ', (input) => {
        if(input.toLowerCase() === "q") {
            game.close();
            return;
        }
    
        let number = parseInt(input);
    

        logger(`Ваше число: ${number}\n`)

        gameState.tryingCounter++;
    
        gameState.userNumber = number;
    
        if(number === gameState.randomNumber) {
            logger(`угадано за ${gameState.tryingCounter} попыток\n`);
            game.close();
            return;
        }
    
        if(number > gameState.randomNumber) {
            logger("Нужно число меньше\n");
        } else {
            logger("Нужно число больше\n");
        }
    
        game.pause();
        question(logger)
    });
}


function main() {
    let logger = log("./logger");
    question(logger);
}

main();