const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(height, width, holeNum) {
        this.gameField = this.generate(height, width, holeNum);
        //starting co-ords for the game which correspond to top left
        this.x=0;
        this.y=0; 
        //this ia a value so the game knows to keep going until a win condition is reached
        this.playing = true;
    }
    print() {
        //created a new array which hides the holes, but allows the hat and path characters to be seen
        const hiddenField = this.gameField.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
                if (value === hole && (rowIndex !== this.y || colIndex !== this.x) ) {
                    return fieldCharacter; 
                } else {
                    return value;
                }
            });
        });
        //this prints the array to the console without the commas and square brackets, using a space between each for readibility
        for (let row of hiddenField)    {
            console.log(row.join(' '));
        }
    
    }
    generate(height, width, holeNum) {
        // Generate the game field based on height, width, holeNum
        
            // creating a way of avoiding unsuitable numbers during generation
            if (holeNum >= ((height * width) - 2) || holeNum <= 0 || height <= 1 || width <= 1) {
                return console.log('please return sensible values to generate the game seed');
            } else {
                // creating a 1d array, which will be filled with fieldCharacters, have holes and hat inserted, shuffled, making sure that the first value remains fieldCharacter
                const length = height * width;
                //creating an array filled with field character of chosen size, 1d for the moment
                const arr = new Array(length).fill(fieldCharacter);
                //creating a function that will add the chosen number of holes into the array
                function addHoles(array, num) {
                    let count = 0;
                    while (count < num) {
                        let index = array.indexOf(fieldCharacter);
                        if (index !== -1) {
                            array[index] = hole;
                            count++;
                        } else {
                            break;
                        }
                    }
                    return array;
                };
                const comboArr = addHoles(arr, holeNum);
                //making the last value in the array the hat, ensuring there will always be a hat in the array
                comboArr[(comboArr.length - 1)] = hat;
                

                // putting in a function Durstenfeld Shuffle to shuffle
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
                shuffleArray(comboArr);

                //creating a function that will remove the correct ammount of fieldCharacters from the array as holes added
                
                //create a function that takes an input of an array and number, the function should scan through the array and remove as many values in the array as given by the number which have a value equal to fieldCharacter
               
        
                // finding the first fieldCharacter in the array to get its index, then will swap it with the current value in the first spot, which means the starting point will always be safe
                const startingPoint = arr.indexOf(fieldCharacter);
                function swapArray(array, swapIndex) {
                    if (startingPoint === 0) {
                        return array;
                    } else {
                        return [array[0], array[swapIndex]] = [array[swapIndex], array[0]];
                    };
                };
                swapArray(comboArr, startingPoint);
                // making the start point the pathCharacter
                comboArr[0] = pathCharacter;
                // changing the 1d array into a 2d array with columns equal to the desired width
                const gameSeed = [];
                while (comboArr.length) {
                    gameSeed.push(comboArr.splice(0, width).map((value, index) =>{
                        if (value === hole)     {
                            return hole;
                        } else{
                            return value;
                        }
                    }))
                }
                return gameSeed;
            }
        }
        
    

    playRound() {
     
      
            //print current field to start round
            this.print(this.gameField);
    
            //function which controls players move
            let move = prompt('which direction would you like to move, up, down, left or right?')
                 //create switch cases for each possibility, with boundaries
                switch (move.toLowerCase()) {
                    case 'up':
                        if (this.y === 0)    {
                            return console.log('you cannot move any further up' );
                        }
                    else {
                        this.y -= 1;
                        //this is to check if a win condition has been reached
                        if (this.gameField[this.y][this.x] === hat)  {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('congratulations, you found your hat!')
                        }
                        //this is to check if a lose condition has been reached
                        else if (this.gameField[this.y][this.x] === hole) {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('sorry, you fell into a hole and your hat is gone forever!')
                        }
                        else {
                            this.gameField[this.y][this.x] = pathCharacter;
                            return console.log('still no hat...')}
    
                        }
    
                        
                    ;
                    break;
                    //haven't really commented the rest of these cases as they are essentially the same as the previous case, but dealing with variable length of the arrays for the width and height, and using x cords instead of y
                case 'down' :
                    if (this.y >= this.gameField.length)    {
                        return console.log('you cannot move any further down');
                    }
                    else {
                        this.y+=1;
                        
                        if (this.gameField[this.y][this.x] === hat)  {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('congratulations, you found your hat!')
                        }
                        else if (this.gameField[this.y][this.x] === hole) {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('sorry, you fell into a hole and your hat is gone forever!')
                        }
                        else {
                            this.gameField[this.y][this.x] = pathCharacter;
                            return console.log('still no hat...')}
                    }
                    break;
                case 'right':
                    if (this.x >= this.gameField[this.y].length) {
                        return console.log('you cannot move any further right');
                    }
                    else {
                        this.x+=1;
                        
                        if (this.gameField[this.y][this.x] === hat)  {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('congratulations, you found your hat!')
                        }
                        else if (this.gameField[this.y][this.x] === hole) {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('sorry, you fell into a hole and your hat is gone forever!')
                        }
                        else {
                            this.gameField[this.y][this.x] = pathCharacter;
                            return console.log('still no hat...')}
                    }
                    break;
                case 'left':
                    if (this.x === 0)    {
                        return console.log('you cannot move any further left');
                    }
                    else {
                        this.x-=1;
                        
                        if (this.gameField[this.y][this.x] === hat)  {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('congratulations, you found your hat!')
                        }
                        else if (this.gameField[this.y][this.x] === hole) {
                            this.playing=false;
                            this.print(this.gameField);
                            return console.log('sorry, you fell into a hole and your hat is gone forever!')
                        }
                        else {
                            this.gameField[this.y][this.x] = pathCharacter;
                            return console.log('still no hat...')}
                    }
                default:
                    return console.log('please try typing either up, down, left or right into the console')
            }
        }
       
}

//creating a function to run the game in full, user inputs their desired values for the game field, which is turned into an integer, then the field is generated and the game is played whilst field.playing is true.

function playGame() {
    const height = parseInt(prompt('what height would you like the map to have?'), 10);
    const width = parseInt(prompt('what width would you like the map to have?'), 10);
    const holeNum = parseInt(prompt('how many holes would you like the map to have?'), 10);
    const field = new Field(height, width, holeNum);

    while (field.playing) {
        field.playRound();
    }
}
// call the function to play the game!
playGame();
