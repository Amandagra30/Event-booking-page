window.addEventListener("load", function () {
    let body = document.querySelector("body");
    if (body) {window.addEventListener("resize", function () {
            if (window.innerWidth < 768) {body.style.width = "95%";}
             else {body.style.width = "80%";} 
        });
    } else {console.error("Elementas <body> nerastas!");}
});
window.addEventListener("scroll",
    function () {
        const hero =
        document.getElementById("headerText");
        if (window.scrollY > 150) {
            hero.classList.add("animate-up");
        } else {
            hero.classList.remove("animate-up");
        }
    }
);






