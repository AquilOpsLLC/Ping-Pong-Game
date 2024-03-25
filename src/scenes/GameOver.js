import Phaser from "phaser";
import Game from "./Game";
export default class GameOver extends Phaser.Scene{
    create(data){
        let result="You Lose"

        if(data.gamerScore > data.pcScore){
            result = "You WIN!"
        }
        this.add.text(400,200,result, {
            fontSize: 40,
            fontFamily: '"Press Start 2P"'
        }).setOrigin(0.5,0.5)

        let continueSent="Press SPACE for continue"
        this.add.text(400,300,continueSent, {
            fontSize: 20,
            fontFamily: '"Press Start 2P"'
        }).setOrigin(0.5,0.5)

        this.input.keyboard.once('keydown-SPACE',() =>{
            this.scene.start('game')
        })
    }
}