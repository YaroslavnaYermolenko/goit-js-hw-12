import{a as L,S as v,i as w}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const S="46773750-2567d69edc75d4703fc28c418",q="https://pixabay.com/api/";async function p(a,t=1,s=15){const o=new URLSearchParams({key:S,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s});return L.get(`${q}?${o}`).then(e=>e.data).catch(e=>{console.log(e.message)})}const m=document.querySelector(".list"),$=new v(".list .list-item a",{captionsData:"alt",captionDelay:250});function f(a){const t=a.map(({largeImageURL:s,webformatURL:o,tags:e,likes:r,views:n,comments:g,downloads:b})=>`<li class="list-item"><a href="${s}">
            <div class="image-box">
              <img src="${o}" alt="${e}" width="360"></div>
              <ul class="description">
                <li><p>Likes:</p><span>${r}</span></li>
                <li><p>Views:</p><span>${n}</span></li>
                <li><p>Comments:</p><span>${g}</span></li>
                <li><p>Downloads:</p><span>${b}</span></li>
              </ul>
              
            </a></li>`).join("");m.insertAdjacentHTML("beforeend",t),$.refresh()}function u(){m.innerHTML=""}const x=document.querySelector(".list"),h=document.querySelector(".searching-form"),l=document.querySelector(".loader"),i=document.querySelector(".load-more");h.addEventListener("submit",O);i.addEventListener("click",E);let c=1,y=15;async function E(a){i.disabled=!0,c+=1,l.style.display="block";const t=h.elements.search.value.trim();try{const s=await p(t,c);l.style.display="none",f(s.hits),c>=s.totalHits/y&&(i.classList.add("visually-hidden"),d("the end"));const o=x.lastElementChild.getBoundingClientRect();window.scrollBy({top:o.height*2,behavior:"smooth"})}catch{d("Ooops...")}finally{i.disabled=!1}}async function O(a){a.preventDefault(),u(),c=1,l.style.display="block";const t=a.target.elements.search.value.trim();if(!t){l.style.display="none",d("error");return}const s=await p(t);l.style.display="none",parseInt(s.totalHits)?(f(s.hits),i.classList.remove("visually-hidden"),Math.ceil(s.totalHits/y)===1&&i.classList.add("visually-hidden")):(i.classList.add("visually-hidden"),u(),d("sorry"))}function d(a){let t="";switch(a){case"error":t="Request cannot be empty, please, enter text";break;case"sorry":t="Sorry, there are no images matching your search query. Please try again!";break;case"the end":t="We're sorry, but you've reached the end of search results.";break;default:t=a;break}w.error({title:a==="error"?"Error":"",message:t,position:"topRight",maxWidth:"400px",color:"#EF4040",theme:"dark"})}
//# sourceMappingURL=index.js.map
