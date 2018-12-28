/*! Built with http://stenciljs.com */
import { h } from '../agc-adjusted-scrotal-circumference.core.js';

class AgcAdjustedScrotalCircumferenceResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.adjusted-yearling-scrotal-circumference" }, "Adjusted Yearling Scrotal Circumference"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.adjustment" }, "Adjustment"),
                    placeholder()))));
    }
    static get is() { return "agc-adjusted-scrotal-circumference-results-placeholder"; }
}

export { AgcAdjustedScrotalCircumferenceResultsPlaceholder };
