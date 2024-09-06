let dis = document.getElementById('display');
let a = '';
let b = '';
let oper = '';
let res = '';
let oka = false;
let okb = false;

function decimal() {
    if(oper === '') {
        if(oka === true) {
            return;
        }
        oka = true;
        a = a + '.';
        dis.value = a;
    }
    else {
        if(okb === true) {
            return;
        }
        okb = true;
        b = b + '.';
        dis.value = b;
    }
}

function appendNum(num) {
    if(oper === '') {
        a = a + num;
        dis.value = a;
    }
    else {
        b = b + num;
        dis.value = b;
    }
}

function setOp(op) {
    calculate();
    if(a !== '') {
        oper = op;
    }
}

function calculate() {
    if(a === '' || b === '') return;
    if(oper === '+')
        res = parseFloat(a) + parseFloat(b);
    if(oper === '-')
        res = parseFloat(a) - parseFloat(b);
    if(oper === '*')
        res = parseFloat(a) * parseFloat(b);
    if(oper === ':')
        res = parseFloat(a) / parseFloat(b);
    res = res.toFixed(2);
    dis.value = res;
    a = res;
    b = '';
    oper = '';
}

function clearDis() {
    oka = false;
    okb = false;
    a = '';
    b = '';
    oper = '';
    dis.value = '';
}