class Scene1 extends Phaser.Scene{
  constructor() {
    super("Scene1")
  }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INIT
init(){
  cam = this.cameras.main;
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD
preload(){
    this.load.image('p2_platform','assets/proto2_sol.png');
    this.load.image('p_cam','assets/proto2_cams.png');
    this.load.image('p_p_1','assets/proto_perso_1.png');
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE

create(){
  //game.world.setBounds(0, 0, 7309, 4496);
  cursors = this.input.keyboard.createCursorKeys();
  this.add.image(2984,1209,'p_cam');
  platforms = this.physics.add.staticGroup();
  platforms.create(3470,2303,'p2_platform');
  //////////////////////////////////////////////////////////////////////////////////////cam
  cam.setBounds(24,2236, 5967, 2418);
  cam.zoomTo(1,0);
  //////////////////////////////////////////////////////////////////////////////////////player
  player = this.physics.add.image(10,2280,'p_p_1');
  this.physics.add.collider(player,platforms);

  //cam.centerOn(400, 300);
  //cam.setSize(300, 300) ;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE
update(){
}

}
