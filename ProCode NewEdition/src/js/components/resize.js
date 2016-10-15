var resize = function( cb){
    window.addEventListener( 'orientationchange', cb, true);
    window.addEventListener( 'resize', cb, true);
}
