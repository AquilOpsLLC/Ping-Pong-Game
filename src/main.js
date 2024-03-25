import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import Game from './scenes/Game';
import GameBackground from './scenes/GameBackground';
import GameOver from './scenes/GameOver';

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics:{
        default: "arcade",
        arcade:{
            gravity:{y: 0},
            debug: true,
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add('titleScene', TitleScene);
game.scene.add('game', Game);
game.scene.add('gamebackground', GameBackground);
game.scene.add('gameover', GameOver);
game.scene.start('titleScene');