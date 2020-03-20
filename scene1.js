class Scene1 extends Phaser.Scene{
  constructor() {
    super("Scene1")
  }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT
init(){
  cam = this.cameras.main; //camera
  dispo_jj = 4; //dble jump
  position_05sec = 0;
  ////////////////////////////////////////////////arrays
  arr_pos_screens = [24,103,423,2024,5864]; //screen borders 0-1 ; 1-2 etc ... x values
  arr_dim_screens = [[80,44],[320,288],[1600,1200],[3840,2160]]; //dimension of each screens
  arr_posX_cam = [[24,24],[95,24],[135,103],[391,103],[483,423],[1864,423],[2048,2024],[5864,2024]];//[x,x_cam];
  arr_posY_cam = [[24,2236],[95,2236],[135,1985],[391,1985],[483,1073],[1864,1073],[2048,114],[5864,114]];//[x,y_cam];
  arr_key_zoom = [[24,22],[95,22],[135,3.6],[391,3.6],[483,0.89],[1864,0.89],[2048,0.499],[5864,0.499]];//keys zoom :[x,zoom];
  arr_appearance_player = [['p_0',4,4,0],['p_1',29,33,9],['p_2',148,294,18],['p_3',148,294,10]];// [key, height,width, stopframe]
  arr_speeds_player = [[40,-300,300,1],[100,725,1500,0],[500,1200,3000,0],[800,1800,3000,0]] //[x-speed, y-speed, gravity, bounce]
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD
preload(){
    this.load.image('p2_platform','assets/proto2_sol.png');
    this.load.image('p2_wall1','assets/proto_wall_1.png');
    this.load.image('p2_wall2','assets/proto_wall_2_3.png');
    this.load.image('p2_wall3','assets/proto_wall_3.png');
    this.load.image('p2_cub1','assets/proto_cub_1.png');
    this.load.image('p_cam','assets/proto2_cams.png');
    this.load.spritesheet('p_0','assets/p_0.png',{frameWidth: 4, frameHeight: 4});
    this.load.spritesheet('p_1','assets/p_1_spritesheet.png',{frameWidth: 30, frameHeight: 32});
    this.load.spritesheet('p_2','assets/p_2_spritesheet.png',{frameWidth: 148, frameHeight: 197});
    this.load.spritesheet('p_3','assets/p_3_spritesheet.png',{frameWidth: 148, frameHeight: 294});
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE
create(){
  //game.world.setBounds(0, 0, 7309, 4496);
    //////////////////////////////////////////////////////////////////////////////////////timers
  timer_change_screen = this.time.addEvent({ delay: 200, callback: is_screen_changing, loop: true });
  //////////////////////////////////////////////////////////////////////////////////////cursors
  cursors = this.input.keyboard.createCursorKeys();
  //this.input.keyboard.on('keydown_ONE',);
  //////////////////////////////////////////////////////////////////////////////////////background
  this.add.image(2984,1209,'p_cam');
  //////////////////////////////////////////////////////////////////////////////////////platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(3470,2300,'p2_platform');
  platforms.create(0,2207,'p2_wall2');
  platforms.create(115,2273,'p2_wall1');
  platforms.create(426,2207,'p2_wall2');
  platforms.create(362,2200,'p2_cub1');
  //////////////////////////////////////////////////////////////////////////////////////cam
  cam.setBounds(24, 2236, 80, 44);
  cam.zoomTo(22,0);
  //////////////////////////////////////////////////////////////////////////////////////player
  player = this.physics.add.sprite(38,2245,'p_0');
  player.setBounce(1);
  player.body.setGravityY(2300);
  this.physics.add.collider(player,platforms);


  //////////////////////////////////////////////////////////////////////////////////////player animations

  this.anims.create({
    		key:'metamorph_01',
    		frames: this.anims.generateFrameNumbers('p_1', {start: 0, end: 9}),
    		frameRate: 12,
    		repeat: 0
    	});
  this.anims.create({
    		key:'metamorph_10',
    		frames: this.anims.generateFrameNumbers('p_1', {start: 9, end: 0}),
    		frameRate: -12,
    		repeat: 0
    	});
  this.anims.create({
    		key:'metamorph_12',
    		frames: this.anims.generateFrameNumbers('p_2', {start: 0, end: 18}),
    		frameRate: 12,
    		repeat: 0
    	});
  this.anims.create({
    		key:'metamorph_21',
    		frames: this.anims.generateFrameNumbers('p_2', {start: 18, end: 0}),
    		frameRate: -12,
    		repeat: 0
    	});
  this.anims.create({
        key:'metamorph_23',
        frames: this.anims.generateFrameNumbers('p_3', {start: 0, end: 10}),
        frameRate: 12,
        repeat: 0
      });
  this.anims.create({
        key:'metamorph_32',
        frames: this.anims.generateFrameNumbers('p_3', {start: 10, end: 0}),
        frameRate: -12,
        repeat: 0
      });

}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE
update(){
  //////////////////////////////////////////////////////////////////////////////// player position
  p_x = player.body.center.x;
  //////////////////////////////////////////////////////////////////////////////// end scene condition
  if (p_x>5800){
    cam.fadeOut(500);
    this.scene.start("Scene2");
  }


  //////////////////////////////////////////////////////////////////////////////// camera
  framing(p_x);
  physicsPlayer(p_x);
  //////////////////////////////////////////////////////////////////////////////// player early check
  if (player.body.touching.down && check_jj_available(screen_position(p_x))) { dispo_jj = 0; }
  else if (player.body.touching.down && !check_jj_available(screen_position(p_x))) { dispo_jj = 5; }
  //////////////////////////////////////////////////////////////////////////////// player movement
  if(cursors.left.isDown && player.body.touching.down){
    player.setVelocityX(-speedX);
    if(screen_position(p_x)!=2){
      player.setFlipX(true);
    }
  }else if(cursors.right.isDown && player.body.touching.down){
    player.setVelocityX(speedX);
    player.setFlipX(false);
  }
  else if(!player.body.touching.down){
    player.setVelocityX(0.7*player.body.velocity["x"]);
  }
  else{
    player.setVelocityX(0);
  }

  if(cursors.left.isDown && !player.body.touching.down){
    player.setVelocityX(-speedX);
    if(screen_position(p_x)!=2){
      player.setFlipX(true);
    }
  }else if(cursors.right.isDown && !player.body.touching.down){
    player.setVelocityX(speedX);
    player.setFlipX(false);
  }
//double jump
  if(cursors.up.isDown && player.body.touching.down){
    player.setVelocityY(-speedY);
  }
  if(cursors.up.isUp && dispo_jj==0 && !player.body.touching.down){ dispo_jj = 1;}
  if(cursors.up.isDown && dispo_jj==1 && !player.body.touching.down){
    player.setVelocityY(-speedY);
    dispo_jj = 2;
  }
  /*if(player.body.velocity.y<=0 && !player.body.touching.down){
    player.anims.play('jump', true);
  }
  else if(player.body.velocity.y>0 && !player.body.touching.down){
    player.anims.play('down', true);
  }*/
}//double jump end
//}

}
