(this.webpackJsonpesports=this.webpackJsonpesports||[]).push([[0],{38:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(16),s=n.n(a),o=n(10),u=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))},i=(n(38),n(2));var j=function(){return Object(i.jsx)("div",{className:"App",children:Object(i.jsxs)("header",{children:[Object(i.jsx)(o.b,{to:"/",children:"Home"}),"\xa0\xa0\xa0\xa0\xa0\xa0",Object(i.jsx)(o.b,{to:"/p1",children:"P1"}),"\xa0\xa0\xa0\xa0\xa0\xa0",Object(i.jsx)(o.b,{to:"/p2",children:"P2"}),"\xa0\xa0\xa0\xa0\xa0\xa0",Object(i.jsx)(o.b,{to:"/p3",children:"P3"})]})})},p=n(4),b=n(3),h=n.n(b),d=n(8),f=n(1),l=n(11),O=n(33),x=n.n(O).a.create({baseURL:"http://ec2-13-125-224-246.ap-northeast-2.compute.amazonaws.com",timeout:1e4});x.interceptors.request.use((function(e){return console.info(e.method,e.url,e.data),e}),(function(e){return Promise.reject(e)})),x.interceptors.response.use((function(e){return console.info(JSON.parse(e.data)),e}),(function(e){return Promise.reject(e)}));var v=function(){var e=Object(d.a)(h.a.mark((function e(t,n){var r,c=arguments;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c.length>2&&void 0!==c[2]?c[2]:"",e.next=3,x[t](r,n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=v,g=function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("post",{method:"LGA_1_1",param:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=Object(l.b)({key:"videoState",default:{src:null,type:""}}),y=Object(l.b)({key:"base64State",default:""}),k=function(){var e=Object(l.c)(w),t=Object(f.a)(e,2),n=t[0],c=t[1],a=Object(l.c)(y),s=Object(f.a)(a,2),o=s[0],u=s[1],j=Object(r.useRef)(),p=Object(r.useRef)();Object(r.useEffect)((function(){return j.current=setInterval((function(){var e=p.current,t=document.createElement("canvas");t.width=2*e.width,t.height=2*e.height,t.getContext("2d").drawImage(e,0,0,t.width,t.height);var n=t.toDataURL();u(n),console.log(e.currentTime)}),5e3),function(){clearInterval(j.current)}}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("video",{ref:p,autoPlay:!0,controls:!0,height:"450",width:"800",src:n.src,type:n.type}),Object(i.jsx)("input",{type:"file",onChange:function(e){var t=e.target.files[0];if(t){var n=URL.createObjectURL(t);c({src:n,type:t.type});var r=function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={source:"C:\\users\\downloads\\",model:"Random Forest",options:{opA:!0,opB:!1,opC:!0}},e.next=4,g(t);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();r()}}}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:o,height:"450",width:"800",alt:""})})]})},P=function(){return Object(i.jsx)("div",{})},C=function(){return Object(i.jsx)("div",{})};function L(){return Object(i.jsxs)(p.c,{children:[Object(i.jsx)(p.a,{exact:!0,path:"/p1",component:k}),Object(i.jsx)(p.a,{exact:!0,path:"/p2",component:P}),Object(i.jsx)(p.a,{exact:!0,path:"/p3",component:C})]})}n(67);s.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(o.a,{basename:"esports",children:Object(i.jsxs)(l.a,{children:[Object(i.jsx)(j,{}),Object(i.jsx)(L,{})]})})}),document.getElementById("root")),u()}},[[68,1,2]]]);
//# sourceMappingURL=main.6d2c062b.chunk.js.map