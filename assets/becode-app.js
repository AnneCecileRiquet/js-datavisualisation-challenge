/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name :  Anne-Cécile   
Date :  14-11-2018
Contact information : annececileriquet2@gmail.com
What does this script do ? 
...
integration of dynamic graphics ajax and dimple.js
*/

//Premier graphique en lien avec le tableau (#table1)

//création de la div qui contiendra le graph et l'insert dans le HTML:
let divGraphique1 = document.createElement("div");
let x = document.getElementById("mw-content-text"); //ligne 616 parent le plus proche du tableau
let table1 = document.getElementById("table1");
x.insertBefore(divGraphique1, table1);
divGraphique1.setAttribute("id", "divTable1");

//récupération des données et création d'un tableau:
//source des données de table1
let tbody = table1.getElementsByTagName("tbody");
let tr = tbody[0].getElementsByTagName("tr");
//tableau de données:
let donnees = [];
let fonctionTableau = () => {
    for (i = 1; i < tr.length; i++) { //i=1 ne garde pas les données du n° de pays
        let pays = [];
        let th = tr[i].getElementsByTagName("th");
        let div = th[0].getElementsByTagName("div");
        let number = div[0].innerHTML;
        pays.push(number);
        let td = tr[i].getElementsByTagName("td");
        for (y = 0; y < td.length; y++) {
            let contenu = td[y].innerHTML;
            if (contenu != ":") {
                pays.push(contenu);
            }
        }
        donnees.push(pays);
    }
}
fonctionTableau();

//conception du graphique via dimple 
let svg = dimple.newSvg("#divTable1", 800, 800);
data = [];
for (i = 0; i < donnees.length; i++) {
    for (j = 2002; j < 2013; j++) {
        let year = { "Année": j, "Infractions": donnees[i][j - 2000], "Pays": donnees[i][1] };
        if (year.Infractions != undefined) {
            data.push(year);
        }
    }
}
var myChart = new dimple.chart(svg, data);
myChart.addCategoryAxis("x", "Année");
myChart.addMeasureAxis("y", "Infractions");
myChart.addSeries("Pays", dimple.plot.bubble);
myChart.addLegend(0, 10, 1000, 250);
myChart.draw();
console.log(donnees);


//Deuxième graphique en lien avec le tableau (#table2)

//création de la div qui contiendra le graph et l'insert dans le HTML:
let divGraphique2 = document.createElement("div");
let z = document.getElementById("mw-content-text"); //ligne 616 parent le plus proche du tableau
let table2 = document.getElementById("table2");
z.insertBefore(divGraphique2, table2);
divGraphique2.setAttribute("id", "divTable2");

//récupération des données et création d'un tableau:
//source des données de table2
let tbody2 = table2.getElementsByTagName("tbody");
let tr2 = tbody2[0].getElementsByTagName("tr");
//tableau de données:
let donnee = [];
let fonctionTableau2 = () => {
    for (i = 1; i < tr2.length; i++) { //i=1 ne garde pas les données du n° de pays
        let pays = [];
        let th2 = tr2[i].getElementsByTagName("th");
        let div2 = th2[0].getElementsByTagName("div");
        let number2 = div2[0].innerHTML;
        pays.push(number2);
        let td2 = tr2[i].getElementsByTagName("td");
        for (y = 0; y < td2.length; y++) {
            let contenu2 = td2[y].innerHTML;
            if (contenu2 != ":") {
                pays.push(contenu2);
            }
        }
        donnee.push(pays);
    }
}
fonctionTableau2();
console.log(donnee);

//conception du graphique via dimple 
let svg2 = dimple.newSvg("#divTable2", 800, 800);
let data2 = [];
for (i = 0; i < donnee.length; i++) {
    for (let y = 2; y < 4; y++) {
        let year2 = { "Année": y, "Homicides": donnee[i][y], "Pays": donnee[i][1] };
        if (year2.Année == 2) {
            year2.Année = "2007-09";
        } else if (year2.Année == 3) {
            year2.Année = "2010-12";
        }
        data2.push(year2);
    }
}


var myChart2 = new dimple.chart(svg2, data2);
myChart2.addCategoryAxis("x", "Année");
myChart2.addMeasureAxis("y", "Homicides");
myChart2.addSeries("Pays", dimple.plot.line);
myChart2.addLegend(700, 100, 200, 800);
myChart2.draw();



//Troisième graphique Ajax en lien avec le tableau (h1)
//création de la div qui contiendra le graph et l'insert dans le HTML:
let divGraphique3 = document.createElement("div");
let ajax = document.getElementById("firstHeading"); //parent ligne 571
divGraphique3.id = "divTable3";
ajax.appendChild(divGraphique3);
//création du tableau:
let object = [];
let data3 = [];
let svg3 = dimple.newSvg("#divTable3", 800, 500);
var myChart3 = new dimple.chart(svg3, data3);
myChart3.addCategoryAxis("x", "chiffres");
myChart3.addMeasureAxis("y", "criminalité");
myChart3.addSeries("données", dimple.plot.line);

let call = () =>{
	//Create the XHR Object
	let xhr = new XMLHttpRequest;
	//Call the open function, GET-type of request, url, true-asynchronous
	//source des données d'ajax
	xhr.open('GET', 'https://inside.becode.org/api/v1/data/random.json', true);

	//call the onload 
	xhr.onload = function () {
    //check if the status is 200(means everything is okay)
		if (this.status === 200) {
			//return server response as an object with JSON.parse
			console.log(JSON.parse(this.responseText));
			let object = (JSON.parse(this.responseText));
			for (let i = 0; i < object.length; i++) {

				let tab = { "criminalité": object[i][0], "chiffres": object[i][1] };

				data3.push(tab);
				
			}
			myChart3.draw();
			setInterval(call, 1000);
		}
	}
	//call send
	xhr.send();
}
call();

    


