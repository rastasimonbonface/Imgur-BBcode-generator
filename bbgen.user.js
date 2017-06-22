// ==UserScript==
// @name         imgur BBgen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  generates bbcode and is added to the post options
// @author       You
// @match        http://imgur.com/a/*
// @grant        none
// ==/UserScript==
'fuck strict'

function $e(tag, attrs, text) {
    let rv = document.createElement(tag);
    attrs = attrs || {};
    for (let a in attrs) {
        rv.setAttribute(a, attrs[a]);
    }
    if (text) {
        rv.textContent = text;
    }
    return rv;
}


//let style = $('<style>.bbtxt {     width: 187px;height: 44px !important;margin: 0;border: 1px solid #2c2f34 !important;border-right: none;opacity: 1 !important;background: #000 !important; } .bbtxtbtn {     width: 113px;height: 44px;background: #2c2f34;border: 1px solid #2c2f34;border-left: none;border-radius: 0 3px 3px 0;font-family: "Open Sans",Arial,sans-serif; color: #f2f2f2;font-size: 14px;}</style>')
let bbcode = ''
let imjson = ''
const button = '<span class="bbholder"><a class="btn-action bbcode" style="background: #1bb76e; padding: 6px; border-radius: 10px; color: white" href="#">bb</a></span>'
const input = '<div class="bbdiv"><input class="bbtxt" type="text" value="value" readonly><button class="bbtxtbtn">Copy</button></div>'
const doAjax = () =>{
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.imgur.com/3/album/"+runSlots.item.id+"/images",
  "method": "GET",
  "headers": {
    "authorization": "Client-ID 235b5d3777c76da"
  }
}
$.ajax(settings).done(function (response) {
    imjson = response.data
    getlinks()
});
}
const getlinks = () =>{
    console.log('click')
    for(img in imjson){
        let id = imjson[img].id
       bbcode += '[URL="http://imgur.com/' + id + '"][IMG]http://i.imgur.com/' + id + 'm.png[/IMG][/URL] '
    }
    console.log(bbcode)
    $('.post-options-gallery-submit').append(input)
    $('.bbtxt').val(bbcode)
}
(()=>{
    document.body.appendChild($e("style", null, `
.bbtxt {
width: 187px;
height: 44px !important;
margin: 0;
border: 1px solid #2c2f34 !important;
border-right: none;
opacity: 1 !important;
background: #000 !important;
}

.bbtxtbtn {
width: 113px;
height: 44px;
background: #2c2f34;border: 1px solid #2c2f34;
border-left: none;border-radius: 0 3px 3px 0;
font-family: "Open Sans",Arial,sans-serif;
color: #f2f2f2;font-size: 14px;
}
`))
    //$('html > head').append(style)
    $(".post-options-gallery-submit").on('click', '.bbtxtbtn',function(){
        $(".bbtxt").select()
        document.execCommand('copy')
    })
    $(".post-options-gallery-submit").on('click', '.bbdiv',function(){
        $(".bbtxt").select()
    })
   doAjax()
})();