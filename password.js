function getPasswordChecker(password) {
    return function (actual) {
        if(actual === password) {
            return true;
        }
        return false;
    }
}


function test(checker, actualPass, password) {
    if(checker(actualPass) !== password) {
        throw Error("Неверный пароль");
    }
}


function main() {
    let checker = getPasswordChecker("qwerty");
    test(checker, "qwerty", true);
    test(checker, "pass", false);
    console.log("Успешно")
}

main();