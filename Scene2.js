class Scene2 extends Phaser.Scene{
  constructor() {
    super("Scene2")
  }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT
init(){
  //camera
  ////////////////////////////////////////////////arrays
  /*arr_pos_screens = [24,103,423,2024,5864]; //screen borders 0-1 ; 1-2 etc ... x values
  arr_dim_screens = [[80,44],[320,288],[1600,1200],[3840,2160]]; //dimension of each screens
  arr_posX_cam = [[24,24],[95,24],[135,103],[391,103],[483,423],[1864,423],[2048,2024],[5864,2024]];//[x,x_cam];
  arr_posY_cam = [[24,2236],[95,2236],[135,1985],[391,1985],[483,1073],[1864,1073],[2048,114],[5864,114]];//[x,y_cam];
  arr_key_zoom = [[24,22],[95,22],[135,3.6],[391,3.6],[483,0.89],[1864,0.89],[2048,0.499],[5864,0.499]];//keys zoom :[x,zoom];
  arr_appearance_s2_player = [['p_p_1',5,5],['p_p_2',29,33],['p_p_3',148,294],['p_p_3',148,294]];// [key, height]
  arr_speeds_s2_player = [[70,250,2300,1],[100,725,1500,0],[500,1200,3000,0],[500,1800,3000,0]] //[x-speed, y-speed, gravity, bounce]
*/
 this.speed = 500;
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD
preload(){
    this.load.image('p_2_cam','assets/scene2_proto2_cams.png');
    this.load.spritesheet('p_p_4','assets/proto_perso_4.png',{frameWidth: 108, frameHeight: 108});
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE
create(){
  //game.world.setBounds(0, 0, 7309, 4496);
  //////////////////////////////////////////////////////////////////////////////////////cursors
  cursors = this.input.keyboard.createCursorKeys();
  //////////////////////////////////////////////////////////////////////////////////////background
  this.add.image(2936,2936,'p_2_cam');
  //////////////////////////////////////////////////////////////////////////////////////platforms

  //////////////////////////////////////////////////////////////////////////////////////s2_player
  s2_player = this.physics.add.sprite(988,2923,'p_p_4');
  //s2_player.setTexture('p_p_4',0).setSize(108,108);
  //s2_player.setPosition(141, 1920);
  s2_player.body.setGravityY(-300);
  //////////////////////////////////////////////////////////////////////////////////////cam
  this.physics.world.setBounds(0, 0, 5872, 5872);
  s2_cam = this.cameras.main;
  s2_cam.setBounds(0, 0, 5872, 5872);
  s2_cam.startFollow(s2_player, true, 1, 1);
  s2_cam.fadeIn(500);
  //s2_cam.zoomTo(22,0);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE
update(){

  //////////////////////////////////////////////////////////////////////////////// camera

  //////////////////////////////////////////////////////////////////////////////// s2_player
  borderless_tp(s2_player.body.center.x,s2_player.body.center.y)


  if(cursors.left.isDown){
    s2_player.setVelocityX(-this.speed);
  }else if(cursors.right.isDown){
    s2_player.setVelocityX(this.speed);
  }else{
    s2_player.setVelocityX(0);
  }

  if(cursors.up.isDown){
    s2_player.setVelocityY(-this.speed);
  }else if(cursors.down.isDown){
    s2_player.setVelocityY(this.speed);
  }else {
    s2_player.setVelocityY(0);
  }

}
//}

}
