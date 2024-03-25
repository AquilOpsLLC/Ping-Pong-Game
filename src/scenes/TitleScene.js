import Phaser from "phaser";
import WebFontFile from "./WebFontfile";

class TitleScene extends Phaser.Scene{
    preload(){
        this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    }

    create(){

        const text = this.add.text(400,200,'Ping Pong Game',{
            fontFamily: "Press Start 2P",
            fontSize:40
        })

        text.setOrigin(0.5,0.5)

        this.add.text(400,300,' Press SPACE for Start', {
            fontFamily: "Press Start 2P",

        }).setOrigin(0.5,0.5)

        this.input.keyboard.once('keydown-SPACE', ()=>{
            this.scene.start('game')
        })
    }

    update(){

    }
}

export default TitleScene