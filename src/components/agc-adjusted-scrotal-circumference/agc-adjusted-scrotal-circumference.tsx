import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils'

@Component({
    tag: 'agc-adjusted-scrotal-circumference'
})
export class AgcAdjustedScrotalCircumference {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() units: any = { length: 'in' }
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-adjusted-scrotal-circumference" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.age">Current Age</label>
                            <input name="age" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.age.required" data-validates="age">Please enter a value.</p>
                            <p data-i18n="hints.age">⮤ Enter the current age of the bull in days.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.yearling-scrotal-circumference">Scrotal Circumference</label>
                            <input name="yearlingScrotalCircumference" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.yearling-scrotal-circumference.required" data-validates="yearlingScrotalCircumference">Please enter a value.</p>
                            <p data-i18n={`hints.yearling-scrotal-circumference.${this.units['length']}`}>⮤ Enter the circumference of the bull's scrotum in inches.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [
                                <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                                <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.breed">Breed</label>
                            <select name="breed">
                                <option value="angus" data-i18n="options.breeds.angus">Black Angus</option>
                                <option value="red angus" data-i18n="options.breeds.red-angus">Red Angus</option>
                                <option value="brangus" data-i18n="options.breeds.brangus">Brangus Angus</option>
                                <option value="charolais" data-i18n="options.breeds.charolais">Charolais</option>
                                <option value="gelbvieh" data-i18n="options.breeds.gelbvieh">Gelbvieh</option>
                                <option value="hereford" data-i18n="options.breeds.hereford">Hereford</option>
                                <option value="polled hereford" data-i18n="options.breeds.polled-hereford">Polled Hereford</option>
                                <option value="limousin" data-i18n="options.breeds.limousin">Limousin</option>
                                <option value="salers" data-i18n="options.breeds.salers">Salers</option>
                                <option value="simmental" data-i18n="options.breeds.simmental">Simmental</option>
                            </select>
                            <p data-i18n="hints.breed">⮤ Select the most relative breed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>Next 🠖</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
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
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
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
        }

        let age =  round((this.form.querySelector('[name="age"') as HTMLInputElement).value, 0);
        let yearlingScrotalCircumference = round((this.form.querySelector('[name="yearlingScrotalCircumference"]') as HTMLInputElement).value, 2)
        let breed = (this.form.querySelector('[name="breed"]') as HTMLSelectElement).value
        let adjustedAgeFactor = adjustments[breed] || 0
        let adjustment = round((365 - age * 1) * adjustedAgeFactor, 2);
        let adjustedYearlingScrotalCircumference = round(yearlingScrotalCircumference * 1 + adjustment, 2)

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
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        //(this.form.querySelector('[name="first"]') as HTMLInputElement)!.defaultValue = 'Yup';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}