var roll, currentPoints, ukupniScore, krug = 0, aktivniIgrac, tecePotez = false, biloPromjena = false, cilj = 30;
    var modus = 1;
    var brojac = 0;

    var igraj = document.getElementById('play');
    var ponovi = document.getElementById('restart');
    var zadrzi = document.getElementById('hold');
    var ok = document.getElementById('ok');
    var glavnaKocka = document.getElementById('kocka');

    var cancel = document.getElementById('cancel');
    cancel.addEventListener('click', function () {
        document.getElementById('postavkeProzor').classList.add('sakrij');
        document.getElementById('noviCilj').value = "";
        document.getElementById('novoIme-0').value = "";
        document.getElementById('novoIme-1').value = "";
        if (brojac != 0) {
        document.getElementById('poljeGlavno').classList.remove('pocetak');
        }
    });

    var save = document.getElementById('save');
    save.addEventListener('click', function () {
        var a = document.getElementById('noviCilj');
        var sveok = true;

        if (a.value != "" && a.value != null && a.value > 19 && a.value < 1001) {
            cilj = parseInt(a.value );
            document.getElementById('goal').innerHTML = cilj;
            console.log('cilj je ' + cilj);
            a.value = "";
            biloPromjena = true;
        }
        else{
            alert('Vrijednost ciljne visine bodova mora biti između 20 i 1000');
            sveok = false;
        }
        var b = document.getElementById('novoIme-0');
        if (b.value != "") {
            document.getElementById('ime-0').innerHTML = b.value;
            console.log('igrac 1 se sada zove ' + b.value);
            b.value = "";
            biloPromjena = true;
        }
        var c = document.getElementById('novoIme-1');
        if (c.value != "") {
            document.getElementById('ime-1').innerHTML = c.value;
            console.log('igrac 2 se sada zove ' + c.value);
            c.value = "";
            biloPromjena = true;
        }
        if (sveok) {
                document.getElementById('postavkeProzor').classList.add('sakrij');
                if (brojac != 0 && biloPromjena) {
                    document.getElementById('poruka2').classList.remove('sakrij');
                    document.getElementById('pokrivac').classList.remove('sakrij');
                    document.getElementById('poljeGlavno').classList.remove('pocetak');
                    console.log('radi li ovo ikad?');
                }
        }      
    });

    var da = document.getElementById('da');
    da.addEventListener('click', function () {
        document.getElementById('poruka2').classList.add('sakrij');
        document.getElementById('pokrivac').classList.add('sakrij');
        ponovo();
    });

    var onePlayerGame = document.getElementById('p1');
    onePlayerGame.addEventListener('click', function () {
        modus = 1;
        document.getElementById('modeSelector').classList.add('sakrij');
        document.getElementById('poljeGlavno').classList.remove('pocetak');
        brojac++;
        console.log('odabran modus ' + modus);
    });

    var twoPlayerGame = document.getElementById('p2');
    twoPlayerGame.addEventListener('click', function () {
        modus = 2;
        document.getElementById('modeSelector').classList.add('sakrij');
        document.getElementById('poljeGlavno').classList.remove('pocetak');
        brojac++;
        console.log('odabran modus ' + modus);
    });

    var postavke = document.getElementById('dugmePostavke');
    postavke.addEventListener('click', function () {
        document.getElementById('postavkeProzor').classList.remove('sakrij');
    });

    var postavke2 = document.getElementById('dugmePostavke2');
    postavke2.addEventListener('click', function () {
        document.getElementById('postavkeProzor').classList.remove('sakrij');
        document.getElementById('poljeGlavno').classList.add('pocetak');
    });

    var dugmeInfo = document.getElementById('dugmeInfo');
    dugmeInfo.addEventListener('mouseover', function () {
        document.getElementById('info').classList.remove('sakrij');
    })

    var dugmeInfo = document.getElementById('dugmeInfo');
    dugmeInfo.addEventListener('mouseout', function () {
        document.getElementById('info').classList.add('sakrij');
    })

    var dugmeNapomena = document.getElementById('dugmeNapomena');
    dugmeNapomena.addEventListener('mouseover', function () {
        document.getElementById('napomena').classList.remove('sakrij');
    })

    var dugmeNapomena = document.getElementById('dugmeNapomena');
    dugmeNapomena.addEventListener('mouseout', function () {
        document.getElementById('napomena').classList.add('sakrij');
    })

    zadrzi.disabled = true;
    ponovi.disabled = true;
 
