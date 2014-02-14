jQuery.autocomplete=function(k,a){function q(){l={data:{},length:0}}function D(a){var c=$("li",r);c&&(m+=a,0>m?m=0:m>=c.size()&&(m=c.size()-1),c.removeClass("ac_over"),$(c[m]).addClass("ac_over"))}function J(){var b=$("li.ac_over",r)[0];if(!b){var c=$("li",r);a.selectOnly?1==c.length&&(b=c[0]):a.selectFirst&&(b=c[0])}return b?(z(b),!0):!1}function z(b){b||(b=document.createElement("li"),b.extra=[],b.selectValue="");var c=$.trim(b.selectValue?b.selectValue:b.innerHTML);s=k.lastSelected=c;n.html("");
h.val(c);t();a.onItemSelect&&setTimeout(function(){a.onItemSelect(b)},1)}function t(){p&&clearTimeout(p);h.removeClass(a.loadingClass);n.is(":visible")&&n.hide();a.mustMatch&&h.val()!=k.lastSelected&&z(null)}function E(b,c){var d,f;if(c){h.removeClass(a.loadingClass);r.innerHTML="";if(!A||0==c.length)return t();$.browser.msie&&n.append(document.createElement("iframe"));r.appendChild(K(c));if(a.autoFill&&h.val().toLowerCase()==b.toLowerCase()&&(f=c[0][0],8!=u)){h.val(h.val()+f.substring(s.length));
d=s.length;f=f.length;var e=h.get(0);if(e.createTextRange){var g=e.createTextRange();g.collapse(!0);g.moveStart("character",d);g.moveEnd("character",f);g.select()}else e.setSelectionRange?e.setSelectionRange(d,f):e.selectionStart&&(e.selectionStart=d,e.selectionEnd=f);e.focus()}d=k;e=d.offsetLeft||0;for(f=d.offsetTop||0;d=d.offsetParent;)e+=d.offsetLeft,f+=d.offsetTop;d=e;e=0<a.width?a.width:h.width();n.css({width:parseInt(e)+"px",top:f+k.offsetHeight+"px",left:d+"px"}).show()}else t()}function F(b){if(!b)return null;
var c=[];b=b.split(a.lineSeparator);for(var d=0;d<b.length;d++){var f=$.trim(b[d]);f&&(c[c.length]=f.split(a.cellSeparator))}return c}function K(b){var c=document.createElement("ul"),d=b.length;0<a.maxItemsToShow&&a.maxItemsToShow<d&&(d=a.maxItemsToShow);for(var f=0;f<d;f++){var e=b[f];if(e){var g=document.createElement("li");g.innerHTML=a.formatItem?a.formatItem(e,f,d):e[0];g.selectValue=e[0];var h=null;if(1<e.length)for(var h=[],k=1;k<e.length;k++)h[h.length]=e[k];g.extra=h;c.appendChild(g);$(g).hover(function(){$("li",
c).removeClass("ac_over");$(this).addClass("ac_over");m=$("li",c).indexOf($(this).get(0))},function(){$(this).removeClass("ac_over")}).click(function(a){a.preventDefault();a.stopPropagation();z(this)})}}return c}function L(b){a.matchCase||(b=b.toLowerCase());var c=a.cacheLength?G(b):null;c?E(b,c):"string"==typeof a.url&&0<a.url.length?$.get(H(b),function(a){a=F(a);B(b,a);E(b,a)}):h.removeClass(a.loadingClass)}function H(b){b=a.url+"?q="+encodeURI(b);for(var c in a.extraParams)b+="&"+c+"="+encodeURI(a.extraParams[c]);
return b}function G(b){if(!b)return null;if(l.data[b])return l.data[b];if(a.matchSubset)for(var c=b.length-1;c>=a.minChars;c--){var d=b.substr(0,c);if(d=l.data[d]){for(var c=[],f=0;f<d.length;f++){var e=d[f],g;g=e[0];var h=b;a.matchCase||(g=g.toLowerCase());g=g.indexOf(h);g=-1==g?!1:0==g||a.matchContains;g&&(c[c.length]=e)}return c}}return null}function C(b,c){c&&h.removeClass(a.loadingClass);for(var d=c?c.length:0,f=null,e=0;e<d;e++){var g=c[e];if(g[0].toLowerCase()==b.toLowerCase()){f=document.createElement("li");
f.innerHTML=a.formatItem?a.formatItem(g,e,d):g[0];f.selectValue=g[0];var k=null;if(1<g.length)for(var k=[],l=1;l<g.length;l++)k[k.length]=g[l];f.extra=k}}a.onFindValue&&setTimeout(function(){a.onFindValue(f)},1)}function B(b,c){c&&(b&&a.cacheLength)&&(!l.length||l.length>a.cacheLength?(q(),l.length++):l[b]||l.length++,l.data[b]=c)}var h=$(k).attr("autocomplete","off");a.inputClass&&h.addClass(a.inputClass);var r=document.createElement("div"),n=$(r);n.hide().addClass(a.resultsClass).css("position",
"absolute");0<a.width&&n.css("width",a.width);$("body").append(r);k.autocompleter=this;var p=null,s="",m=-1,l={},A=!1,u=null;q();if(null!=a.data){var x="",v={},y=[];"string"!=typeof a.url&&(a.cacheLength=1);for(var w=0;w<a.data.length;w++)y="string"==typeof a.data[w]?[a.data[w]]:a.data[w],0<y[0].length&&(x=y[0].substring(0,1).toLowerCase(),v[x]||(v[x]=[]),v[x].push(y));for(var I in v)a.cacheLength++,B(I,v[I])}h.keydown(function(b){u=b.keyCode;switch(b.keyCode){case 38:b.preventDefault();D(-1);break;
case 40:b.preventDefault();D(1);break;case 9:case 13:J()&&(h.get(0).blur(),b.preventDefault());break;default:m=-1,p&&clearTimeout(p),p=setTimeout(function(){if(46==u||8<u&&32>u)n.hide();else{var b=h.val();b!=s&&(s=b,b.length>=a.minChars?(h.addClass(a.loadingClass),L(b)):(h.removeClass(a.loadingClass),n.hide()))}},a.delay)}}).focus(function(){A=!0}).blur(function(){A=!1;p&&clearTimeout(p);p=setTimeout(t,200)});t();this.flushCache=function(){q()};this.setExtraParams=function(b){a.extraParams=b};this.findValue=
function(){var b=h.val();a.matchCase||(b=b.toLowerCase());var c=a.cacheLength?G(b):null;c?C(b,c):"string"==typeof a.url&&0<a.url.length?$.get(H(b),function(a){a=F(a);B(b,a);C(b,a)}):C(b,null)}};
jQuery.fn.autocomplete=function(k,a,q){a=a||{};a.url=k;a.data="object"==typeof q&&q.constructor==Array?q:null;a.inputClass=a.inputClass||"ac_input";a.resultsClass=a.resultsClass||"ac_results";a.lineSeparator=a.lineSeparator||"\n";a.cellSeparator=a.cellSeparator||"|";a.minChars=a.minChars||1;a.delay=a.delay||400;a.matchCase=a.matchCase||0;a.matchSubset=a.matchSubset||1;a.matchContains=a.matchContains||0;a.cacheLength=a.cacheLength||1;a.mustMatch=a.mustMatch||0;a.extraParams=a.extraParams||{};a.loadingClass=
a.loadingClass||"ac_loading";a.selectFirst=a.selectFirst||!1;a.selectOnly=a.selectOnly||!1;a.maxItemsToShow=a.maxItemsToShow||-1;a.autoFill=a.autoFill||!1;a.width=parseInt(a.width,10)||0;this.each(function(){new jQuery.autocomplete(this,a)});return this};jQuery.fn.autocompleteArray=function(k,a){return this.autocomplete(null,a,k)};jQuery.fn.indexOf=function(k){for(var a=0;a<this.length;a++)if(this[a]==k)return a;return-1};