console.clear();const sliderProps={fill:"#fe6f10",backgroud:"rgba(255, 255, 255, 0.214)"},slider=document.querySelector(".range__slider"),sliderValue=document.querySelector(".length__title");function applyFill(e){const t=100*(e.value-e.min)/(e.max-e.min),n=`linear-gradient(90deg, ${sliderProps.fill} ${t}%, ${sliderProps.backgroud} ${t+.1}%)`;e.style.backgroud=n,sliderValue.setAttribute("data-length",e.value)}slider.querySelector("input").addEventListener("input",e=>{sliderValue.setAttribute("data-length",e.target.value),applyFill(e.target)}),applyFill(slider.querySelector("input"));const randomFunc={lower:getRandomLower,upper:getRandomUpper,number:getRandomNumber,symbol:getRandomSymbol};function secureMathRandom(){return window.crypto.getRandomValues(new Uint32Array(1))[0]/(Math.pow(2,32)-1)}function getRandomLower(){return String.fromCharCode(Math.floor(26*Math.random())+97)}function getRandomUpper(){return String.fromCharCode(Math.floor(26*Math.random())+65)}function getRandomNumber(){return String.fromCharCode(Math.floor(10*secureMathRandom())+48)}function getRandomSymbol(){return'!@#$%^&*()_+":?><;.,'[Math.floor(Math.random()*'!@#$%^&*()_+":?><;.,'.length)]}const resultE1=document.getElementById("result"),lengthE1=document.getElementById("slider"),uppercaseE1=document.getElementById("uppercase"),lowercaseE1=document.getElementById("lowercase"),numberE1=document.getElementById("number"),symbolE1=document.getElementById("symbol"),generateBtn=document.getElementById("generate"),copyBtn=document.getElementById("copy-btn"),resultContainer=document.getElementById("result"),copyInfo=document.querySelector(".result__info.rigth"),copiedInfo=document.querySelector(".result__info.left");let generatedPassword=!1,resultContainerBound={left:resultContainer.getBoundingClientRect().left,top:resultContainer.getBoundingClientRect().top};function generatePassword(e,t,n,o,r){let l="";const a=t+n+o+r,s=[{lower:t},{upper:n},{number:o},{symbol:r}].filter(e=>Object.values(e)[0]);if(0===a)return"";for(let t=0;t<e;t++)s.forEach(e=>{const t=Object.keys(e)[0];l+=randomFunc[t]()});return l.slice(0,e).split("").sort(()=>Math.random()-.5).join("")}function disableOnlyCheckBox(){let e=[uppercaseE1,lowercaseE1,numberE1,symbolE1].filter(e=>e.checked);e.forEach(t=>{1==e.length?t.disabled=!0:t.disabled=!1})}resultContainer.addEventListener("mousemove",e=>{resultContainerBound={left:resultContainer.getBoundingClientRect().left,top:resultContainer.getBoundingClientRect().top},generatedPassword?(copyBtn.style.opacity="1",copyBtn.style.pointerEvents="all",copyBtn.style.setProperty("--x",e.x-resultContainerBound.left+"px"),copyBtn.style.setProperty("--y",e.y-resultContainerBound.top+"px")):(copyBtn.style.opacity="0",copyBtn.style.pointerEvents="none")}),window.addEventListener("resize",e=>{resultContainerBound={left:resultContainer.getBoundingClientRect().left,top:resultContainer.getBoundingClientRect().top}}),copyBtn.addEventListener("click",()=>{const e=document.createElement("textarea"),t=resultE1.innerText;t&&"CLICK GENERATE"!=t&&(e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove(),copyInfo.style.transform="translateY(200%)",copyInfo.style.opacity="0",copiedInfo.style.transform="translateY(0%)",copiedInfo.style.opacity="0.75")}),generateBtn.addEventListener("click",()=>{const e=+lengthE1.value,t=lowercaseE1.checked,n=uppercaseE1.checked,o=numberE1.checked,r=symbolE1.checked;generatedPassword=!0,resultE1.innerText=generatePassword(e,t,n,o,r),copyInfo.style.transform="translateY(0%)",copyInfo.style.opacity="0.75",copiedInfo.style.transform="translateY(200%)",copiedInfo.style.opacity="0"}),[uppercaseE1,lowercaseE1,numberE1,symbolE1].forEach(e=>{e.addEventListener("click",()=>{disableOnlyCheckBox()})});
//# sourceMappingURL=app.js.map
