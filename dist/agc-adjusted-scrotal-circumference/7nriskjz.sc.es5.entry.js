/*! Built with http://stenciljs.com */
AgcAdjustedScrotalCircumference.loadBundle("7nriskjz",["exports"],function(e){var t=window.AgcAdjustedScrotalCircumference.h,s=function(){function e(){this.socket="",this.ready=!1}return e.prototype.render=function(){var e=this;return t("section",{"data-wizard-results":!0,ref:function(t){return e.section=t}},t("div",{style:{display:this.ready?"none":"block"}},t("slot",{name:"empty"})),t("div",{style:{display:this.ready?"block":"none"}},this.data&&t("ul",{class:"agc-results"},t("li",null,t("h2",{"data-i18n":"results.adjusted-yearling-scrotal-circumference"},"Adjusted Yearling Scrotal Circumference"),t("span",{class:"agc-results__value"},this.data.adjustedYearlingScrotalCircumference),t("sub",null,this.data.units.length)),t("li",null,t("h2",{"data-i18n":"results.adjustment"},"Adjustment"),t("span",{class:"agc-results__value"},this.data.adjustment),t("sub",null,this.data.units.length)))))},e.prototype.handleResults=function(e){e.detail.socket===this.socket&&(this.data=Object.assign({},e.detail.results),this.ready=!0)},e.prototype.componentDidLoad=function(){this.socket&&window.document.addEventListener("agcCalculated",this.handleResults.bind(this))},e.prototype.componentDidUnload=function(){window.document.removeEventListener("agcCalculated",this.handleResults)},Object.defineProperty(e,"is",{get:function(){return"agc-adjusted-scrotal-circumference-results"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{data:{state:!0},ready:{state:!0},socket:{type:String,attr:"socket"}}},enumerable:!0,configurable:!0}),e}();e.AgcAdjustedScrotalCircumferenceResults=s,Object.defineProperty(e,"__esModule",{value:!0})});