main();

// sami cin bacanja kocke

function rollDice ()
{
    skakanjeKocke();
    roll = Math.floor((Math.random() * 6) + 1);    
    return roll;
}

// pokretanje igre i bacanje kocke

igraj.addEventListener('click', function () {
    igra();
} );

function igra(){
    if (tecePotez) {
        
        document.getElementById('polje-' + aktivniIgrac).classList.add('aktivan');

        if (krug === 0) {
            krug++;
            document.getElementById('indikator').innerHTML = 'Krug ' + krug;    // ispisuje trenutni broj kruga
            document.getElementById('indikator').classList.remove('sakrij');
        }
        if (brojac === 0) {    
        console.log('cilj je ' + cilj);
        }
        brojac++;   // ovo sluzi samo za postavljanje uslova za farbanje glavnog polja
        currentRoll=rollDice();
            
        setTimeout(function () {
        slike(currentRoll, glavnaKocka);// ovdje ubacuje odgovarajucu sliku
        }, 1000);
        document.getElementById('kocka').classList.remove('sakrij');
        document.getElementById('restart').classList.remove('sakrij');
        document.getElementById('poljeGlavno').classList.remove('poljeKec');
        zadrzi.disabled = false;

        var slicica = document.createElement('img');
            slicica.setAttribute('id', 'malaKocka');
            document.getElementById("trenutno-" + aktivniIgrac).appendChild(slicica);
            slike(currentRoll, slicica);

        if (currentRoll === 1) {

            document.getElementById('poljeGlavno').classList.add('poljeKec');

            // komp ne treba da vidi poruku i pokrivac

            if (aktivniIgrac != 1 || modus === 2) {
                document.getElementById('poruka').classList.remove('sakrij');
                document.getElementById('pokrivac').classList.remove('sakrij');
            }
            
            currentPoints[aktivniIgrac] = 0;

            igraj.disabled = true;
            zadrzi.disabled = true;
            ponovi.disabled = true;

            setTimeout(function () {
                mijenjajIgraca();
            }, 1000);
        }
        else{
            currentPoints[aktivniIgrac] += currentRoll;
            document.getElementById('total-' + aktivniIgrac).classList.remove('sakrij');
            document.getElementById('saberi-' + aktivniIgrac).innerHTML = currentPoints[aktivniIgrac];
        }
    }
}

