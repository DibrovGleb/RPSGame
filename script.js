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

    static play (userChoise,aiChoise) {
        if (userChoise == aiChoise) {
            return this.score(2)
        }
        else {
            switch (userChoise) {
                case '0':
                return aiChoise == 1 ? this.score(1) : this.score(0)
                case '1':
                return aiChoise == 0 ? this.score(0) : this.score(1)
                default:
                return aiChoise == 0 ? this.score(1) : this.score(0)
            }
        }
    }   
    
    static score (result){
        this.gamesCount++
        result == 2 ? this.tie++ + this.animateRobot('what', 'moveup')
        : result == 1 ? this.wins++ + this.animateRobot('angry', 'moveright') 
        : this.lose++ + this.animateRobot('happy', 'scaledown')
        return result
    }

    static displayScore(){
        wins.innerText = this.wins
        loses.innerText = this.lose
        ties.innerText = this.tie
        total.innerText = this.gamesCount
    }

    static fight(elem){
        this.iconsAnimation(1)

        setTimeout(() => {
                let aires = Game.getAiChoise()

                iconsComp[aires].style.cssText = "display: block; opacity:1;"
                elem.target.style.cssText = "display: block; opacity:1; pointer-events: none;"
                setTimeout(() => {
                    this.animateWin(this.play(elem.target.id, aires), iconsComp[aires], elem.target)
                    Game.displayScore()
                    setTimeout(() => {
                        Game.newgame()
                    }, 1500);
                }, 300)
        }, 1000)
    }

    static getAiChoise(){
        return Math.round(Math.random()*2)
    }

    static newgame(){
        this.iconsAnimation(0)
    }

    
    static animateWin(winner){
        //winner.style.cssText = "transform: scale(3.5) rotateY(180deg)"
        console.log(winner)
    }

    // Robot icon animation
    static animateRobot(imagename, classname){
        setTimeout(() => {
            robotimg.src = `icons/${imagename}.png`
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
                    icncomp.style.opacity = '1'
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

