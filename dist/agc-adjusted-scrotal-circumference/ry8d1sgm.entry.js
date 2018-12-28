/*! Built with http://stenciljs.com */
const{h:e}=window.AgcAdjustedScrotalCircumference,t=(e,t)=>{let a=e.querySelector(`[name="${t}"]`),s=e.querySelector(`[data-validates="${t}"`);return a.checkValidity()?(a.className=a.className.replace(" invalid",""),s.style.display="none",!0):(-1===a.className.indexOf("invalid")&&(a.className+=" invalid"),s.style.display="block",!1)},a=(e,t)=>+(Math.round(new Number(`${e}e+${t}`).valueOf())+"e-"+t);class s{constructor(){this.socket="",this.tract="",this.units={length:"in"},this.mode="step",this.currentStep=0,this.cache={},this.submitted=!1,this.results={}}render(){return e("div",null,e("form",{onSubmit:e=>e.preventDefault(),ref:e=>this.form=e,"data-wizard":"agc-adjusted-scrotal-circumference","data-wizard-mode":this.mode,class:"agc-wizard"},e("slot",null),e("section",{"data-wizard-section":"1"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.age"},"Current Age"),e("input",{name:"age",type:"number",required:!0,min:"1"}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.age.required","data-validates":"age"},"Please enter a value."),e("p",{"data-i18n":"hints.age"},"⮤ Enter the current age of the bull in days.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next 🠖"))),e("section",{"data-wizard-section":"2"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.yearling-scrotal-circumference"},"Scrotal Circumference"),e("input",{name:"yearlingScrotalCircumference",type:"number",required:!0,min:"1"}),e("p",{class:"agc-wizard__validation-message","data-i18n":"validation.yearling-scrotal-circumference.required","data-validates":"yearlingScrotalCircumference"},"Please enter a value."),e("p",{"data-i18n":`hints.yearling-scrotal-circumference.${this.units.length}`},"⮤ Enter the circumference of the bull's scrotum in inches.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&[e("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"🠔 Back"),e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next 🠖")])),e("section",{"data-wizard-section":"3"},e("div",{class:"agc-wizard__field"},e("label",{"data-i18n":"fields.breed"},"Breed"),e("select",{name:"breed"},e("option",{value:"angus","data-i18n":"options.breeds.angus"},"Black Angus"),e("option",{value:"red angus","data-i18n":"options.breeds.red-angus"},"Red Angus"),e("option",{value:"brangus","data-i18n":"options.breeds.brangus"},"Brangus Angus"),e("option",{value:"charolais","data-i18n":"options.breeds.charolais"},"Charolais"),e("option",{value:"gelbvieh","data-i18n":"options.breeds.gelbvieh"},"Gelbvieh"),e("option",{value:"hereford","data-i18n":"options.breeds.hereford"},"Hereford"),e("option",{value:"polled hereford","data-i18n":"options.breeds.polled-hereford"},"Polled Hereford"),e("option",{value:"limousin","data-i18n":"options.breeds.limousin"},"Limousin"),e("option",{value:"salers","data-i18n":"options.breeds.salers"},"Salers"),e("option",{value:"simmental","data-i18n":"options.breeds.simmental"},"Simmental")),e("p",{"data-i18n":"hints.breed"},"⮤ Select the most relative breed.")),e("div",{class:"agc-wizard__actions"},"step"===this.mode&&e("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"Next 🠖"),e("button",{class:"agc-wizard__actions-next","data-i18n":"actions.finish",onClick:this.nextPrev.bind(this,"step"===this.mode?1:3)},"Calculate 🠖"))),e("section",{"data-wizard-results":!0},e("slot",{name:"results"}))))}showTab(e){"step"===this.mode&&(this.cache.sections[e].style.display="block"),this.socket&&this.agcStepChanged.emit({socket:this.socket,tract:this.tract,step:this.currentStep})}reset(){this.currentStep=0,this.submitted=!1,this.showTab(0)}validateForm(){let e=!0;return 0!==this.currentStep&&"full"!==this.mode||t(this.form,"age")||(e=!1),1!==this.currentStep&&"full"!==this.mode||t(this.form,"yearlingScrotalCircumference")||(e=!1),e}nextPrev(e,t){if(t&&t.preventDefault(),"full"===this.mode){if(!this.validateForm())return!1}else if(1==e&&!this.validateForm())return!1;if("step"===this.mode&&(this.cache.sections[this.currentStep].style.display="none"),this.currentStep=this.currentStep+e,this.currentStep>=this.cache.sections.length)return this.submitted=!0,this.showResults.call(this),!1;this.showTab.call(this,this.currentStep)}showResults(){let e=a(this.form.querySelector('[name="age"').value,0),t=a(this.form.querySelector('[name="yearlingScrotalCircumference"]').value,2),s=this.form.querySelector('[name="breed"]').value,i={angus:.0374,"red angus":.0324,brangus:.0708,charolais:.0505,gelbvieh:.0505,hereford:.0425,"polled hereford":.0305,limousin:.059,salers:.0574,simmental:.0543}[s]||0,r=a((365-1*e)*i,2),n=a(1*t+r,2),c={socket:this.socket,tract:this.tract,age:e,breed:s,yearlingScrotalCircumference:t,adjustedAgeFactor:i,adjustment:r,adjustedYearlingScrotalCircumference:n,units:this.units};this.socket&&this.agcCalculated.emit({socket:this.socket,tract:this.tract,results:Object.assign({},c)}),this.results=Object.assign({},c),this.cache.results.forEach(e=>{e.style.display="block"})}handleAction(e){"reset"===e.detail.action&&this.reset()}componentDidLoad(){var e=Array.from(this.form.querySelectorAll("[data-wizard-section]")).map(e=>e).map(e=>e),t=Array.from(this.form.querySelectorAll("[data-wizard-results]")).map(e=>e).map(e=>e);this.cache=Object.assign({},this.cache,{sections:e,results:t}),window.document.addEventListener("agcAction",this.handleAction.bind(this)),this.showTab(0)}componentDidUnload(){window.document.removeEventListener("agcAction",this.handleAction)}static get is(){return"agc-adjusted-scrotal-circumference"}static get properties(){return{cache:{state:!0},currentStep:{state:!0},mode:{type:String,attr:"mode"},results:{state:!0},socket:{type:String,attr:"socket"},submitted:{state:!0},tract:{type:String,attr:"tract"},units:{type:"Any",attr:"units"}}}static get events(){return[{name:"agcCalculated",method:"agcCalculated",bubbles:!0,cancelable:!0,composed:!0},{name:"agcStepChanged",method:"agcStepChanged",bubbles:!0,cancelable:!0,composed:!0}]}}export{s as AgcAdjustedScrotalCircumference};