window.onload = () => {

    getOptions();

    initApp();

};

function initApp() {

    let select = document.getElementById('select');
    let addBtn = document.getElementById('add');
    let countBtn = document.getElementById('count');

    addBtn.addEventListener('click', (event) => {
    
        event.preventDefault();

        addListItem(select);

    });

    countBtn.addEventListener('click', (event) => {
    
        event.preventDefault();

        getCount();

    });

}

function getOptions() {

    let select = document.getElementById('select');
    let options = '';
    let points = getPoints();

    for (let point of points) {

        options += `
            <option data-key="${point[0]}" value="${point[1]}">${point[0]}</option>
        `;

    }

    select.innerHTML += options;

}

function addListItem(select) {

    if (select.value == '') return;

    let list = document.getElementById('list');
    
    list.classList.remove('hide');
    list.innerHTML += `
        <li data-value="${select.value}" class="list-item">
        ${select.selectedOptions[0].innerHTML}</li>
    `;

    select.selectedOptions[0].classList.add('selected');
    select.value = '';

    countPoints();

}

function getCount() {

    let total = countPoints();

    getResult(total);

}

function countPoints() {

    let selectedItems = Array.from(document.querySelectorAll('.list-item'));

    let total = 0;

    for (let item of selectedItems) {

        total += parseInt(item.dataset.value);

    }

    updateCounter(total);

    if (document.getElementById('result').innerHTML != '') getResult(total);

    return total;

}

function updateCounter(total) {

    let counter = document.getElementById('counter');
    
    counter.innerHTML = `<p>${total} bodů</p>`;

}

function getResult(total) {

    let evaluation = '';

    switch (true) {
        
        case (total < 150):

            evaluation = `
                <p class="green">
                    Gratulujeme, vaše stresová zátěž je normální.
                </p>
            `;

            break;
        
        case (total < 200):

            evaluation = `
                <p class="blue">
                    Každý třetí s touto hodnotou má problémy se zdravím.
                    Můžete tomu předejít, pokud si osvojíte
                    <a href="http://aplikace.svobodaweb.cz/app/relax_breathe" target="_blank"class="bold">uvolňovací cviky</a>
                </p>
            `;

            break;
        
        case (total < 300):

            evaluation = `
                <p class="orange">
                    U vás se riziko, že v nejbližší době onemocníte pohybuje
                    kolem 50%. Měli byste stresu uniknout pomocí
                    <a href="http://aplikace.svobodaweb.cz/app/relax_breathe" target="_blank"class="bold">uvolňovacího cvičení</a>
                </p>`;

            break;
        
        case (total >= 300):

            evaluation = `
                <p class="red">
                    Pozor! Asi 80% těch, jejichž hladina stresu překračuje hodnotu
                    300 rychle onemocní. Co nejdříve začněte s 
                    <a href="http://aplikace.svobodaweb.cz/app/relax_breathe" target="_blank"class="bold">uvolňovacím cvičením</a>
                    a pracujte na omezení stresu ve vašem každodenním životě.
                </p>`;

            break;

        default:

            alert('Chyba');

    }

    document.getElementById('result').innerHTML = evaluation;

}

function getPoints() {

    return [
        ['smrt partnera', 100],
        ['rozvod', 73],
        ['smrt rodinného příslušníka', 63],
        ['vězení', 63],
        ['zranění / nemoc', 53],
        ['svatba', 50],
        ['výpověď', 47],
        ['usmíření s partnerem', 45],
        ['odchod do důchodu', 45],
        ['onemocnění člena rodiny', 44],
        ['těhotenství', 40],
        ['šikana na pracovišti', 39],
        ['sexuální problémy', 39],
        ['nové zaměstnání', 38],
        ['zlepšení / zhoršení pozice v zaměstnání', 36],
        ['manželská hádka', 36],
        ['odstěhování dítěte', 29],
        ['hádka s partnerovými rodiči', 29],
        ['vyjímečný úspěch', 28],
        ['zakončení / začátek školy', 26],
        ['změna zvyklostí', 24],
        ['změna bydliště', 20],
        ['změna pracovních podmínek', 20],
        ['změna školy', 20],
        ['velká půjčka', 17],
        ['změna spánkového režimu', 15],
        ['změna stravovacího režimu', 15],
        ['dovolená', 15],
        ['vánoce', 12],
        ['problémy se zákonem / úřady', 11],
    ];

}