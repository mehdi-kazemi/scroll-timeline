!function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e instanceof CSSUnitValue||e instanceof CSSMathSum)return e;if(!t)return null;var n=e.trim().match(/^(-?[0-9]*\.?[0-9]*)(px|%)$/);return n?new CSSUnitValue(n[1],"%"==n[2]?"percent":n[2]):null}!function(){var e,n=new WeakMap;function r(e){for(var t,n=[],i=0;i<e.length;i++)n[i]="number"==typeof(t=e[i])?new CSSUnitValue(t,"number"):t;return n}var a=function(){function e(e,t,i,a){n.set(this,{values:r(e),operator:t,name:i||t,delimiter:a||", "})}return e.prototype.toString=function(){var e=n.get(this);return e.name+"("+e.values.join(e.delimiter)+")"},t(e,[{key:"operator",get:function(){return n.get(this).operator}},{key:"values",get:function(){return n.get(this).values}}]),e}(),o=((e={CSSUnitValue:function(){function e(e,t){n.set(this,{value:e,unit:t})}return e.prototype.toString=function(){var e=n.get(this);return""+e.value+function(e){switch(e){case"percent":return"%";case"number":return"";default:return e.toLowerCase()}}(e.unit)},t(e,[{key:"value",get:function(){return n.get(this).value},set:function(e){n.get(this).value=e}},{key:"unit",get:function(){return n.get(this).unit}}]),e}(),CSSKeywordValue:function(){function e(e){this.value=e}return e.prototype.toString=function(){return this.value.toString()},e}(),CSSMathSum:function(e){function t(t){return e.call(this,arguments,"sum","calc"," + ")||this}return i(t,e),t}(a),CSSMathProduct:function(e){function t(t){return e.call(this,arguments,"product","calc"," * ")||this}return i(t,e),t}(a),CSSMathNegate:function(e){function t(t){return e.call(this,[arguments[0]],"negate","-")||this}return i(t,e),t}(a)}).CSSMathNegate=function(e){function t(t){return e.call(this,[1,arguments[0]],"invert","calc"," / ")||this}return i(t,e),t}(a),e.CSSMathMax=function(e){function t(){return e.call(this,arguments,"max")||this}return i(t,e),t}(a),e.CSSMathMin=function(e){function t(){return e.call(this,arguments,"min")||this}return i(t,e),t}(a),e);if(!window.CSS&&!Reflect.defineProperty(window,"CSS",{value:{}}))throw Error("Error installing CSSOM support");for(var l in window.CSSUnitValue||["number","percent","em","ex","px","cm","mm","in","pt","pc","Q","vw","vh","vmin","vmax","rems","ch","deg","rad","grad","turn","ms","s","Hz","kHz","dppx","dpi","dpcm","fr"].forEach(function(e){if(!Reflect.defineProperty(CSS,e,{value:function(t){return new CSSUnitValue(t,e)}}))throw Error("Error installing CSS."+e)}),o)if(!(l in window)&&!Reflect.defineProperty(window,l,{value:o[l]}))throw Error("Error installing CSSOM support for "+l)}();var s=new CSSKeywordValue("auto"),u=new WeakMap,c=[];function m(e){return e===document.scrollingElement?document:e}function f(e){var t=u.get(e).animations;if(0!==t.length)for(var n=e.currentTime,i=0;i<t.length;i++)t[i].tickAnimation(n)}function h(e,t){var n="horizontal-tb"==getComputedStyle(e).writingMode,i=e.scrollTop;return("horizontal"==t||"inline"==t&&n||"block"==t&&!n)&&(i=Math.abs(e.scrollLeft)),i}function d(e,t){if(e instanceof CSSUnitValue){if("percent"==e.unit)return e.value*t/100;if("px"==e.unit)return e.value;throw TypeError("Unhandled unit type "+e.unit)}if(e instanceof CSSMathSum){for(var n,i=0,r=o(e.values);!(n=r()).done;)i+=d(n.value,t);return i}throw TypeError("Unsupported value type: "+typeof e)}function p(e,t,n,i,r){if(r)return r(t,n,i,0==e.value?"start":"end");"block"===n?n="vertical":"inline"===n&&(n="horizontal");var a="vertical"===n?t.scrollHeight-t.clientHeight:t.scrollWidth-t.clientWidth;return d(l(i===s?e:i),a)}function g(e,t,n,i){var r=[],a=!0;0==n.length?(r.push(p(new CSSUnitValue(0,"percent"),e,t,s)),a=!1,r.push(p(new CSSUnitValue(100,"percent"),e,t,s))):1==n.length&&(r.push(p(new CSSUnitValue(0,"percent"),e,t,s)),a=!1);for(var o=0;o<n.length;o++){var l=p(a?new CSSUnitValue(0,"percent"):new CSSUnitValue(100,"percent"),e,t,n[o],i[o]);if(null===l)return[];r.push(l),a=!1}return r}function v(e,t){for(var n=u.get(e).animations,i=0;i<n.length;i++)n[i].animation==t&&n.splice(i,1)}function T(e,t,n){for(var i=u.get(e).animations,r=0;r<i.length;r++)if(i[r].animation==t)return;i.push({animation:t,tickAnimation:n}),f(e)}var y=function(){function e(e){u.set(this,{source:null,orientation:"block",scrollOffsets:[],animations:[],scrollOffsetFns:[]}),this.source=e&&void 0!==e.source?e.source:document.scrollingElement,this.orientation=e&&e.orientation||"block",this.scrollOffsets=e&&void 0!==e.scrollOffsets?e.scrollOffsets:[]}return t(e,[{key:"source",get:function(){return u.get(this).source},set:function(e){var t=this;this.source&&m(this.source).removeEventListener("scroll",function(){return f(t)}),u.get(this).source=e,e&&m(e).addEventListener("scroll",function(){return f(t)}),f(this)}},{key:"orientation",get:function(){return u.get(this).orientation},set:function(e){if(-1===["block","inline","horizontal","vertical"].indexOf(e))throw TypeError("Invalid orientation");u.get(this).orientation=e,f(this)}},{key:"scrollOffsets",get:function(){return u.get(this).scrollOffsets},set:function(e){for(var t,n=[],i=[],r=o(e);!(t=r()).done;){var a=t.value,m=null,h=void 0;"auto"==a&&(a=s);for(var d=0;d<c.length;d++){var p=c[d].parse(a);if(void 0!==p){h=p,m=c[d].evaluate;break}}if(!m){if(a!=s){var g=l(a);if(!g||g instanceof CSSUnitValue&&"number"==g.unit)throw TypeError("Invalid scrollOffsets entry.")}h=a}n.push(h),i.push(m)}if(1==n.length&&n[0]==s)throw TypeError("Invalid scrollOffsets value.");var v=u.get(this);v.scrollOffsets=n,v.scrollOffsetFns=i,f(this)}},{key:"duration",get:function(){return CSS.percent(100)}},{key:"phase",get:function(){if(!this.source)return"inactive";var e=getComputedStyle(this.source);if("none"==e.display)return"inactive";if(this.source!=document.scrollingElement&&("visible"==e.overflow||"clip"==e.overflow))return"inactive";var t=g(this.source,this.orientation,this.scrollOffsets,u.get(this).scrollOffsetFns);if(0==t.length)return"inactive";var n=p(new CSSUnitValue(100,"percent"),this.source,this.orientation,new CSSUnitValue(100,"percent"),null),i=t[0],r=t[t.length-1],a=h(this.source,this.orientation);return a<i?"before":a>=r&&r<n?"after":"active"}},{key:"currentTime",get:function(){if(!this.source)return null;if("inactive"==this.phase)return null;var e=g(this.source,this.orientation,this.scrollOffsets,u.get(this).scrollOffsetFns),t=e[0],n=e[e.length-1],i=h(this.source,this.orientation);if(i<t)return CSS.percent(0);if(i>=n)return CSS.percent(100);var r=function(e,t){var n;for(n=t.length-2;n>=0&&!(t[n]<=e&&e<t[n+1]);n--);var i=t[n];return(n+(e-i)/(t[n+1]-i))*(1/(t.length-1))}(i,e);return CSS.percent(100*r)}},{key:"__polyfill",get:function(){return!0}}]),e}(),S=window.Element.prototype.animate,k=window.Animation,w=function(){function e(){var e=this;this.state="pending",this.nativeResolve=this.nativeReject=null,this.promise=new Promise(function(t,n){e.nativeResolve=t,e.nativeReject=n})}var t=e.prototype;return t.resolve=function(e){this.state="resolved",this.nativeResolve(e)},t.reject=function(e){this.state="rejected",this.promise.catch(function(){}),this.nativeReject(e)},e}();function b(e){e.readyPromise=new w,requestAnimationFrame(function(){null!==e.timeline.currentTime&&_(e)})}function E(){return new DOMException("The user aborted a request","AbortError")}function x(e,t){if(null===t)return t;if("number"!=typeof t)throw new DOMException("Unexpected value: "+t+".  Cannot convert to CssNumberish","InvalidStateError");var n=A(e);return CSS.percent(n?100*t/n:0)}function P(e,t){if(e.timeline){if(null===t)return t;if("percent"===t.unit){var n=A(e);return t.value*n/100}throw new DOMException("CSSNumericValue must be a percentage for progress based animations.","NotSupportedError")}if(null==t||"number"==typeof t)return t;var i=t.to("ms");if(convertTime)return i.value;throw new DOMException("CSSNumericValue must be either a number or a time value for time based animations.","InvalidStateError")}function I(e){if(e.finishedPromise&&"pending"==e.finishedPromise.state&&"finished"==e.proxy.playState){e.finishedPromise.resolve(e.proxy),e.animation.pause();var t=new CustomEvent("finish",{detail:{currentTime:e.proxy.currentTime,timelineTime:e.proxy.timeline.currentTime}});Object.defineProperty(t,"currentTime",{get:function(){return this.detail.currentTime}}),Object.defineProperty(t,"timelineTime",{get:function(){return this.detail.timelineTime}}),requestAnimationFrame(function(){queueMicrotask(function(){e.animation.dispatchEvent(t)})})}}function C(e){return null!==e.pendingPlaybackRate?e.pendingPlaybackRate:e.animation.playbackRate}function R(e){null!==e.pendingPlaybackRate&&(e.animation.playbackRate=e.pendingPlaybackRate,e.pendingPlaybackRate=null)}function M(e){if(!e.timeline)return null;var t=P(e,e.timeline.currentTime);if(null===t)return null;if(null===e.startTime)return null;var n=(t-e.startTime)*e.animation.playbackRate;return-0==n&&(n=0),n}function O(e,t){if(!e.timeline)return null;var n=P(e,e.timeline.currentTime);return null==n?null:n-t/e.animation.playbackRate}function N(e,t,n){if(e.timeline){var i=t?P(e,e.proxy.currentTime):M(e);if(i&&null!=e.startTime&&!e.proxy.pending){var r=C(e),a=A(e),o=e.previousCurrentTime;r>0&&i>=a?((null===o||o<a)&&(o=a),e.holdTime=t?i:o):r<0&&i<=0?((null==o||o>0)&&(o=0),e.holdTime=t?i:o):0!=r&&(t&&null!==e.holdTime&&(e.startTime=O(e,e.holdTime)),e.holdTime=null)}U(e),e.previousCurrentTime=P(e,e.proxy.currentTime),"finished"==e.proxy.playState?(e.finishedPromise||(e.finishedPromise=new w),"pending"==e.finishedPromise.state&&(n?I(e):Promise.resolve().then(function(){I(e)}))):(e.finishedPromise&&"resolved"==e.finishedPromise.state&&(e.finishedPromise=new w),"paused"!=e.animation.playState&&e.animation.pause())}}function A(e){var t=function(e){var t=e.proxy.effect.getTiming();return e.normalizedTiming||t}(e);return Math.max(0,t.delay+t.endDelay+t.iterations*t.duration)}function U(e){if(e.timeline)if(null!==e.startTime){var t=P(e,e.timeline.currentTime);e.animation.currentTime=(t-e.startTime)*e.animation.playbackRate}else null!==e.holdTime&&(e.animation.currentTime=e.holdTime)}function W(e,t){if(e.timeline){var n="paused"==e.proxy.playState&&e.proxy.pending,i=!1,r=null,a=P(e,e.proxy.currentTime);e.resetCurrentTimeOnResume&&(a=null,e.resetCurrentTimeOnResume=!1);var o=C(e),l=A(e);if(o>0&&t&&(null==a||a<0||a>=l))r=0;else if(o<0&&t&&(null==a||a<=0||a>l)){if(Infinity==l)return void e.animation.play();r=l}else 0==o&&null==a&&(r=0);null!=r&&(e.startTime=r,e.holdTime=null,R(e)),T(e.timeline,e.animation,F.bind(e.proxy)),e.holdTime&&(e.startTime=null),e.pendingTask&&(e.pendingTask=null,i=!0),(null!==e.holdTime||null!==r||n||null!==e.pendingPlaybackRate)&&(e.readyPromise&&!i&&(e.readyPromise=null),U(e),e.readyPromise||b(e),e.pendingTask="play",N(e,!1,!1))}}function F(e){var t=L.get(this);if(null!=e){t.pendingTask&&_(t);var n=this.playState;if("running"==n||"finished"==n){var i=P(t,e);t.animation.currentTime=(i-P(t,this.startTime))*this.playbackRate,"finished"==n&&0!=C(t)&&(t.holdTime=null),N(t,!1,!1)}}else"idle"!=t.animation.playState&&t.animation.cancel()}function _(e){"pause"==e.pendingTask?function(e){var t=P(e,e.timeline.currentTime);null!=e.startTime&&null==e.holdTime&&(e.holdTime=(t-e.startTime)*e.animation.playbackRate),R(e),e.startTime=null,e.readyPromise.resolve(e.proxy),N(e,!1,!1),U(e),e.pendingTask=null}(e):"play"==e.pendingTask&&function(e){var t=P(e,e.timeline.currentTime);if(null!=e.holdTime)R(e),0==e.animation.playbackRate?e.startTime=t:(e.startTime=t-e.holdTime/e.animation.playbackRate,e.holdTime=null);else if(null!==e.startTime&&null!==e.pendingPlaybackRate){var n=(t-e.startTime)*e.animation.playbackRate;R(e);var i=e.animation.playbackRate;0==i?(e.holdTime=null,e.startTime=t):e.startTime=t-n/i}e.readyPromise&&"pending"==e.readyPromise.state&&e.readyPromise.resolve(e.proxy),N(e,!1,!1),U(e),e.pendingTask=null}(e)}var L=new WeakMap,j=function(){function e(e,t){var n=e instanceof k?e:new k(e,r),i=t instanceof y,r=i?void 0:t;L.set(this,{animation:n,timeline:i?t:void 0,playState:i?"idle":null,readyPromise:null,finishedPromise:null,startTime:null,holdTime:null,previousCurrentTime:null,resetCurrentTimeOnResume:!1,pendingPlaybackRate:null,pendingTask:null,specifiedTiming:null,normalizedTiming:null,effect:null,proxy:this})}var n=e.prototype;return n.finish=function(){var e=L.get(this);if(e.timeline){var t=C(e),n=A(e);if(0==t)throw new DOMException("Cannot finish Animation with a playbackRate of 0.","InvalidStateError");if(t>0&&Infinity==n)throw new DOMException("Cannot finish Animation with an infinite target effect end.","InvalidStateError");R(e);var i=t<0?0:n;this.currentTime=x(e,i);var r=P(e,e.timeline.currentTime);null===e.startTime&&null!==r&&(e.startTime=r-i/e.animation.playbackRate),"pause"==e.pendingTask&&null!==e.startTime&&(e.holdTime=null,e.pendingTask=null,e.readyPromise.resolve(this)),"play"==e.pendingTask&&null!==e.startTime&&(e.pendingTask=null,e.readyPromise.resolve(this)),N(e,!0,!0)}else e.animation.finish()},n.play=function(){var e=L.get(this);e.timeline?W(e,!0):e.animation.play()},n.pause=function(){var e=L.get(this);if(e.timeline){if("paused"!=this.playState){var t=null,n=e.animation.playbackRate,i=A(e);if(null===e.animation.currentTime)if(n>=0)t=0;else{if(Infinity==i)return void e.animation.pause();t=i}null!==t&&(e.startTime=t),"play"==e.pendingTask?e.pendingTask=null:e.readyPromise=null,e.readyPromise||b(e),e.pendingTask="pause"}}else e.animation.pause()},n.reverse=function(){var e=L.get(this),t=C(e),n=e.resetCurrentTimeOnResume?null:P(e,this.currentTime),i=Infinity==A(e),r=0!=t&&(t<0||n>0||!i);if(!e.timeline||!r)return r&&(e.pendingPlaybackRate=-C(e)),void e.animation.reverse();if("inactive"==e.timeline.phase)throw new DOMException("Cannot reverse an animation with no active timeline","InvalidStateError");this.updatePlaybackRate(-t),W(e,!0)},n.updatePlaybackRate=function(e){var t=L.get(this);if(t.pendingPlaybackRate=e,t.timeline){if(!t.readyPromise||"pending"!=t.readyPromise.state)switch(this.playState){case"idle":case"paused":R(t);break;case"finished":var n=P(t,t.timeline.currentTime),i=null!==n?(n-t.startTime)*t.animation.playbackRate:null;t.startTime=0==e?n:null!=n&&null!=i?(n-i)/e:null,R(t),N(t,!1,!1),U(t);break;default:W(t,!1)}}else t.animation.updatePlaybackRate(e)},n.persist=function(){L.get(this).animation.persist()},n.cancel=function(){var e=L.get(this);e.timeline?("idle"!=this.playState&&(function(e){e.pendingTask&&(e.pendingTask=null,R(e),e.readyPromise.reject(E()),b(e),e.readyPromise.resolve(e.proxy))}(e),e.finishedPromise&&"pending"==e.finishedPromise.state&&e.finishedPromise.reject(E()),e.finishedPromise=new w,e.animation.cancel()),e.startTime=null,e.holdTime=null,v(e.timeline,e.animation)):e.animation.cancel()},n.addEventListener=function(e,t,n){L.get(this).animation.addEventListener(e,t,n)},n.removeEventListener=function(e,t,n){L.get(this).animation.removeEventListener(e,t,n)},n.dispatchEvent=function(e){L.get(this).animation.dispatchEvent(e)},t(e,[{key:"effect",get:function(){var e=L.get(this);return e.timeline?(e.effect||(e.effect=function(e){var t=e.animation.effect,n=t.updateTiming,i={apply:function(n){t.getTiming();var i=n.apply(t);if(e.timeline){i.localTime=x(e,i.localTime),i.endTime=x(e,i.endTime),i.activeDuration=x(e,i.activeDuration);var r=A(e);i.duration=r?CSS.percent(100*(i.iterations?(r-i.delay-i.endDelay)/i.iterations:0)/r):CSS.percent(0);var a=e.timeline.phase,o=i.fill;"before"==a&&"backwards"!=o&&"both"!=o&&(i.progress=null),"after"==a&&"forwards"!=o&&"both"!=o&&(i.progress=null),void 0===e.timeline.currentTime&&(i.localTime=null)}return i}},r={apply:function(i,r){if(e.specifiedTiming)return e.specifiedTiming;e.specifiedTiming=i.apply(t);var a=Object.assign({},e.specifiedTiming);return null!==a.duration&&"auto"!==a.duration||e.timeline&&(a.delay=0,a.endDelay=0,a.duration=a.iterations?(a.iterations?1e5:0)/a.iterations:0,n.apply(t,[a])),e.normalizedTiming=a,e.specifiedTiming}},a={apply:function(n,i,r){if(e.timeline){var a=r[0];if(Infinity===a.duration)throw TypeError("Effect duration cannot be Infinity when used with Scroll Timelines");if(Infinity===a.iterations)throw TypeError("Effect iterations cannot be Infinity when used with Scroll Timelines")}e.specifiedTiming&&n.apply(t,[e.specifiedTiming]),n.apply(t,r),e.specifiedTiming=null}},o=new Proxy(t,{get:function(e,n){var i=e[n];return"function"==typeof i?i.bind(t):i},set:function(e,t,n){return e[t]=n,!0}});return o.getComputedTiming=new Proxy(t.getComputedTiming,i),o.getTiming=new Proxy(t.getTiming,r),o.updateTiming=new Proxy(t.updateTiming,a),o}(e)),e.effect):e.animation.effect},set:function(e){L.get(this).animation.effect=e,details.effect=null}},{key:"timeline",get:function(){var e=L.get(this);return e.timeline||e.animation.timeline},set:function(e){var t=this.timeline;if(t!=e){var n=this.playState,i=this.currentTime,r=L.get(this),a=A(r),o=a>0?P(r,i)/a:0,l=t instanceof y,s=e instanceof y;r.resetCurrentTimeOnResume=!1;var u=this.pending;if(l&&v(r.timeline,r.animation),s){r.timeline=e,R(r);var c=r.animation.playbackRate>=0?0:A(r);switch(n){case"running":case"finished":r.startTime=c,T(r.timeline,r.animation,F.bind(this));break;case"paused":r.resetCurrentTimeOnResume=!0,r.startTime=null,r.holdTime=P(r,CSS.percent(100*o));break;default:r.holdTime=null,r.startTime=null}return u&&(r.readyPromise&&"resolved"!=r.readyPromise.state||b(r),r.pendingTask="paused"==n?"pause":"play"),null!==r.startTime&&(r.holdTime=null),void N(r,!1,!1)}if(r.animation.timeline!=e)throw TypeError("Unsupported timeline: "+e);if(v(r.timeline,r.animation),r.timeline=null,l)switch(null!==i&&(r.animation.currentTime=o*A(r)),n){case"paused":r.animation.pause();break;case"running":case"finished":r.animation.play()}}}},{key:"startTime",get:function(){var e=L.get(this);return e.timeline?x(e,e.startTime):e.animation.startTime},set:function(e){var t=L.get(this);if(e=P(t,e),t.timeline){null==P(t,t.timeline.currentTime)&&null!=t.startTime&&(t.holdTime=null,U(t));var n=P(t,this.currentTime);R(t),t.startTime=e,t.resetCurrentTimeOnResume=!1,t.holdTime=null!==t.startTime&&0!=t.animation.playbackRate?null:n,t.pendingTask&&(t.pendingTask=null,t.readyPromise.resolve(this)),N(t,!0,!1),U(t)}else t.animation.startTime=e}},{key:"currentTime",get:function(){var e=L.get(this);return e.timeline?x(e,null!=e.holdTime?e.holdTime:M(e)):e.animation.currentTime},set:function(e){var t=L.get(this);if(e=P(t,e),t.timeline&&null!=e){var n=t.timeline.phase;null!==t.holdTime||null===t.startTime||"inactive"==n||0==t.animation.playbackRate?t.holdTime=e:t.startTime=O(t,e),t.resetCurrentTimeOnResume=!1,"inactive"==n&&(t.startTime=null),t.previousCurrentTime=null,"pause"==t.pendingTask&&(t.holdTime=e,R(t),t.startTime=null,t.pendingTask=null,t.readyPromise.resolve(this)),N(t,!0,!1)}else t.animation.currentTime=e}},{key:"playbackRate",get:function(){return L.get(this).animation.playbackRate},set:function(e){var t=L.get(this);if(t.timeline){t.pendingPlaybackRate=null;var n=this.currentTime;t.animation.playbackRate=e,null!==n&&(this.currentTime=n)}else t.animation.playbackRate=e}},{key:"playState",get:function(){var e=L.get(this);if(!e.timeline)return e.animation.playState;var t=P(e,this.currentTime);if(null===t&&null===e.startTime&&null==e.pendingTask)return"idle";if("pause"==e.pendingTask||null===e.startTime&&"play"!=e.pendingTask)return"paused";if(null!=t){if(e.animation.playbackRate>0&&t>=A(e))return"finished";if(e.animation.playbackRate<0&&t<=0)return"finished"}return"running"}},{key:"replaceState",get:function(){return L.get(this).animation.pending}},{key:"pending",get:function(){var e=L.get(this);return e.timeline?!!e.readyPromise&&"pending"==e.readyPromise.state:e.animation.pending}},{key:"id",get:function(){return L.get(this).animation.id}},{key:"onfinish",get:function(){return L.get(this).animation.onfinish},set:function(e){L.get(this).animation.onfinish=e}},{key:"oncancel",get:function(){return L.get(this).animation.oncancel},set:function(e){L.get(this).animation.oncancel=e}},{key:"onremove",get:function(){return L.get(this).animation.onremove},set:function(e){L.get(this).animation.onremove=e}},{key:"finished",get:function(){var e=L.get(this);return e.timeline?(e.finishedPromise||(e.finishedPromise=new w),e.finishedPromise.promise):e.animation.finished}},{key:"ready",get:function(){var e=L.get(this);return e.timeline?(e.readyPromise||(e.readyPromise=new w,e.readyPromise.resolve(this)),e.readyPromise.promise):e.animation.ready}}]),e}(),V=new WeakMap,D=[[[0,1,2,3]],[[0,2],[1,3]],[[0],[1,3],[2]],[[0],[1],[2],[3]]],H=function(){function e(e){V.set(this,{target:null,edge:"start",threshold:0,rootMargin:[[0,"px"],[0,"px"],[0,"px"],[0,"px"]]}),this.target=e.target,this.edge=e.edge||"start",this.threshold=e.threshold||0,this.rootMargin=e.rootMargin||"0px 0px 0px 0px",this.clamp=e.clamp||!1}return t(e,[{key:"target",get:function(){return V.get(this).target},set:function(e){if(!(e instanceof Element))throw V.get(this).target=null,Error("Intersection target must be an element.");V.get(this).target=e}},{key:"edge",get:function(){return V.get(this).edge},set:function(e){-1!=["start","end"].indexOf(e)&&(V.get(this).edge=e)}},{key:"threshold",get:function(){return V.get(this).threshold},set:function(e){var t=parseFloat(e);if(t!=t)throw TypeError("Invalid threshold.");if(t<0||t>1)throw TypeError("threshold must be in the range [0, 1]");V.get(this).threshold=t}},{key:"rootMargin",get:function(){return V.get(this).rootMargin.map(function(e){return e.join("")}).join(" ")},set:function(e){var t=e.split(/ +/);if(t.length<1||t.length>4)throw TypeError("rootMargin must contain between 1 and 4 length components");for(var n=[[],[],[],[]],i=0;i<t.length;i++){var r=l(t[i],!0);if(!r)throw TypeError("Unrecognized rootMargin length");for(var a=D[t.length-1][i],o=0;o<a.length;o++)n[a[o]]=[parseFloat(r.value),r.unit]}V.get(this).rootMargin=n}},{key:"clamp",set:function(e){V.get(this).clamp=!!e}}]),e}(),z=function(){function e(){this.cssRulesWithTimelineName=[],this.scrollTimelineOptions=new Map}var t=e.prototype;return t.transpileStyleSheet=function(e,t){for(var n={sheetSrc:e,index:0,name:t};n.index<n.sheetSrc.length&&(this.eatWhitespace(n),!(n.index>=n.sheetSrc.length));)if(this.lookAhead("/*",n))for(;this.lookAhead("/*",n);)this.eatComment(n),this.eatWhitespace(n);else if(this.lookAhead("@scroll-timeline",n)){var i=this.parseScrollTimeline(n).scrollTimeline;this.scrollTimelineOptions.set(i.name,i)}else{var r=this.parseQualifiedRule(n);if(!r)continue;this.handleScrollTimelineProps(r,n)}return t?(console.log("herrrre"),n.sheetSrc=n.sheetSrc.replace(/url\(["']*([^)"']+)["']*\)/g,function(e,n){return"url("+new URL(n,t)+")"}),n.sheetSrc):n.sheetSrc},t.getScrollTimelineName=function(e,t){for(var n=this.cssRulesWithTimelineName.length-1;n>=0;n--){var i=this.cssRulesWithTimelineName[n];if(t.matches(i.selector)&&(!i["animation-name"]||i["animation-name"]==e))return i["animation-timeline"]}return null},t.parseScrollTimeline=function(e){var t=e.index;this.assertString(e,"@scroll-timeline"),this.eatWhitespace(e);var n=this.parseIdentifier(e);this.eatWhitespace(e),this.assertString(e,"{"),this.eatWhitespace(e);for(var i={name:n,source:"auto",orientation:void 0,"scroll-offsets":void 0};"}"!==this.peek(e);){var r=this.parseIdentifier(e);this.eatWhitespace(e),this.assertString(e,":"),this.eatWhitespace(e),i[r]=this.removeEnclosingDoubleQuotes(this.eatUntil(";",e)),this.assertString(e,";"),this.eatWhitespace(e)}this.assertString(e,"}");var a=e.index;return this.eatWhitespace(e),{scrollTimeline:i,startIndex:t,endIndex:a}},t.handleScrollTimelineProps=function(e,t){var n,i=e.block.contents.includes("animation-name:"),r=e.block.contents.includes("animation-timeline:"),a=e.block.contents.includes("animation:");if(r&&i)for(var o,l,s=null==(o=B.ANIMATION_TIMELINE.exec(e.block.contents))?void 0:o[1].trim().split(",").map(function(e){return e.trim()}),u=null==(l=B.ANIMATION_NAME.exec(e.block.contents))?void 0:l[1].trim().split(",").map(function(e){return e.trim()}),c=0;c<s.length;c++)this.cssRulesWithTimelineName.push({selector:e.selector,"animation-name":u[c],"animation-timeline":s[c]});else{var m,f=null==(n=B.ANIMATION_TIMELINE.exec(e.block.contents))?void 0:n[1].trim(),h=void 0;if(i)h=null==(m=B.ANIMATION_NAME.exec(e.block.contents))?void 0:m[1].trim();else if(a){var d,p=null==(d=B.ANIMATION.exec(e.block.contents))?void 0:d[1].trim();if(p){var g=p.split(" ").filter(function(e,t,n){return t==n.length-1||!q.includes(e)}).filter(function(e){return!(B.TIME.exec(e)||(t=e,B.NUMBER.exec(t)));var t});g.length<=2&&(h=g[0]),2==g.length&&(e.block.contents=e.block.contents.replace(f=g[1],""),this.replacePart(e.block.startIndex,e.block.endIndex,e.block.contents,t))}}h&&f&&this.cssRulesWithTimelineName.push({selector:e.selector,"animation-name":h,"animation-timeline":f}),f&&!e.selector.includes("@keyframes")&&this.cssRulesWithTimelineName.push({selector:e.selector,"animation-name":void 0,"animation-timeline":f})}},t.parseIdentifier=function(e){B.IDENTIFIER.lastIndex=e.index;var t=B.IDENTIFIER.exec(e.sheetSrc);if(!t)throw this.parseError(e,"Expected an identifier");return e.index+=t[0].length,t[0]},t.parseQualifiedRule=function(e){var t=e.index,n=this.parseSelector(e).trim();if(n)return{selector:n,block:this.eatBlock(e),startIndex:t,endIndex:e.index}},t.removeEnclosingDoubleQuotes=function(e){return e.substring('"'==e[0]?1:0,'"'==e[e.length-1]?e.length-1:e.length)},t.assertString=function(e,t){if(e.sheetSrc.substr(e.index,t.length)!=t)throw this.parseError(e,"Did not find expected sequence "+t);e.index+=t.length},t.replacePart=function(e,t,n,i){i.sheetSrc=i.sheetSrc.slice(0,e)+n+i.sheetSrc.slice(t),i.index>=t&&(i.index=e+n.length+(i.index-t))},t.eatComment=function(e){this.assertString(e,"/*"),this.eatUntil("*/",e),this.assertString(e,"*/")},t.eatBlock=function(e){var t=e.index;this.assertString(e,"{");for(var n=1;0!=n;)"{"===e.sheetSrc[e.index]?n++:"}"===e.sheetSrc[e.index]&&n--,this.advance(e);var i=e.index;return{startIndex:t,endIndex:i,contents:e.sheetSrc.slice(t,i)}},t.advance=function(e){if(e.index++,e.index>e.sheetSrc.length)throw this.parseError(e,"Advanced beyond the end")},t.eatUntil=function(e,t){for(var n=t.index;!this.lookAhead(e,t);)this.advance(t);return t.sheetSrc.slice(n,t.index)},t.parseSelector=function(e){var t=e.index;if(this.eatUntil("{",e),t===e.index)throw Error("Empty selector");return e.sheetSrc.slice(t,e.index)},t.eatWhitespace=function(e){B.WHITE_SPACE.lastIndex=e.index;var t=B.WHITE_SPACE.exec(e.sheetSrc);t&&(e.index+=t[0].length)},t.lookAhead=function(e,t){return t.sheetSrc.substr(t.index,e.length)==e},t.peek=function(e){return e.sheetSrc[e.index]},e}(),B={IDENTIFIER:/[\w\\\@_-]+/g,WHITE_SPACE:/\s*/g,NUMBER:/^[0-9]+/,TIME:/^[0-9]+(s|ms)/,ANIMATION_TIMELINE:/animation-timeline\s*:([^;}]+)/,ANIMATION_NAME:/animation-name\s*:([^;}]+)/,ANIMATION:/animation\s*:([^;}]+)/,OFFSET_WITH_SUFFIX:new RegExp("(^[0-9]+)("+["em","ex","ch","rem","vw","vh","vmin","vmax","cm","mm","q","in","pc","pt","px","%"].join("|")+")"),ELEMENT_OFFSET:/selector\(#([^)]+)\)[ ]{0,1}(start|end)*[ ]{0,1}([0-9]+[.]{0,1}[0-9]*)*/,SOURCE_ELEMENT:/selector\(#([^)]+)\)/},q=["normal","reverse","alternate","alternate-reverse","none","forwards","backwards","both","running","paused","ease","linear","ease-in","ease-out","ease-in-out"],Q=new z;function K(e){var t=B.SOURCE_ELEMENT.exec(e);return t?document.getElementById(t[1]):"auto"===e?document.scrollingElement:null}function X(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}if(c.push({parse:function(e){if(e.target)return new H(e)},evaluate:function(e,t,n,i){"block"==t?t="vertical":"inline"==t&&(t="horizontal");for(var r,a=e==document.scrollingElement?{left:0,right:e.clientWidth,top:0,bottom:e.clientHeight,width:e.clientWidth,height:e.clientHeight}:e.getBoundingClientRect(),o=V.get(n).rootMargin,l=[],s=0;s<4;s++)l.push("percent"==(r=o[s])[1]?r[0]*(s%2==0?a.height:a.width)/100:r[0]);var u=a.left-l[3],c=a.right-a.left+l[3]+l[1],m=a.top-l[0],f=a.bottom-a.top+l[0]+l[2],h=V.get(n).clamp,d=n.target.getBoundingClientRect(),p=n.threshold;if("start"==n.edge&&(p=1-p),"vertical"==t){var g=d.top+d.height*p-m+e.scrollTop;return h?"end"==n.edge?Math.max(0,g-f):Math.min(g,e.scrollHeight-f):"end"==n.edge?g-f:g}var v=d.left+d.width*p-u+e.scrollLeft;return h?"end"==n.edge?Math.max(0,v-c):Math.min(v,e.scrollWidth-c):"end"==n.edge?v-c:v}}),function(){function e(e){if(0!==e.innerHTML.trim().length){var t=Q.transpileStyleSheet(e.innerHTML);e.innerHTML=t}}new MutationObserver(function(t){for(var n,i=o(t);!(n=i()).done;)for(var r,a=o(n.value.addedNodes);!(r=a()).done;){var l=r.value;l instanceof HTMLStyleElement&&e(l)}}).observe(document.documentElement,{childList:!0,subtree:!0}),document.querySelectorAll("style").forEach(function(t){return e(t)}),document.querySelectorAll("link").forEach(function(e){})}(),window.addEventListener("animationstart",function(e){e.target.getAnimations().filter(function(t){return t.animationName===e.animationName}).forEach(function(t){var i=Q.getScrollTimelineName(t.animationName,e.target);if(i){var r=function(e){var t=Q.scrollTimelineOptions.get(e);if(!t)return null;var i=K(t.source),r=function(e,t){var i=void 0;if(t)if("none"==t);else{for(var r,a=o(i=t.split(",").map(function(e){return e.trim()}).filter(function(e){return""!=e}).map(function(e){return function(e){if("auto"==e)return new CSSKeywordValue("auto");var t=B.OFFSET_WITH_SUFFIX.exec(e);if(t)return new CSSUnitValue(parseInt(t[1]),t[2]);var i=B.ELEMENT_OFFSET.exec(e);return i&&document.getElementById(i[1])?n({target:document.getElementById(i[1])},i.length>=3?{edge:i[2]}:{},i.length>=4?{threshold:parseFloat(i[3])}:{}):null}(e)}).filter(function(e){return e}));!(r=a()).done;){var l=r.value;if(l.target&&l.target instanceof Element&&("none"==window.getComputedStyle(l.target,null).display||!X(l.target,e)))return null}if(0==i.length)return null}return i}(i,t["scroll-offsets"]);return null!==r?new ScrollTimeline(n({},i?{source:K(t.source)}:{},r?{scrollOffsets:r}:{},"auto"!=t.orientation?{orientation:t.orientation}:{})):null}(i);if(t.cancel(),r&&t.timeline!=r){var a=t.effect.target,l=t.effect.getKeyframes();a.animate(l,{timeline:r})}}})}),!Reflect.defineProperty(window,"ScrollTimeline",{value:y}))throw Error("Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window");if(!Reflect.defineProperty(Element.prototype,"animate",{value:function(e,t){var n=t.timeline;n instanceof y&&delete t.timeline;var i=S.apply(this,[e,t]),r=new j(i,n);return n instanceof y&&(i.pause(),r.play()),r}}))throw Error("Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element");if(!Reflect.defineProperty(window,"Animation",{value:j}))throw Error("Error installing Animation constructor.")}();
//# sourceMappingURL=scroll-timeline.js.map
