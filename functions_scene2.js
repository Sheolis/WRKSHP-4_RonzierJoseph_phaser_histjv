function borderless_tp(x,y){
  if (x<966){
    s2_player.setPosition(4932, y);
  }
  if (x>4932){
    s2_player.setPosition(966,y);
  }
  if (y<935){
    s2_player.setPosition(x, 4913);
  }
  if (y>4913){
    s2_player.setPosition(x, 935);
  }
}
