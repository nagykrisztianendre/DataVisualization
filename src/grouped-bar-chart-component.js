class GroupedBarChartComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }


    render() {
        const container = document.createElement('div');
        container.classList.add('grouped-container');
        this.append(container);
    }
}

window.customElements.define('grouped-bar-chart-component', GroupedBarChartComponent);
