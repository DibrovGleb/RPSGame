const doc = document,
main = doc.querySelector('#main'),
iconsPlayer = doc.querySelectorAll('#choise>p'),
iconsComp = doc.querySelectorAll('#aichoise>p'),
wins = doc.querySelector('#wins'),
loses = doc.querySelector('#loses'),
ties = doc.querySelector('#ties'),
total = doc.querySelector('#total'),
choisecontainer = doc.querySelector('#choise'),
robotimg = doc.querySelector('#robot')

class Game {
    static gamesCount = 0;
    static wins = 0;
    static lose = 0;
    static tie = 0;
    /*static winstreak = 0;
    static losestreak = 0;
    static tiestreal = 0;*/

    static fight(elem){
        this.iconsAnimation(1)

        setTimeout(() => {
                let aires = this.getAiChoise()

                iconsComp[aires].style.cssText = "display: block; opacity:1;"
                elem.target.style.cssText = "display: block; opacity:1; pointer-events: none;"
                setTimeout(() => {
                    this.animateWin(this.play(elem.target.id, aires), iconsComp[aires], elem.target)
                    this.displayScore()
                    setTimeout(() => {
                        this.newgame()
                    }, 1500);
                }, 200)
        }, 1000)
    }

    // determine the winner and return the value
    static play (userChoise, aiChoise) {
        if (userChoise == aiChoise) return this.score(2)
        else
            switch (userChoise) {
                case '0':
                return aiChoise == 1 ? this.score(1) : this.score(0)
                case '1':
                return aiChoise == 0 ? this.score(0) : this.score(1)
                default:
                return aiChoise == 0 ? this.score(1) : this.score(0)
            }
    }   
    
    // Adds the result to the desired variable changes the robot icon and returns result
    static score (result){
        this.gamesCount++
        result == 2 ? this.tie++ + this.animateRobot('what', 'moveup')
        : result == 1 ? this.wins++ + this.animateRobot('angry', 'moveright') 
        : this.lose++ + this.animateRobot('happy', 'scaledown')
        return result
    }

    // Update score
    static displayScore(){
        wins.innerText = this.wins
        loses.innerText = this.lose
        ties.innerText = this.tie
        total.innerText = this.gamesCount
    }

    // Generate random number from 0 to 2 where 0 is rock and 1 is scissors
    static getAiChoise(){
        return Math.round(Math.random()*2)
    }

    // Starting new game by showing up the icons
    static newgame(){
        this.iconsAnimation(0)
    }

    
    static animateWin(winner, compicn, playericn){
        switch (winner) {
            case 1:
                playericn.style.cssText = "transform: scale(4.5) rotateY(360deg)"
                break;
            case 0:
                compicn.style.cssText = "transform: rotateX(180deg) scale(4.5) rotateY(-360deg)"
                break
            default:
                playericn.style.cssText = "transform: scale(4.5) rotateY(360deg)"
                compicn.style.cssText = "transform: rotateX(180deg) scale(4.5) rotateY(-360deg)"
                break;
        }
        console.log(winner, compicn, playericn)
    }

    // Robot icon animation
    static animateRobot(imagename, classname){
        setTimeout(() => {
            robotimg.src = `https://raw.githubusercontent.com/DibrovGleb/RPSGame/main/icons/${imagename}.png`
            robotimg.classList.add(classname)
            setTimeout(() => {
                robotimg.classList.remove(classname)
            }, 500);  
        }, 200);
    }

    // icons fade in fade out animations 
    static iconsAnimation(value){
        if (value == 1){
            iconsComp.forEach(icncomp => {
                icncomp.style.opacity = '0'
                setTimeout(() => {
                    icncomp.style.display = 'none'
                }, 1000)
            })

            iconsPlayer.forEach(icn => {
                icn.style.cssText = 'opacity:0; pointer-events: none;'
                setTimeout(() => {
                    icn.style.display = 'none'
                }, 1000)
            })
        }
        else {
            iconsComp.forEach(icncomp => {
                icncomp.style.display = 'block'
                setTimeout(() => {
                    icncomp.style.cssText = 'opacity:1;'
                }, 500);
            })
            iconsPlayer.forEach(icn => {
                icn.style.display = 'block'
                setTimeout(() => {
                    icn.style.cssText = 'opacity:1; pointer-events: auto;'
                }, 500);
            })
        }
    }
}

iconsPlayer.forEach(element => {
    element.addEventListener('click', (elem)=>{
        Game.fight(elem)
    })
});