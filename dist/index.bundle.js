!function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){window.App={loading:!1,contracts:{},load:async()=>{await App.loadWeb3(),await App.loadAccount(),await App.loadContract(),await App.render()},loadWeb3:async()=>{App.web3Provider=web3.currentProvider,web3=new Web3(web3.currentProvider),console.log("use metamask")},loadAccount:async()=>{App.account=await web3.eth.getAccounts(),console.log(App.account),$("#account").html(App.account)},loadContract:async()=>{const e=await $.getJSON("TodoList.json");App.contracts.TodoList=TruffleContract(e),App.contracts.TodoList.setProvider(App.web3Provider),App.todoList=await App.contracts.TodoList.deployed()},render:async()=>{await App.renderTasks()},renderTasks:async()=>{$("#overlay").show();let e,t=await App.todoList.listLength(),o=[];for(var n=0;n<t;n++)e=await App.todoList.todoList(n),o.push(e);for(n=0;n<t;n++){let e=o[n];if(console.log(e[0],e[1],e[3]),!0===e[3])continue;let t=document.createElement("p"),a=document.createElement("div"),r=document.createElement("input");$(r).attr("name",n);let c=document.createElement("label");$(c).attr("for",n);let p=document.createElement("input"),d=document.createElement("div");d.className="wrapper",r.type="checkbox",p.type="checkbox",$(p).attr("name",n);let l=document.createElement("label");$(l).attr("for",n),$(r).prop("checked",e[1]),c.onclick=async t=>{$("#overlay").show(),await App.todoList.toggle(e[2].c[0]),$(".wrapper").remove(),App.renderTasks()},$(p).prop("checked",e[3]),l.onclick=async t=>{$("#overlay").show(),await App.todoList.deleteTodo(e[2].c[0]),$(".wrapper").remove(),App.renderTasks()},t.innerHTML=e[0],!0===e[1]?$(t).css("text-decoration","line-through"):!1===e[1]&&$(t).css("text-decoration","none"),a.innerHTML="<p>-刪除</p>",a.className="del-info",d.append(r),d.append(c),d.append(t),d.append(a),a.append(p),a.append(l),d.append(a),$("#taskList").append(d)}$("#overlay").hide()},createTask:async()=>{const e=$("#newTask").val();$("#overlay").show();const t=await App.todoList.addTodo(e);console.log(t),web3.eth.subscribe("logs",{address:"0x7f9A7058336D81920D9AD9c58895cA6E5a2d2cd3",topics:["0x7f9A7058336D81920D9AD9c58895cA6E5a2d2cd3"]},(function(e,t){e||console.log(t),window.location.reload()})).unsubscribe((function(e,t){t&&console.log("Successfully unsubscribed!"),$("#overlay").hide()}))}},$((function(){$(window).load((function(){App.load()}))}))}]);