// kada igrac izabere 'hold'

    zadrzi.addEventListener('click', cuvamBodove);  // mora biti addEventListener, ne radi sa onclick eventom

    function cuvamBodove() {
        if (tecePotez) {
            ukupniScore[aktivniIgrac] += currentPoints[aktivniIgrac];
            document.getElementById('kocka').classList.add('sakrij');
            }

        // provjera uslova pobjede
            
        if (ukupniScore[0] >= cilj || ukupniScore[1] >= cilj) {

            console.log('Igra zavrsena rezultatom:');
            console.log(ukupniScore[0] + ':' + ukupniScore[1]);
            document.getElementById('bodovi-' + aktivniIgrac).innerHTML = ukupniScore[aktivniIgrac];
            document.getElementById('trenutno-' + aktivniIgrac).innerHTML = '';
            document.getElementById('total-' + aktivniIgrac).classList.add('sakrij');
            document.getElementById('polje-' + aktivniIgrac).classList.remove('aktivan');
            tecePotez = false;
            igraj.disabled = true;
            zadrzi.disabled = true;
            ponovi.disabled = false;

            //ubaci novi element div sa rezultatom iz kruga

            var rezKruga = document.createElement('div');
            var rezultati = document.getElementById('container-' + aktivniIgrac);

            rezultati.appendChild(rezKruga);
            rezKruga.setAttribute('id', 'dijete-' + aktivniIgrac + '-' + krug);
            rezKruga.innerHTML = currentPoints[aktivniIgrac];

            // victory screen

            if (ukupniScore[0] > ukupniScore[1]){
                var poruka = document.getElementById('win-0');
                poruka.innerHTML = 'Pobjednik!';
                poruka.style.fontSize = '3vw';
                poruka.style.color = 'gold';
                var mesidz = document.getElementById('win-1');
                mesidz.innerHTML = 'Poraženi...';
                mesidz.style.fontSize = '3vw';
                mesidz.style.color = 'maroon';
            }
            else{
                var poruka = document.getElementById('win-1');
                poruka.innerHTML = 'Pobjednik!';
                poruka.style.fontSize = '3vw';
                poruka.style.color = 'gold';
                var mesidz = document.getElementById('win-0');
                mesidz.innerHTML = 'Poraženi...';
                mesidz.style.fontSize = '3vw';
                mesidz.style.color = 'maroon';
            }
        }
        else{
            mijenjajIgraca();
        }
    }

// zatvara prozorcic poruke

ok.addEventListener('click', prihvati);
function prihvati() {
    document.getElementById('poruka').classList.add('sakrij');
    document.getElementById('pokrivac').classList.add('sakrij');
    document.getElementById('poljeGlavno').classList.remove('poljeKec');
    document.getElementById('kocka').classList.add('sakrij');
    if (modus === 2) {       
    igraj.disabled = false;
    ponovi.disabled = false;
    }
}

// mijenja aktivnog igraca

function mijenjajIgraca() {

    //ubaci novi element div sa rezultatom iz kruga
    var rezKruga = document.createElement('div');
    var rezultati = document.getElementById('container-' + aktivniIgrac);

    rezultati.appendChild(rezKruga);
    rezKruga.setAttribute('id', 'dijete-'+ aktivniIgrac + '-' + krug);
    rezKruga.innerHTML = currentPoints[aktivniIgrac];
    if (currentPoints[aktivniIgrac] === 0) {
        rezKruga.classList.add('nula');
    }
    
	//sama promjena aktivnog igraca		

    aktivniIgrac === 0? aktivniIgrac = 1: aktivniIgrac = 0;
    currentPoints[aktivniIgrac] = 0;
    console.log(ukupniScore[0] + ':' + ukupniScore[1]);

    document.getElementById('bodovi-0').innerHTML = ukupniScore[0];
    document.getElementById('bodovi-1').innerHTML = ukupniScore[1];

    zadrzi.disabled = true;
    document.getElementById('polje-' + aktivniIgrac).classList.add('aktivan');
	
    if (aktivniIgrac === 0) {
        document.getElementById('total-1').classList.add('sakrij');
        document.getElementById('trenutno-1').innerHTML = '';
        document.getElementById('saberi-1').innerHTML = '';
        document.getElementById('polje-1').classList.remove('aktivan');
        krug++;
        document.getElementById('indikator').innerHTML = 'Krug ' + krug;

        igraj.disabled = false;
        ponovi.disabled = false;      
    }
    else {
        document.getElementById('total-0').classList.add('sakrij');
        document.getElementById('trenutno-0').innerHTML = '';
        document.getElementById('saberi-0').innerHTML = '';
        document.getElementById('polje-0').classList.remove('aktivan');
    }

    if (aktivniIgrac === 1 && modus === 1) {
        kompPotez();
    }
}

