"use strict";(self.webpackChunkonedayseedjs=self.webpackChunkonedayseedjs||[]).push([[731],{724:(e,s,a)=>{a.d(s,{Z:()=>t});var n=a(689),r=a(87),l=a(420),o=a(135),i=a(184);const t=()=>{const e=(0,n.s0)(),s=(0,l.I0)(),a=(0,l.v9)((e=>e.loginSlice));return{loginState:a,isLogin:!!a.userId,doLogin:async e=>(await s((0,o.ft)(e))).payload,doLogout:()=>{s((0,o.kS)())},moveToPath:s=>{e({pathname:s},{replace:!0})},moveToLogin:()=>{e({pathname:"/user/login"},{replace:!0})},moveToLoginReturn:()=>(0,i.jsx)(n.Fg,{replace:!0,to:"/user/login"}),exceptionHandle:s=>{console.log("Exception.........."),console.log(s);const a=s.response.data.error,n=(0,r.createSearchParams)({error:a}).toString();return"REQUIRE_LOGIN"===a?(alert("\ub85c\uadf8\uc778\uc744 \uc9c4\ud589\ud574\uc8fc\uc138\uc694!"),void e({pathname:"/user/login",search:n})):"ERROR_ACCESSDENIED"===s.response.data.error?(alert("\ud574\ub2f9 \uba54\ub274\ub97c \uc0ac\uc6a9\ud560 \uad8c\ud55c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."),void e({pathname:"/user/login",search:n})):void 0}}}},732:(e,s,a)=>{a.d(s,{Z:()=>i});var n=a(87),r=a(184);var l=a(420),o=a(724);const i=e=>{let{children:s}=e;const{doLogout:a,moveToPath:i}=(0,o.Z)(),t=(0,l.v9)((e=>e.loginSlice));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("header",{children:[(0,r.jsx)("nav",{class:"navbar navbar-expand-lg",id:"nav",children:(0,r.jsxs)("div",{class:"container-fluid",id:"nav-form",children:[(0,r.jsx)(n.Link,{to:"/",className:"navbar-brand",id:"logo",children:"OnedaySeed"}),(0,r.jsx)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:(0,r.jsx)("span",{class:"navbar-toggler-icon"})}),(0,r.jsxs)("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent",children:[(0,r.jsxs)("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0",children:[(0,r.jsx)("li",{class:"nav-item",children:(0,r.jsx)(n.Link,{to:"/about",class:"nav-link active","aria-current":"page",children:"About Us"})}),t.id?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{class:"nav-item",children:(0,r.jsx)(n.Link,{to:"/mypage",class:"nav-link",children:"My Page"})})}):(0,r.jsx)(r.Fragment,{}),t.id?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{class:"nav-item",children:(0,r.jsx)("a",{onClick:()=>{a(),alert("\ub85c\uadf8\uc544\uc6c3\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),i("/")},className:"nav-link",children:"Logout"})})}):(0,r.jsx)(r.Fragment,{}),t.id?(0,r.jsx)(r.Fragment,{}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{class:"nav-item",children:(0,r.jsx)(n.Link,{to:"/user/login",className:"nav-link disabled","aria-disabled":"true",children:"Login"})})})]}),(0,r.jsxs)("form",{class:"d-flex",role:"search",children:[(0,r.jsx)("input",{className:"form-control me-2 ",id:"search-input",type:"search",placeholder:"Search","aria-label":"Search"}),(0,r.jsx)("button",{className:"btn btn-outline-success ",id:"search-btn",type:"submit",children:"Search"})]})]})]})}),(0,r.jsx)("hr",{})]}),(0,r.jsx)("main",{children:s}),(0,r.jsxs)("footer",{children:[(0,r.jsx)("hr",{}),(0,r.jsxs)("div",{className:"footer-body",children:[(0,r.jsxs)("span",{children:[(0,r.jsx)("b",{children:"(\uc8fc)\uc6d0\ub370\uc774\uc528\ub4dc"})," ",(0,r.jsx)("br",{}),(0,r.jsxs)("span",{className:"our-info",children:["\uc11c\uc6b8\uc2dc \uc885\ub85c\uad6c \uc778\uc0ac\ub3d9\uae38 12 15\uce35 ",(0,r.jsx)("br",{}),"\uc0ac\uc5c5\uc790\ub4f1\ub85d\ubc88\ud638 : 135-87-***** | \ud1b5\uc2e0\ud310\ub9e4\uc5c5 : \uc2e0\uace0\ubc88\ud638 \uc81c2024-\uc11c\uc6b8\uc885\ub85c-987**\ud638  ",(0,r.jsx)("br",{})]})," ",(0,r.jsx)("br",{}),(0,r.jsx)("span",{className:"not-host",children:"(\uc8fc)\uc6d0\ub370\uc774\uc528\ub4dc\ub294 \ud1b5\uc2e0\ud310\ub9e4\uc911\uac1c\uc790\uc774\uba70, \ud1b5\uc2e0\ud310\ub9e4\uc758 \ub2f9\uc0ac\uc790\uac00 \uc544\ub2d9\ub2c8\ub2e4. \uc0c1\ud488, \uc0c1\ud488\uc815\ubcf4, \uac70\ub798\uc5d0 \uad00\ud55c \uc758\ubb34\uc640 \ucc45\uc784\uc740 \ud310\ub9e4\uc790\uc5d0\uac8c \uc788\uc2b5\ub2c8\ub2e4."})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{})]})]})]})}},731:(e,s,a)=>{a.r(s),a.d(s,{default:()=>x});var n=a(689),r=a(87),l=a(732),o=(a(979),a(791)),i=a(420),t=(a(135),a(855)),c=a(724),d=a(184);const h={},x=()=>{const[e,s]=(0,o.useState)({...h}),{doLogin:a,moveToPath:x}=(0,c.Z)(),j=((0,i.I0)(),(0,n.s0)(),a=>{e[a.target.name]=a.target.value,s({...e})});return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(l.Z,{children:(0,d.jsxs)("div",{className:"loginBox",children:[(0,d.jsx)("h1",{children:"\ub85c\uadf8\uc778"}),(0,d.jsxs)(t.Z,{children:[(0,d.jsx)("span",{className:"formName",children:"\uc544\uc774\ub514"}),(0,d.jsx)("input",{className:"formInfo",type:"text",id:"id_val",placeholder:"\uc544\uc774\ub514\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694",value:e.userId,onChange:j}),(0,d.jsx)("span",{className:"formName",children:"\ube44\ubc00\ubc88\ud638"}),(0,d.jsx)("input",{className:"formInfo",type:"password",id:"password_val",placeholder:"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694",value:e.userPassword,onChange:j}),(0,d.jsx)("div",{className:"loginBtn",children:(0,d.jsx)("button",{className:"s_bt",type:"submit",children:"\ub85c\uadf8\uc778"})})]}),(0,d.jsx)(r.Link,{to:"/host",className:"another-login",children:"\ud638\uc2a4\ud2b8\ub85c \ub85c\uadf8\uc778\ud558\uae30"}),(0,d.jsx)("span",{className:"choiceNewmember",children:"\uc544\uc9c1 \ud68c\uc6d0\uc774 \uc544\ub2c8\uc2e0\uac00\uc694?"}),(0,d.jsxs)("div",{className:"newmember",children:[(0,d.jsx)("button",{children:(0,d.jsx)(r.Link,{to:"/newHost",children:"\ud638\uc2a4\ud2b8 \ud68c\uc6d0\uac00\uc785"})}),(0,d.jsx)("button",{children:(0,d.jsx)(r.Link,{to:"/newUser",children:"\uac8c\uc2a4\ud2b8 \ud68c\uc6d0\uac00\uc785"})})]})]})})})}},979:()=>{}}]);
//# sourceMappingURL=731.a1d380c9.chunk.js.map