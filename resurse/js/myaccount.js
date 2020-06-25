function check() {
    var Timer, sec, added = 0;
    resetare();

	/Alegem evenimentele pentru care sa se reseteze timpul/

    window.onmousemove = resetare;
    window.onmousedown = resetare;
    window.ontouchstart = resetare;
	window.ondblclick =resetare;
    window.onkeypress = resetare;
    window.addEventListener('scroll',resetare, true);

	// elementul creat div va primi clasa "box"
    let modelbox = document.createElement('div');
    modelbox.classList.add("box");

	// mai cream un div auxiliar ce va avea clasa setari
	let divaux = document.createElement('div');
    divaux.classList.add("setari");
    modelbox.appendChild(divaux);//va devenii copilul divului de mai sus


	//si elementul de tip h4 va avea clasa titlu
    let textT = document.createElement('h4');
    textT.classList.add("titlu");
    divaux.appendChild(textT);//va deveni copilul divului auxiliar


    function idle() {
		textT.textContent = "";
        document.getElementsByTagName('main')[0].appendChild(modelbox);
        modelbox.style.display = "block";
        //document.body.style.position = "fixed";
        added = 1;
        sec = 4;
        idleInterval = setInterval(function(){
            sec++;
            textT.textContent = "Ai fost inactiv " + sec + " secunde";
        }, 1000);
    }

    function resetare() {

        if(added) {
            document.getElementsByTagName('main')[0].removeChild(document.getElementsByTagName('main')[0].lastChild);
            //document.body.style.position = "absolute";
            modelbox.style.display = "none";
            clearInterval(idleInterval);
            added = 0;
        }

        clearTimeout(Timer);
        Timer = setTimeout(idle, 5000);
    }
}
window.onload = check();
