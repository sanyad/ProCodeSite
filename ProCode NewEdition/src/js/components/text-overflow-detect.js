var textOverflow = function( selector, maxline, cb, reversecp){

    var els = document.querySelectorAll( selector);

    var lastElHeight = null;
    var check = function(){

        for( var idx in els) {

            if( ! els.hasOwnProperty(idx)){
                continue;
            }

            var el = els[ idx];

            if( window['getComputedStyle']) {
                var elStyle = window.getComputedStyle( el);
            } else {
                //IE
                var elStyle = el.currentStyle;
            }


            var text = el.innerHTML
                ,elHeight = el.clientHeight
                ,elFontFamily = elStyle[ 'font-family']
                ,elLineHeight = elStyle[ 'line-height'];


            var temp = document.createElement( 'div');
            temp.setAttribute( 'style', 'margin:0px;padding:0px;width: 99999px;line-height:' + elLineHeight + ';font-family:' + elFontFamily + ';font-size:' + el.style.fontSize);
            temp.innerHTML = text;

            temp = document.body.appendChild(temp);
            var tempHeight = temp.clientHeight;
            temp.parentNode.removeChild(temp);

            var maxHeight = tempHeight * maxline;

            if( lastElHeight && lastElHeight == elHeight) {
                return;
            }

            if( maxHeight < elHeight) {
                cb();
            } else {
                reversecp();
            }

            lastElHeight = elHeight;
        }
    }

    resize( check)
    check();
}
