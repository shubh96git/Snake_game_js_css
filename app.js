//upon the DOM creation event, call we have to run the program
document.addEventListener('DOMContentLoaded',()=>{
    
    //collecting all elements that matches a CSS selector.
    const squares = document.querySelectorAll('.grid div')

        //getting the Score div
        const scoreDisplay = document.querySelector('span')
        //getting start button
        const startBtn = document.querySelector('.start')

    //operational tools
        //going down or up
        const width = 10
        let direction = 1
        
    //initialisation
        let currentIndex = 0
        let appleIndex = 0
        let score = 0
        let speed = 0.9 //increasing the speed progressively
        let intervalTime = 0
        let interval = 0
        
    //size of snake
        let currentSnake = [2,1,0]

// 1.to start, and restart the game
//------------------------------------------------------------------------------------------------------------------------
   function startGame() {
    
    // before starting new game, clear the snake and apple....
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')

        //deleting the queues.
        clearInterval(interval)

    // new game loaded....
        //generating apple.
        randomApple()
        
        //initalizing value.
        score = 0
        currentIndex = 0
        direction = 1
        scoreDisplay.innerText = score

        //defining time interval for interval.
        intervalTime = 1000

        //defining snake array.
        currentSnake = [2,1,0]

        //creating initial snake : blue.
        currentSnake.forEach(index => squares[index].classList.add('snake'))

        //making snake move snake :
        interval = setInterval(moveOutcomes, intervalTime)  
    }

// 2.methods that handles snake mvts :
//------------------------------------------------------------------------------------------------------------------------
function moveOutcomes() {
        
    // STEP 1:
        // 1stly check if snake is hitting any wall or itself....hence stops movement using clearInterval()
        // currentSnake[0] : stores the location of head of snake.
        if(
            // if snake is hitting a wall
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width)||   //if snake hits the top

            // if snake is hitting itself : new location is such which has snake class,
            //                              means it is hitting snake body.
            squares[currentSnake[0] + direction].classList.contains('snake') 
        ){
            //this will clear the interval/queue and hence stops movement if any of the above happen
            return clearInterval(interval) 
        }
    

    // STEP 2:
        //move fwd : 
            //take the last element of the currentSnake array
            const tail = currentSnake.pop() 
            //removes class of snake from the TAIL : snake shrink in size from backside as 
                // if eats apple : snake grows 
                // if not eats apple : snake remain same..hence tail will not have snake style
            squares[tail].classList.remove('snake')  

            //adding the new head into array of currentSnake : but not assigning it snake class here itself.
            currentSnake.unshift(currentSnake[0] + direction) 

        // STEP 2.1 : if next location is apple ...
        if(squares[currentSnake[0]].classList.contains('apple')) {

            //remove apple from that location : color change
            squares[currentSnake[0]].classList.remove('apple')

            //snake grow in size : hence make tail style as snake and add it at the end of currentSnake array.
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            
            // afterward tasks :
                //create new apple
                randomApple()
                //increment the score and display it
                score++             
                scoreDisplay.textContent = score
                //clear the current queue
                clearInterval(interval)

            //increasing the speed and calling moveOutcomes to next movement
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        // STEP 2.2 : next location is assigning the snake style to show that snake is moving ...if or if not eaten apple
        squares[currentSnake[0]].classList.add('snake')
    }
// 3.helper methods :
//------------------------------------------------------------------------------------------------------------------------
    // a. generating the apple :
    function randomApple() {

        // new apple location should not be such which is already into body of snake 
        // if new location is such which is already having snake class.. 
        // it means the location is in the body of snake..
        // find new location untill we get location which is not implementing the snake style :
        // squares[appleIndex].classList.contains('snake') : false when the new location is not implementing snake style.
        do{
          // new apple location  
          appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) 

        //once found assign it as location for apple style
        squares[appleIndex].classList.add('apple')
    }
    

    // b. deciding the direction on key-up
    function control(e) {

        //removing the head from snake style  
        squares[currentIndex].classList.remove('snake')

        //once head is remove, decide the direction for next move...
        if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
        direction = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }
    }

// 4. Defining Event Listeners 
//----------------------------------------------------------------------------------------------------------------------
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})