
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-adjusted-scrotal-circumference-results-placeholder'
})
export class AgcAdjustedScrotalCircumferenceResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.adjusted-yearling-scrotal-circumference">Adjusted Yearling Scrotal Circumference</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.adjustment">Adjustment</h2>
                        {placeholder()}
                    </li>                                       
                </ul>
            </section>
        );
    }
}