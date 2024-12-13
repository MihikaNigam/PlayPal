import{a as l,i as w,r as g,O as _,d as x,b as F,x as o,e as A,V as S,f as M,h as E,s as T,_ as j}from"./lit-element-ChEvtA_T.js";import{n as p}from"./property-xm5xGIk0.js";const N={};function R(s,t,e){switch(s[0]){case"profile/save":U(s[1],e).then(a=>t(r=>({...r,profile:a}))).then(()=>{const{onSuccess:a}=s[1];a&&a()}).catch(a=>{const{onFailure:r}=s[1];r&&r(a)});break;case"profile/select":G(s[1],e).then(a=>t(r=>({...r,profile:a})));break;case"game/index":z(e).then(a=>t(r=>({...r,gameIndex:a})));break;case"game/select":I(s[1],e).then(a=>t(r=>({...r,game:a})));break;default:const i=s[0];throw new Error(`Unhandled message "${i}"`)}}function U(s,t){return fetch(`/api/profiles/${s.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...l.headers(t)},body:JSON.stringify(s.profile)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save profile for ${s.userid}`)}).then(e=>{if(e)return e})}function G(s,t){return fetch(`/api/profiles/${s.userid}`,{headers:l.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Gamer:",e),e})}function I(s,t){return fetch(`/api/tours/${s.gameid}`,{headers:l.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Game:",e),e})}function z(s){return fetch("/api/games",{headers:l.headers(s)}).then(t=>{if(t.status!==200)throw"Failed to load index of games";return t.json()}).then(t=>{if(t)return t})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(s){return p({...s,state:!0,attribute:!1})}const J=w`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-display);
    line-height: var(--font-line-height-display);
  }
`,H={styles:J},B=w`
* {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
`,W={styles:B};var Y=Object.defineProperty,q=(s,t,e,i)=>{for(var a=void 0,r=s.length-1,n;r>=0;r--)(n=s[r])&&(a=n(t,e,a)||a);return a&&Y(t,e,a),a};function K(s){const e=s.target.checked;A.relay(s,"dark-mode",{checked:e})}function Q(s){A.relay(s,"auth:message",["auth/signout"])}const y=class y extends g{constructor(){super(),this.userid="gamer",this._authObserver=new _(this,"playpal:auth")}render(){return o`
      <header>
      <h1>PlayPal</h1>
      <nav>
        <p><slot> Connect with fellow gamers! </slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <menu class="custom-menu">
            <li>
              <label class="dark-mode-switch" @change=${K}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout" @click=${Q}>Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.username!==this.userid&&(this.userid=t.username)})}static initializeOnce(){function t(e,i){e.classList.toggle("dark-mode",i)}document.body.addEventListener("dark-mode",e=>{var i;return t(e.currentTarget,(i=e.detail)==null?void 0:i.checked)})}};y.uses=x({"mu-dropdown":F.Element}),y.styles=[W.styles,H.styles,w`
    :host {
      display: contents;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
      padding-left: 10px;
      padding-right: 10px;
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    header p {
      --color-link: var(--color-link-inverted);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
    a[slot="actuator"] {
      color: var(--color-link-inverted);
      cursor: pointer;
    }
    #userid:empty::before {
      content: "gamer";
    }
    menu a {
      color: white;
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }

    .custom-menu {
      background-color: var(--color-background-header);
      padding: 0;
      list-style: none;
      padding: 10px;
    }
  `];let m=y;q([v()],m.prototype,"userid");var X=Object.defineProperty,Z=(s,t,e,i)=>{for(var a=void 0,r=s.length-1,n;r>=0;r--)(n=s[r])&&(a=n(t,e,a)||a);return a&&X(t,e,a),a};const k=class k extends g{constructor(){super(),this.userid="gamer",this._authObserver=new _(this,"playpal:auth"),this._user=new l.User}render(){return o`
      <div>
        <div class="image-container">
          <slot name="game-image">***Featured Slot***</slot>
        </div>
          <slot name="game-title">Default Game Title</slot>
      </div>
    `}get src(){return this.getAttribute("src")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&this.hydrate(this.src))})}hydrate(t){fetch(t,{headers:l.headers(this._user)}).then(e=>{if(!e.ok)throw new Error(`Failed to fetch: ${e.statusText}`);return e.json()}).then(e=>this.renderSlots(e)).catch(e=>console.log("Error fetching data:",e))}renderSlots(t){const e={"game-title":t.title,"game-image":o`<img
        slot="game-image"
        src="${t.imageUrl}"
        alt="${t.title}"
      />`};this.replaceChildren(),Object.keys(e).forEach(i=>{const a=e[i],r=document.createElement("span");r.setAttribute("slot",i),typeof a=="string"?r.textContent=a:a instanceof HTMLElement&&r.appendChild(a),this.appendChild(r)})}};k.styles=w`
    .image-container {
      display: flex;
      justify-content: center;
      padding: 10px;
    }
    h2 {
      text-align: center;
      color: var(--color-accent);
    }

    svg.icon {
      display: inline;
      height: 2.6em;
      width: 2em;
      vertical-align: top;
      fill: var(--color-text-inverted);
    }
  `;let b=k;Z([v()],b.prototype,"userid");var V=Object.defineProperty,ee=(s,t,e,i)=>{for(var a=void 0,r=s.length-1,n;r>=0;r--)(n=s[r])&&(a=n(t,e,a)||a);return a&&V(t,e,a),a};class L extends S{constructor(){super("playpal:model"),this.src="/api/games",this.gameIndex=new Array,this._authObserver=new _(this,"playpal:auth"),this._user=new l.User}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&(this._user=t),this.hydrate(this.src)})}hydrate(t){fetch(t,{headers:l.headers(this._user)}).then(e=>{if(e.status===200)return e.json();throw`Server responded with status ${e.status}`}).then(e=>{if(e){console.log("WE HAVE A JSON? :",e);const i=e;this.gameIndex=i}}).catch(e=>console.log("Failed to fetch games data:",e))}render(){const t=this.gameIndex.map(this.renderItem);return o`
        <main class="page">
            <h3>Trending Games Right Now 🔥</h3>
            <section class="three-grid-container">${t}</section>
        </main>
        `}renderItem(t){const{_id:e}=t;return o`
        <article class="card">
            <a href="games/${e}">
              <game-instance src="/api/games/${e}"></game-instance>
            </a>
          </article>
        `}}ee([v()],L.prototype,"gameIndex");var te=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,d=(s,t,e,i)=>{for(var a=i>1?void 0:i?ae(t,e):t,r=s.length-1,n;r>=0;r--)(n=s[r])&&(a=(i?n(t,e,a):n(a))||a);return i&&a&&te(t,e,a),a};class D extends g{render(){return o`
        <h2>Gamer Profile</h2>
      <section class="grid-container">
        <div class="flex-container">
          <div class="column">
            <div class="profile-container">
              <img slot="avatar" class="avatar-image" src="" alt="Avatar" />
            </div>
            <div>
              <p><strong>Name:</strong> <slot name="name">Johnson</slot></p>
              <p>
                <strong>Email:</strong>
                <slot name="email">Johnson@example.com</slot>
              </p>
              <p>
                <strong>Bio:</strong> <slot name="bio">Johnson is a goat</slot>
              </p>
              <p>
                <strong>Last Online:</strong>
                <slot name="name">lastOnline</slot>
              </p>
            </div>
          </div>
        </div>
        <div class="flex-container">
          <p><strong>Games Played Recently:</strong></p>
          <ul>
            <slot name="games">
              <li><a href="../game/apex.html">Apex Legends</a></li>
              <li><a href="../game/overwatch.html">Overwatch</a></li>
            </slot>
          </ul>
          <p><strong>Lobby List:</strong></p>
          <ul>
            <slot name="teams">
              <li><a href="../teams/lobby.html">Default Lobby</a></li>
            </slot>
          </ul>
        </div>
      </section>
      `}}d([p()],D.prototype,"username",2);const C=class C extends g{render(){return o`
        <section>
          <h1>Edit Profile</h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
          <mu-form .init=${this.init} @mu-form:submit=${this._handleSubmit}>
            <label>
              <span>Username</span>
              <input disabled name="userid" />
            </label>
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Your Name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="name@example.com" />
            </label>
            <label>
              <span>Bio</span>
              <input name="bio" type="text" placeholder="Short bio" />
            </label>
            <label>
              <span>Last Online</span>
              <input name="lastOnline" type="text" placeholder="e.g. Today at 5PM" />
            </label>
            <label>
              <span>Avatar</span>
              <input
                name="avatar"
                type="file"
                @change=${this._handleAvatarSelected} />
            </label>
            <slot name="avatar"></slot>
            <label>
              <span>Nickname</span>
              <input name="nickname" type="text" placeholder="Nickname" />
            </label>
            <label>
              <span>Home City</span>
              <input name="home" type="text" placeholder="Home City" />
            </label>
            <label>
              <span>Color</span>
              <input type="color" name="color" />
            </label>
          </mu-form>
        </section>
      `}_handleSubmit(t){const e=t.detail;this.dispatchEvent(new CustomEvent("profile:submit",{bubbles:!0,composed:!0,detail:e}))}async _handleAvatarSelected(t){const i=t.target.files[0];if(!i)return;const a=await new Promise((r,n)=>{const h=new FileReader;h.onload=()=>r(h.result),h.onerror=$=>n($),h.readAsDataURL(i)});this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:a}))}};C.uses=x({"mu-form":M.Element});let f=C;d([p()],f.prototype,"username",2);d([p({attribute:!1})],f.prototype,"init",2);const O=class O extends S{constructor(){super("playpal:model"),this.edit=!1,this.userid="",this.addEventListener("profile:new-avatar",t=>{this.newAvatar=t.detail})}get profile(){return this.model.profile}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),t==="user-id"&&e!==i&&i&&(console.log("Profiler Page:",i),this.dispatchMessage(["profile/select",{userid:i}]))}render(){const{avatar:t,name:e,userId:i,games:a=[],teams:r=[]}=this.profile||{},n=(e||i||"?").slice(0,1),h=a.map(u=>o` <li>${u}</li> `),$=r.map(u=>o` <li>${u}</li> `),P=o`
        <traveler-avatar
          slot="avatar"
          src=${this.newAvatar||t}
          initial=${n}></gamer-avatar>
      `;return this.edit?o`
            <profile-editor
              username=${e}
              .init=${this.profile}
              @mu-form:submit=${u=>this._handleSubmit(u)}>
              ${P}
            </profile-editor>
          `:o`
            <profile-viewer username=${e}>
              ${P}
              <span slot="name">${e}</span>
              <span slot="userid">${i}</span>
              <ul slot="games">
                ${h}
              </ul>
               <ul slot="lobbies">
                ${$}
              </ul>
            </profile-viewer>
          `}_handleSubmit(t){console.log("Handling submit of mu-form");const e=this.newAvatar?{...t.detail,avatar:this.newAvatar}:t.detail;this.dispatchMessage(["profile/save",{userid:this.userid,profile:e,onSuccess:()=>E.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:i=>console.log("ERROR:",i)}])}};O.uses=x({"profile-viewer":D,"profile-editor":f});let c=O;d([p({type:Boolean,reflect:!0})],c.prototype,"edit",2);d([p({attribute:"user-id",reflect:!0})],c.prototype,"userid",2);d([v()],c.prototype,"profile",1);d([v()],c.prototype,"newAvatar",2);class se extends g{connectedCallback(){super.connectedCallback(),m.initializeOnce()}render(){return o`<mu-switch></mu-switch>`}}const re=[{auth:"protected",path:"/app/profile/:id",view:s=>o`
      <profile-view user-id=${s.id}></profile-view>
    `},{path:"/app",view:()=>o`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];x({"mu-auth":l.Provider,"mu-history":E.Provider,"mu-store":class extends T.Provider{constructor(){super(R,N,"playpal:auth")}},"mu-switch":class extends j.Element{constructor(){super(re,"playpal:history","playpal:auth")}},"home-view":L,"profile-view":c,"pp-app":se,"pp-header":m,"game-instance":b});
