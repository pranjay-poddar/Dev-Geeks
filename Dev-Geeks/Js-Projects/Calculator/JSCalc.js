let app = new Vue({
    el: '#app',
    data() {
        return {
            current: '',
            changeMode: true
        };

    },
    methods: {
        press: function(event) {
            let me1 = this;
            let key = event.target.textContent;
            if (
                key != '=' && key != 'C' && key != '*' && key != '/' && key != '√' && key != "x²" && key != "%" && key != "DEL" && key != "±" && key != "sin" && key != "cos" && key != "tan" && key != "log" && key != "ln" && key != "x^" && key != "x!" && key != "π" && key != "e" && key != "rad" && key != "∘") {
                me1.current += key;

            } else if (key === '=') {
                if (me1.current.indexOf('^') > -1) {
                    let base = me1.current.slice(0, me1.current.indexOf('^'));
                    let exp = me1.current.slice(me1.current.indexOf('^') + 1);
                    me1.current = eval('Math.pow(' + base + ',' + exp + ')');
                } else {
                    me1.current = eval(me1.current);
                }
            } else if (key === 'C') {
                me1.current = '';
            } else if (key === '*') {
                me1.current += '*';
            } else if (key === '/') {
                me1.current += '/';
            } else if (key === '+') {
                me1.current += '+';
            } else if (key === '-') {
                me1.current += '-';
            } else if (key === '±') {
                if (me1.current[0] === '-') {
                    me1.current = me1.current.slice(1);
                } else {
                    me1.current = '-' + me1.current;
                }
            } else if (key === 'DEL') {
                me1.current = me1.current.substring(0, me1.current.length - 1);
            } else if (key === '%') {
                me1.current = me1.current / 100;
            } else if (key === 'π') {
                me1.current = me1.current * Math.PI;
            } else if (key === 'x²') {
                me1.current = eval(me1.current * me1.current);
            } else if (key === '√') {
                me1.current = Math.sqrt(me1.current);
            } else if (key === 'sin') {
                me1.current = Math.sin(me1.current);
            } else if (key === 'cos') {
                me1.current = Math.cos(me1.current);
            } else if (key === 'tan') {
                me1.current = Math.tan(me1.current);
            } else if (key === 'log') { //log to the base 10
                me1.current = Math.log10(me1.current);
            } else if (key === 'ln') { //log to the base e
                me1.current = Math.log(me1.current);
            } else if (key === 'x^') { //power
                me1.current += '^';
            } else if (key === 'x!') { //factorial
                let num = 1;
                if (me1.current === 0) {
                    me1.current = '1';
                } else if (me1.current < 0) {
                    me1.current = NaN;
                } else {
                    let num = 1;
                    for (let i = me1.current; i > 0; i--) {
                        num *= i;
                    }
                    me1.current = num;
                }
            } else if (key === 'e') {
                me1.current = Math.exp(me1.current);
            } else if (key === 'rad') { //radian
                me1.current = me1.current * (Math.PI / 180);
            }
        },
        changeModeEvent: function() {
            let me1 = this;
            me1.changeMode = !me1.changeMode;
        }
    }
});