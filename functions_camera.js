//////////////////////////////////////////////////////////////////////////////// camera
function framing(x) {
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

//CAM POSITIONNING
    var j=0;
    while (x>arr_pos_screens[j+1]){
        j++;
    }
//updateCam
    cam.setBounds(new_posX_cam, new_posY_cam, arr_dim_screens[j][0], arr_dim_screens[j][1]);
    cam.zoomTo(new_zoom,0);
    //console.log(linear(a,x,b));
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

function appearance(x){
    var i=0;
    while (x>arr_pos_screens[i+1]){
      i++;
    }
    player.setTexture(arr_appearance_player[i][0], 0).setSize(arr_appearance_player[i][1],arr_appearance_player[i][2]);
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
