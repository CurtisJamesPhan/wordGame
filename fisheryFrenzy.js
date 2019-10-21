// Each word consists of 5 different letters for a 6 letter word length
var sixLetterWin = ["ARTIST", "ATTIRE", "BALLER", "CIRCLE", "CLASSY", "DINNER", "DRESSY", "HOTDOG", "TICKET"];

function shuffler(toBeShuffled) {
    let pivot = toBeShuffled.length, temp;
    // Fisher-Yates Style algorthim for the modern shuffle
    while (--pivot > 0) {
        let randomIndex = Math.floor(Math.random() * pivot);
        if (randomIndex == pivot) {
        }
        else {
            temp = toBeShuffled[randomIndex];
            toBeShuffled[randomIndex] = toBeShuffled[pivot];
            toBeShuffled[pivot] = temp;
        }
    }
    return toBeShuffled;
}

exports.win = function () {
    console.log("--------------------------CONGRATULATIONS--------------------------");
    // Grabs random string from sixLetterWin array and breaks the string into single characters within an array
    const randomWord = [...sixLetterWin[Math.floor(Math.random() * sixLetterWin.length)]];
    const fiveCharRandomWord = new Set(randomWord);                 // Object Example:                      {"A", "R", "T", "I", "S"}
    const fiveCharRandomWordToArray = [...fiveCharRandomWord];      // Converted object to an array Example:["A", "R", "T", "I", "S"]

    // alphabet will be an array that only holds letters not in the 'randomWord' array
    const noDuplicatesAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ].filter(char => !randomWord.includes(char));
    console.log(`randomWord array: \t\t${randomWord}`);
    console.log(`noDuplicatesAlphabet array: \t${noDuplicatesAlphabet}`);

    const extraLetters = [];
    while (extraLetters.length < 5) {
        const randIndex = Math.floor(Math.random() * noDuplicatesAlphabet.length);
        // splice returns an array of the removed items
        // const [variable] is known as destructuring
        // Destructuring is used to grab contents of the array | splice: noDuplicatesAlphabet.splice(randIndex,1) | Translation: at position randIndex return an array holding 'noDuplicatesAlphabet'[randomIndex] and remove that 1 item  from 'noDuplicatesAlphabet'
        const [letter] = noDuplicatesAlphabet.splice(randIndex, 1);
        extraLetters.push(letter);
    }
    console.log(`extraLetters array: \t\t${extraLetters}`);
    //combine randomWord array and extraLetters array into a single array
    const pool = fiveCharRandomWordToArray.concat(extraLetters);
    console.log(`Pool of possible letters: \t${pool}`);

    var shuffle = shuffler([...pool]);
    var fisheryArray = [randomWord, shuffle];
    console.log(`Shuffled pool: \t\t\t${shuffle}`);
    console.log();

    return fisheryArray;
}

exports.loss = function () {
    console.log("------------------------TRY AGAIN NEXT TIME------------------------");
    const randomWord = [...sixLetterWin[Math.floor(Math.random() * sixLetterWin.length)]];
    // clone is created to avoid changing the original array when applying .sort()
    const clone = [...randomWord];
    const sortedRandomWord = clone.sort();
    const fiveCharRandomWord = new Set(randomWord);                 // Object Example:                      {"A", "R", "T", "I", "S"}
    const fiveCharRandomWordToArray = [...fiveCharRandomWord];      // Converted object to an array Example:["A", "R", "T", "I", "S"]

    // find the duplicate letter and store it
    var duplicate;
    for (index in sortedRandomWord) {
        if (sortedRandomWord[index] == sortedRandomWord[index - 1]) {
            duplicate = sortedRandomWord[index];
            console.log(`Duplicate letter: \t\t${duplicate}`);
            delete sortedRandomWord;
        }
    }

    // pop() a single letter that isn't the duplicate
    if (fiveCharRandomWordToArray[fiveCharRandomWord.length - 1] != duplicate) {
        fiveCharRandomWordToArray.pop();
    }
    else {
        // Swapped last element with the 0th element via destructuring and then popped off the new last element
        // [a, b] = [b, a]
        [fiveCharRandomWordToArray[fiveCharRandomWordToArray.length - 1], [fiveCharRandomWordToArray[0]]] =
            [fiveCharRandomWordToArray[0], fiveCharRandomWordToArray[fiveCharRandomWordToArray.length - 1]];
        fiveCharRandomWordToArray.pop();
    }

    const noDuplicatesAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ].filter(char => !randomWord.includes(char));
    console.log(`randomWord array: \t\t${randomWord}`);
    console.log(`noDuplicatesAlphabet array: \t${noDuplicatesAlphabet}`);

    const extraLetters = [];
    while (extraLetters.length < 6) {
        const randIndex = Math.floor(Math.random() * noDuplicatesAlphabet.length);
        const [letter] = noDuplicatesAlphabet.splice(randIndex, 1);
        extraLetters.push(letter);
    }
    console.log(`extraLetters array: \t\t${extraLetters}`);
    const pool = fiveCharRandomWordToArray.concat(extraLetters);
    console.log(`Pool of possible letters: \t${pool}`);
    var shuffle = shuffler([...pool]);
    var fisheryArray = [randomWord, shuffle];
    console.log(`Shuffled pool: \t\t\t${shuffle}`);
    console.log();

    return fisheryArray;
}