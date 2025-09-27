/****************************************************
 * CIS213 Unit 4, Guided Practice 1
 * Author: <Your Name Here>
 * Date:   <Date Here>
 ****************************************************/
"use strict"

function populateInfo() {
    if (location.search) {
        var greeting = location.search;
        greeting = greeting.replace("+", " ");
        greeting = greeting.substring(greeting.lastIndexOf("=") + 1);
        document.getElementById("greetingtext").innerHTML =
            decodeURIComponent(greeting);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", populateInfo, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", populateInfo);
}
