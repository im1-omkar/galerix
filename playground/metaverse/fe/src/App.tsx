import { useEffect } from 'react'
import './App.css'
import * as Phaser from "phaser";

function App() {

  useEffect(() => {

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: {
          debug: false // turn this ON for now
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    var game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.image('bg', 'assets/bg.png');
      this.load.image('chair', 'assets/chair.png')
      this.load.spritesheet('dude', 'assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
      });

    }

    var statics;
    var player: any;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let lastDirection = 'down';

    function create(this: Phaser.Scene) {

      const bg = this.add.image(400, 300, 'bg');
      bg.setDisplaySize(800, 600);

      statics = this.physics.add.staticGroup();

      statics.create(200, 400, 'chair').setScale(0.3);
      statics.create(400, 200, 'chair').setScale(0.3);
      statics.create(600, 400, 'chair').setScale(0.3);

      statics.getChildren().forEach((child: Phaser.GameObjects.GameObject) => {
        const obj = child as Phaser.Physics.Arcade.Image;

        obj.setSize(obj.width * 0.6, obj.height * 0.6);
        obj.refreshBody();
      });

      player = this.physics.add.sprite(200, 100, 'dude', 0);

      this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers('dude', { start: 42, end: 47 }),
        frameRate: 8,
        repeat: -1
      });
      // UP
      this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNumbers('dude', { start: 30, end: 35 }),
        frameRate: 8,
        repeat: -1
      });

      // RIGHT
      this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 29 }),
        frameRate: 8,
        repeat: -1
      });

      // LEFT
      this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('dude', { start: 36, end: 41 }),
        frameRate: 8,
        repeat: -1
      });

      cursors = this.input.keyboard!.createCursorKeys();

      this.physics.add.collider(player, statics)

      const graphics = this.add.graphics();
      graphics.lineStyle(2, 0x0000ff); // blue border

      statics.getChildren().forEach((child: Phaser.GameObjects.GameObject) => {
        const obj = child as Phaser.Physics.Arcade.Image;

        graphics.strokeRect(
          obj.x - obj.displayWidth / 2,
          obj.y - obj.displayHeight / 2,
          obj.displayWidth,
          obj.displayHeight
        );
      });

    }

    function update(this: Phaser.Scene) {

      player.setVelocity(0);

      if (cursors.left?.isDown) {
        player.setVelocityX(-100);
        lastDirection = 'left';
        player.play('walk-left', true);


        if (player.anims.currentAnim?.key !== 'walk-left') {
          player.play('walk-left');
        }

      } else if (cursors.right?.isDown) {
        player.setVelocityX(100);
        lastDirection = 'right';
        player.play('walk-right', true);


        if (player.anims.currentAnim?.key !== 'walk-right') {
          player.play('walk-right');
        }

      } else if (cursors.up?.isDown) {
        player.setVelocityY(-100);
        lastDirection = 'up';
        player.play('walk-up', true);


        if (player.anims.currentAnim?.key !== 'walk-up') {
          player.play('walk-up');
        }

      } else if (cursors.down?.isDown) {
        player.setVelocityY(100);
        lastDirection = 'down';
        player.play('walk-down', true);


        if (player.anims.currentAnim?.key !== 'walk-down') {
          player.play('walk-down');
        }

      } else {
        player.stop();

        if (lastDirection === 'left') {
          player.setFrame(15); // first frame of left row
        } else if (lastDirection === 'right') {
          player.setFrame(3);
        } else if (lastDirection === 'up') {
          player.setFrame(9);
        } else if (lastDirection === 'down') {
          player.setFrame(21);
        }
      }
    }

    return () => {
      game.destroy(true);
    }

  }, [])

  return (
    <div id="game-container"></div>
  )
}

export default App
