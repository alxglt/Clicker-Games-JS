var Golds = 0
var gps = 0
var myclick = 1
var totalOwned = 0


function addGold(x)
{
    Golds = Golds + x
}

function displayGolds()
{
    document.getElementById("gold").innerHTML = `Golds  : ${Golds}`;
    t = setTimeout(function() { displayGolds() } ,200);
}

function gold_per_second()
{
    Golds = Golds + gps;
    t = setTimeout(function() { gold_per_second() } ,1001);
}

var minions = [
    { id: 1, name: "Raw material", cost: 10, gps: 1 , owned: 0 },
    { id: 2, name: "Needlewoman", cost: 100, gps: 15, owned: 0 },
    { id: 3, name: "Factory", cost: 1000, gps: 175, owned: 0 },
    { id: 4, name: "Wheat fields", cost: 10000, gps: 2000, owned: 0 },
    { id: 5, name: "Relocated the factory", cost: 100000, gps: 25000, owned: 0 }
];


function getGPS()
{
    gps = 0 
    minions.forEach(function(minion) {
        gps = gps + (minion.gps * minion.owned)     
        })
        t = setTimeout(function() { getGPS() } ,1000);
}


function displayGPS()
{
    document.getElementById("gps").innerHTML = `Gold per second : ${gps}`;
    
    t = setTimeout(function() { displayGPS() } ,1001);
}


function showOwned_Cost()
{
    
   for ( var loop = 1; loop != 6; loop++) {
        var filter = [minions.find(minion => minion.id === loop)]

        for (var {owned: owned} of filter) {
            document.getElementById('owned'+loop).innerHTML = `Owned : ${owned}`
        }
    }

    for ( var loop = 1; loop != 6; loop++) {
        var filter = [minions.find(minion => minion.id === loop)]

        for (var {cost: cost} of filter) {
            document.getElementById('cost'+loop).innerHTML = `Cost : ${cost}`
        }
    }

    for ( var loop = 1; loop != 6; loop++) {
        var filter = [minions.find(minion => minion.id === loop)]

        for (var {gps: gps} of filter) {
            document.getElementById('gps'+loop).innerHTML = `Golds per second : ${gps}`
        }
    }

    t = setTimeout(function() { showOwned_Cost() } ,200);
}

function displayShop()
{
    var loop = 0
    minions.forEach(function(minion) {
        
        loop = loop + 1
        
        let ul = document.createElement('div')
        ul.setAttribute('id','Loop'+loop)
        let li = document.createElement('p')
        li.textContent = `Name : ${minion.name}`  
        document.getElementById('shop').appendChild(ul)
        ul.appendChild(li)

        let li1 = document.createElement('p')
        li1.setAttribute('id','cost'+loop )
        ul.appendChild(li1)

        let li3 = document.createElement('p')
        li3.setAttribute('id','owned'+loop )
        ul.appendChild(li3)

        let li2 = document.createElement('p')
        li2.setAttribute('id','gps'+loop )
        ul.appendChild(li2)

        let button = document.createElement('button')
        button.setAttribute('class','button')
        button.textContent = `Buy me`
        button.onclick = function() { buyMinion(minion.id) };
        ul.appendChild(button)
        
    })  
         

}



function calculate()
{
    var x = totalOwned / 50
    
    if (Number.isInteger(x) == true) {
        
    myclick = Math.pow(2,x)
    
}
t = setTimeout(function() { calculate() } ,1);
}

function buyMinion(id)
{
    
    var filter = [minions.find(minion => minion.id === id)]

    for (var {cost: cost, owned: owned, name: name, gps: gps } of filter) {
      }
    if (cost > Golds) {
    alert('Not enough gold to buy this item')
    } else {
        Golds = parseFloat((Golds - cost).toFixed(1))
        cost = parseFloat((cost * 1.15).toFixed(1))
        owned = owned + 1
        totalOwned = totalOwned + 1
        if ( owned == 25 || owned == 50 || owned == 100 || owned == 250 ||owned == 1000){
            gps = gps * 2
        }
        minions[id-1]=  { id: id, name: name, cost: cost, gps: gps , owned: owned }
    }
    
}

function save() {

    localStorage.setItem('gold', Golds)
    localStorage.setItem('totalowned', totalOwned)
    localStorage.setItem('myclick', myclick)
    localStorage.setItem('minionarray', JSON.stringify(minions))
    t = setTimeout(function() { save() } ,100);
}

function getSave()
{
    if (localStorage.getItem('minionarray')) {
        minions = JSON.parse(localStorage.getItem('minionarray'))
      }

    if (localStorage.getItem('totalowned')) {
        totalOwned = parseInt(localStorage.getItem('totalowned'))
      }

    if (localStorage.getItem('gold')) {
        Golds = parseInt(localStorage.getItem('gold'))
      }

    if (localStorage.getItem('myclick')) {
        myclick = parseInt(localStorage.getItem('myclick'))
      }  
}


function theclear()
{
    localStorage.clear()
    location.reload(); 
}