function kompPotez() {

    igraj.disabled = true;
    ponovi.disabled = true;
    document.getElementById('kocka').classList.remove('sakrij');

    var intervalId = setInterval(function(){
        currentRoll = rollDice();
        var slicica = document.createElement('img');
            slicica.setAttribute('id', 'malaKocka');
            document.getElementById("trenutno-" + aktivniIgrac).appendChild(slicica);
            slike(currentRoll, slicica);

        if (currentRoll === 1) {
            currentPoints[1] = 0;
            currentRoll = 0;
            clearInterval(intervalId);

        }
        currentPoints[1] += currentRoll;
        if ((ukupniScore[1] + currentPoints[1]) >= cilj) {
            clearInterval(intervalId);
        }
        if (currentPoints[1] >= 20) {
            clearInterval(intervalId);
        }
    }, 500);
    setTimeout(cuvamBodove, 5000);
}

// samo ime kaze

function main() {
    ukupniScore = [0,0];
    currentPoints = [0,0];
    aktivniIgrac = 0;
    tecePotez = true;
}

// restart igre

ponovi.addEventListener('click', ponovo);
function ponovo() {
    ukupniScore = [0,0];
    currentPoints = [0,0];
    aktivniIgrac = 0;
    tecePotez = true;

    document.getElementById('bodovi-0').innerHTML = 0;
    document.getElementById('bodovi-1').innerHTML = 0;
    document.getElementById('saberi-0').innerHTML = '';
    document.getElementById('saberi-1').innerHTML = '';
	document.getElementById("trenutno-0").innerHTML ='';
	document.getElementById("trenutno-1").innerHTML='';
    document.getElementById('win-0').innerHTML ='';
    document.getElementById('win-1').innerHTML ='';
    igraj.disabled = false;
	document.getElementById('kocka').classList.add('sakrij');
    ponovi.disabled = true;
    console.log('Zapocinje nova igra');

    //brise sve child nodove containera

    var roditelj0 = document.getElementById('container-0');
    var roditelj1 = document.getElementById('container-1');

    var brojDjece0 = roditelj0.childElementCount;
    var brojDjece1 = roditelj1.childElementCount;

    for (let i = brojDjece0; i > 0; i--){
        var dijete0 = document.getElementById('dijete-0-' + i);
        roditelj0.removeChild(dijete0);
    }

    for (let i = brojDjece1; i > 0; i--){
        var dijete1 = document.getElementById('dijete-1-' + i);
        roditelj1.removeChild(dijete1);
    }

    krug = 0;
    document.getElementById('indikator').innerHTML = 'Sretno!';
}

// ubacuje odgovarajucu sliku kocke

function slike(a, adresa) {
    var sliba = adresa;
    switch (a) {
        case 1: sliba.src = '1kocka.jpg'; break;
        case 2: sliba.src = '2kocka.jpg'; break;
        case 3: sliba.src = '3kocka.jpg'; break;
        case 4: sliba.src = '4kocka.jpg'; break;
        case 5: sliba.src = '5kocka.jpg'; break;
        case 6: sliba.src = '6kocka.jpg'; break;
    
        default: console.log('ne valja nesto sa kockom');
            break;
    }
}

function skakanjeKocke() {

                setTimeout(function() { cvrka() }, 50);
                setTimeout(function() { kec() }, 100);
                setTimeout(function() { dvica() }, 150);
                setTimeout(function() { petica() }, 200);
                setTimeout(function() { sestica() }, 250);
                setTimeout(function() { trica() }, 300);
                setTimeout(function() { praviBroj()}, 350);

            function cvrka() {
                glavnaKocka.src = "4kocka.jpg";
            }

            function kec() {
                glavnaKocka.src = "1kocka.jpg";
            }

            function dvica() {
                glavnaKocka.src = "2kocka.jpg";
            }

            function petica() {
                glavnaKocka.src = "5kocka.jpg";
            }

            function sestica() {
                glavnaKocka.src = "6kocka.jpg";
            }

            function trica() {
                glavnaKocka.src = "3kocka.jpg";
            }

            function praviBroj() {
                glavnaKocka.src = roll + "kocka.jpg";
            }
}