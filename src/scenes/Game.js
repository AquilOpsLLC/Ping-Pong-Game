import Phaser from "phaser";
import WebFontFile from "./WebFontfile";
import GameBackground from "./GameBackground";

const GameStatues={
    continue:'continue',
    pcWin:'PC-WIN',
    gamerWin: 'Gamer-WIN'
}

class Game extends Phaser.Scene{

    preload(){
        this.load.addFile(new WebFontFile(this.load,'Press Start 2P'))
        this.load.audio('pong-beeep','assets/beeep.mp3')
        this.load.audio('pong-plop','assets/plop.mp3')

    }

    init(){
        this.rightGamerSpeed= new Phaser.Math.Vector2(0,0)

        this.leftGamerScore=0
        this.rightGamerScore=0

        this.gameState=GameStatues.continue
        this.paused=false

    }
    create(){

        this.scene.run('gamebackground')

        const scoreStyle={
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        }

        this.leftScoreLabel = this.add.text(300,125, this.leftGamerScore, scoreStyle).setOrigin(0.5,0.5)
        this.rightScoreLabel = this.add.text(500,375, this.rightGamerScore, scoreStyle).setOrigin(0.5,0.5)
        
        this.ball=this.add.circle(400,250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball)

        const degree = Phaser.Math.Between(0,360);
        const vec = this.physics.velocityFromAngle(degree, 200);




        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.leftGamer= this.add.rectangle(50,250, 20, 100, 0xffffff, 1)
        this.physics.add.existing(this.leftGamer, true)
        this.physics.add.collider(this.leftGamer, this.ball, this.ballCrash,undefined,this);

        this.rightGamer= this.add.rectangle(750,250, 20, 100, 0xffffff, 1)
        this.physics.add.existing(this.rightGamer, true)
        this.physics.add.collider(this.rightGamer, this.ball, this.ballCrash,undefined,this);


        this.ball.body.setBounce(1,1);
        this.klavye = this.input.keyboard.createCursorKeys()


        this.physics.world.setBounds(-100,0, 1000,500)
        this.resetBall()

        this.ball.body.onWorldBounds=true
        this.physics.world.on('worldBounds', this.ballWorldBounds, this)
    }

    ballCrash(){
        this.sound.play('pong-beeep')
    }

    ballWorldBounds(body, up ,down, left, right){
        if(left || right){
            return;
        }

        this.sound.play('pong-plop')
    }

    resetBall(){
        this.ball.setPosition(400,200)
        const degree = Phaser.Math.Between(0,360);
        const vec = this.physics.velocityFromAngle(degree, 200);
        this.ball.body.setVelocity(vec.x,vec.y)
    }

    scoreChange(side){
        if(side=="left"){
            this.leftGamerScore+=1
            this.leftScoreLabel.text=this.leftGamerScore
        }else if(side=="right"){
            this.rightGamerScore+=1
            this.rightScoreLabel.text=this.rightGamerScore
        }
    }


    update(){

        if(this.paused || this.gameState !== GameStatues.continue){
            return;
        }
        const pcSpeed = 3
        if(this.klavye.up.isDown){
            this.leftGamer.y-=10;
        }else if(this.klavye.down.isDown){
            this.leftGamer.y+=10;
        }

        this.leftGamer.body.updateFromGameObject()

        const diff = this.ball.y-this.rightGamer.y

        if(diff<0){
            this.rightGamerSpeed.y=-pcSpeed;
            if(this.rightGamerSpeed.y<-10){
                this.rightGamerSpeed.y=-10
            }
            this.rightGamer.body.updateFromGameObject()
        }else if(diff>0){
            this.rightGamerSpeed.y=pcSpeed;
            if(this.rightGamerSpeed.y>10){
                this.rightGamerSpeed.y=10
            }
        }


        this.rightGamer.y+=this.rightGamerSpeed.y
        this.rightGamer.body.updateFromGameObject()
        if(Math.abs(diff)<10){
            return
        }

        if(this.ball.x<-30){
            this.resetBall()
            this.scoreChange('right')
        }else if(this.ball.x>830){
            this.resetBall()
            this.scoreChange('left')
        }

        const maxScore = 7
        if(this.leftGamerScore>=maxScore){
            this.gameState=GameStatues.gamerWin
        }else if(this.rightGamerScore>=maxScore){
            this.gameState=GameStatues.pcWin
        }
        
        if(this.gameState!=GameStatues.continue){
            this.ball.active=false
            this.physics.world.remove(this.ball.body)
            this.scene.stop('gamebackground')
            this.scene.start('gameover', {
                gamerScore: this.leftGamerScore,
                pcScore: this.rightGamerScore
            })
        }



    }
}

export default Game