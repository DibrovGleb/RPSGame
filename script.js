const doc = document,
main = doc.querySelector('#main'),
iconsPlayer = doc.querySelectorAll('#choise>p'),
iconsComp = doc.querySelectorAll('#aichoise>p'),
wins = doc.querySelector('#wins'),
loses = doc.querySelector('#loses'),
ties = doc.querySelector('#ties'),
total = doc.querySelector('#total'),
choisecontainer = doc.querySelector('#choise')

class Game {
    static gamesCount = 0;
    static gamearr = ['Камень', 'Ножницы', 'Бумага']
    static wins = 0;
    static lose = 0;
    static tie = 0;

    static play (userChoise,aiChoise) {
        console.log(userChoise, aiChoise)
        if (userChoise == aiChoise) {
            Game.gamesCount++
            Game.tie++
        }
        else {
            switch (userChoise) {
                case '0':
                aiChoise == 1 ? Game.score(1) : Game.score(0)
                break
                case '1':
                aiChoise == 0 ? Game.score(0) : Game.score(1)
                break
                default:
                aiChoise == 0 ? Game.score(1) : Game.score(0)
                break
            }
        }
    }   
    
    static score (result){
        Game.gamesCount++
        result == 1 ? Game.wins++ : Game.lose++
    }

    static displayScore(){
        wins.innerText = Game.wins
        loses.innerText = Game.lose
        ties.innerText = Game.tie
        total.innerText = Game.gamesCount
    }

    static fight(elem){

        iconsComp.forEach(icncomp => {
            icncomp.style.opacity = '0'
            setTimeout(() => {
                icncomp.style.display = 'none'
            }, 1000)
        })

        iconsPlayer.forEach(icn => {
            icn.style.opacity = '0'
            setTimeout(() => {
                icn.style.display = 'none'
            }, 1000)
        })

        setTimeout(() => {
                let aires = Game.getAiChoise()

                iconsComp[aires].style.cssText = "display: block; opacity:1"
                elem.target.style.cssText = "display: block; opacity:1"
                setTimeout(() => {
                    Game.play(elem.target.id, aires);
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
        iconsComp.forEach(icncomp => {
            icncomp.style.display = 'block'
            setTimeout(() => {
                icncomp.style.opacity = '1'
            }, 500);
        })
        iconsPlayer.forEach(icn => {
            icn.style.display = 'block'
            setTimeout(() => {
                icn.style.opacity = '1'
            }, 500);
        })
    }
    /*
    static animatewin(winner){
        winner.style.cssText = "animation: rotateY 3s 0.5s infinite linear;"
    }
    */
}


iconsPlayer.forEach(element => {
    element.addEventListener('click', (elem)=>{
        Game.fight(elem)
    })
});

