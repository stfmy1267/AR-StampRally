window.addEventListener(
    "DOMContentLoaded",
    function () {
        function includeIdFiles() {
        for (let id of ["menu"]) {
            let e = document.getElementById(id);
            if (!e) continue;
            fn  = "../" + e.id + ".html";
            fetch(fn).then((resp) => {
            resp.text().then((text) => {
                let newmenu = e.insertAdjacentHTML("afterend", text);
                e.remove();
                newmenu.id = id;
            });
            });
            
        }
        }
        function init() {
        includeIdFiles();
        }
        init();
    });