import { validate, round } from '../../utils';
export class AgcAdjustedScrotalCircumference {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.units = { length: 'in' };
        this.mode = 'step';
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-adjusted-scrotal-circumference", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.age" }, "Current Age"),
                        h("input", { name: "age", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.age.required", "data-validates": "age" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.age" }, "\u2BA4 Enter the current age of the bull in days.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.yearling-scrotal-circumference" }, "Scrotal Circumference"),
                        h("input", { name: "yearlingScrotalCircumference", type: "number", required: true, min: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.yearling-scrotal-circumference.required", "data-validates": "yearlingScrotalCircumference" }, "Please enter a value."),
                        h("p", { "data-i18n": `hints.yearling-scrotal-circumference.${this.units['length']}` }, "\u2BA4 Enter the circumference of the bull's scrotum in inches.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [
                        h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")
                    ])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.breed" }, "Breed"),
                        h("select", { name: "breed" },
                            h("option", { value: "angus", "data-i18n": "options.breeds.angus" }, "Black Angus"),
                            h("option", { value: "red angus", "data-i18n": "options.breeds.red-angus" }, "Red Angus"),
                            h("option", { value: "brangus", "data-i18n": "options.breeds.brangus" }, "Brangus Angus"),
                            h("option", { value: "charolais", "data-i18n": "options.breeds.charolais" }, "Charolais"),
                            h("option", { value: "gelbvieh", "data-i18n": "options.breeds.gelbvieh" }, "Gelbvieh"),
                            h("option", { value: "hereford", "data-i18n": "options.breeds.hereford" }, "Hereford"),
                            h("option", { value: "polled hereford", "data-i18n": "options.breeds.polled-hereford" }, "Polled Hereford"),
                            h("option", { value: "limousin", "data-i18n": "options.breeds.limousin" }, "Limousin"),
                            h("option", { value: "salers", "data-i18n": "options.breeds.salers" }, "Salers"),
                            h("option", { value: "simmental", "data-i18n": "options.breeds.simmental" }, "Simmental")),
                        h("p", { "data-i18n": "hints.breed" }, "\u2BA4 Select the most relative breed.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "Next \uD83E\uDC16"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'age')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'yearlingScrotalCircumference')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        const adjustments = {
            'angus': 0.0374,
            'red angus': 0.0324,
            'brangus': 0.0708,
            'charolais': 0.0505,
            'gelbvieh': 0.0505,
            'hereford': 0.0425,
            'polled hereford': 0.0305,
            'limousin': 0.0590,
            'salers': 0.0574,
            'simmental': 0.0543
        };
        let age = round(this.form.querySelector('[name="age"').value, 0);
        let yearlingScrotalCircumference = round(this.form.querySelector('[name="yearlingScrotalCircumference"]').value, 2);
        let breed = this.form.querySelector('[name="breed"]').value;
        let adjustedAgeFactor = adjustments[breed] || 0;
        let adjustment = round((365 - age * 1) * adjustedAgeFactor, 2);
        let adjustedYearlingScrotalCircumference = round(yearlingScrotalCircumference * 1 + adjustment, 2);
        let results = {
            socket: this.socket,
            tract: this.tract,
            age,
            breed,
            yearlingScrotalCircumference,
            adjustedAgeFactor,
            adjustment,
            adjustedYearlingScrotalCircumference,
            units: this.units
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-adjusted-scrotal-circumference"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
