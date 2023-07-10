// Periodic Table object
const ptable = {};

// Colors for different category elements
const colors = {
    'noble gas': '#2ecc71',
    'lanthanide': '#9b59b6',
    'transition metal': '#95a5a6',
    'alkali metal': '#e74c3c',
    'alkaline earth metal': '#e67e22',
    'diatomic nonmetal': '#3498db',
    'polyatomic nonmetal': '#3498db',
    'metalloid': '#f1c40f',
    'actinide': '#ff7979',
    'post-transition metal': '#1abc9c'
};

// Global variable
let app;

// Formating the mass of the element
Vue.filter('massFormat', (value) => {
    if (typeof value !== "number") return value;
    return numeral(value).format('0.000');
});

// Capitalize the first letter of the name of the element
Vue.filter('capitalize', (value) => {
    if (typeof value !== "string") return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
});

// Updating elements
Vue.component('pt-element', {
    template: '#element-template',
    props: {
        number: Number
    },
    data: () => ({
        symbol: 'El',
        name: 'Element',
        mass: 0.0,
        xpos: 1,
        ypos: 1,
        color: '#3498db',
        category: '',
    }),
    created() {
        this.update(this.$props.number);
    },
    watch: {
        number(newVal) {
            this.update(newVal);
        }
    },
    methods: {
        update(elementNumber) {
            let element = ptable.elements[elementNumber - 1];
            this.symbol = element.symbol;
            this.name = element.name;
            this.mass = element.atomic_mass;
            this.xpos = element.xpos;
            this.ypos = element.ypos;
            this.color = colors[element.category] || '#34495e';
            this.category = element.category;
        },
        emitMouseover() {
            this.$emit('mouseover', {
                number: this.$props.number,
                ...this.$data
            });
        }
    }
});

// Fetching data from the json file
fetch('https://rawgit.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
    .then(res => res.json())
    .then(json => {
        // Storing this data to the ptable variable
        Object.assign(ptable, json)

        // Finally, updating different elements of the periodic table
        app = new Vue({
            el: '#app',
            data() {
                return {
                    message: 'Hello world!',
                    elements: ptable.elements,
                    selected: {
                        color: "#ffffff",
                        mass: 0.0,
                        name: "Element",
                        number: 0,
                        symbol: "El",
                        xpos: 0,
                        ypos: 0,
                        category: 'category'
                    }
                }
            },
            methods: {
                updateDetails(data) {
                    this.selected = data;
                }
            }
        });
    });

