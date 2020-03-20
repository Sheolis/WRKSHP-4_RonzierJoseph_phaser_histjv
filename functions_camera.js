//////////////////////////////////////////////////////////////////////////////// camera
function screen_position(x){
  var i=0;
  while (x>arr_pos_screens[i+1]){
    i++;
  }
  return i;
}


function framing(x) {
  //CAM POSITIONNING
    var j = screen_position(x);
  //ZOOM
    var i=0;
    while (x>arr_key_zoom[i+1][0]){
      i++;
    }
    var new_zoom = linear(x, arr_key_zoom[i][0], arr_key_zoom[i+1][0],
                          arr_key_zoom[i][1], arr_key_zoom[i+1][1]);

    var new_posX_cam = linear(x, arr_posX_cam[i][0], arr_posX_cam[i+1][0],
                              arr_posX_cam[i][1], arr_posX_cam[i+1][1]);

    var new_posY_cam = linear(x, arr_posY_cam[i][0], arr_posY_cam[i+1][0],
                              arr_posY_cam[i][1], arr_posY_cam[i+1][1]);


//updateCam
    cam.setBounds(new_posX_cam, arr_posY_cam[j*2][1], arr_dim_screens[j][0], arr_dim_screens[j][1]);
    cam.zoomTo(new_zoom,0);
}

function linear(x, x1, x2, y1, y2){
    //get slope
    var a = slope(x1, x2, y1, y2);
    //constant
    var b = y1 - a * x1;
    return f(a, x, b);
}

function slope(x1, x2, y1, y2){
    return (y2 - y1) / (x2 - x1);
  }

function f(a,x,b){
    return a * x + b;
}
//////////////////////////////////////////////////////////////////////////////// player

function appearance(i){
    console.log(i);
    if (player.body.velocity["x"]>0) {
      player.setPosition(player.body.center.x + 1, player.body.center.y); //evite le cas de rester sur le point de contrôle du changement de screen
      player.setTexture(arr_appearance_player[i+1][0], arr_appearance_player[i+1][3]).setSize(arr_appearance_player[i+1][1],arr_appearance_player[i+1][2]);
      player.anims.play('metamorph_' + i + (i+1));
    }
    else {
      player.setPosition(player.body.center.x - 1, player.body.center.y); //evite le cas de rester sur le point de contrôle du changement de screen
      player.setTexture(arr_appearance_player[i-1][0], arr_appearance_player[i-1][3]).setSize(arr_appearance_player[i-1][1],arr_appearance_player[i-1][2]);
      player.anims.play('metamorph_' + i + (i-1));
    }
}

function is_screen_changing(){
    var i = screen_position(p_x);
    if (i != position_05sec){
      appearance(position_05sec);
      position_05sec = i;

    }

}

function physicsPlayer(x){
    var i=0;
    while (x>arr_pos_screens[i+1]){
      i++;
    }
    speedX = arr_speeds_player[i][0];
    speedY = arr_speeds_player[i][1];
    player.body.setGravityY(arr_speeds_player[i][2]);
    player.setBounce(arr_speeds_player[i][3]);
}
