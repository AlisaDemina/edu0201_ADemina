// ==UserScript==
// @name         Bot2 for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["как звучит флейта", "Валторна", "Тромбон", "Кларнет", "Фагот", "Гобой", "Балабан"],
    "crushdrummers.ru":["Барабанное шоу", "Заказать шоу барабанщиков", "Барабанное шоу в Москве"]
}
let site = Object.keys(sites) [Math.floor(Math.random()*Object.keys(sites).length)];
let keywords=sites[site];
let randomIndex=Math.floor(Math.random()*keywords.length);
let keyword= keywords[randomIndex];
let yandexImput=document.getElementsByName("text")[0];
let button = document.getElementsByClassName("button_theme_websearch")[0];
let links=document.links;
if(button!=undefined){
    let i=0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        yandexImput.value+=keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            button.click();
        }
    },250);
}else{
    site = getCookie("site");
    let nextYandexPage=true;
    let currentYandexPage=document.getElementsByClassName("pager__item_current_yes")[0].innerText;
    for(let i=0; i<links.length; i++){
        let link=links[i];
        if(link.href.indexOf(site)!=-1){
            nextYandexPage=false;
            link.removeAttribute("target");
            link.click();
            break;
        }
    }
    if(nextYandexPage && currentYandexPage<11) document.getElementsByClassName("pager_item_kind_next")[0].click();
    else if(currentYandexPage==11) location.href="https://yandex.ru/";
}
