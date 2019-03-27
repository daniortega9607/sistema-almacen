(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42f97b1a"],{"26e5":function(t,e,i){},3846:function(t,e,i){i("9e1e")&&"g"!=/./g.flags&&i("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:i("0bfb")})},"4bd4":function(t,e,i){"use strict";i("26e5");var n=i("94ab");e["a"]={name:"v-form",mixins:[Object(n["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",function(i){e.$set(e.errorBag,t._uid,i)},{immediate:!0})},n={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",function(r){r&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))}):n.valid=i(t),n},validate:function(){var t=this.inputs.filter(function(t){return!t.validate(!0)}).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find(function(e){return e._uid===t._uid});if(e){var i=this.watchers.find(function(t){return t._uid===e._uid});i.valid&&i.valid(),i.shouldValidate&&i.shouldValidate(),this.watchers=this.watchers.filter(function(t){return t._uid!==e._uid}),this.inputs=this.inputs.filter(function(t){return t._uid!==e._uid}),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},"68e3":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.entity?i("v-card",[i("v-card-title",{attrs:{"primary-title":""}},[i("h1",[t._v(t._s(t.entity.display_name_plural))]),i("v-spacer"),i("v-dialog",{attrs:{"max-width":"690px",transition:t.isMobile?"dialog-bottom-transition":"dialog-transition",scrollable:"",fullscreen:t.isMobile},scopedSlots:t._u([t.entity.hideAddButton?null:{key:"activator",fn:function(e){var n=e.on;return[i("v-btn",t._g({attrs:{color:"success"},on:{click:t.setDefaultValues}},n),[t._v("\n          Agregar\n        ")])]}}],null,!0),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-toolbar",{attrs:{dark:"",color:"primary"}},[t.isMobile?i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog=!1}}},[i("v-icon",[t._v("close")])],1):t._e(),i("v-toolbar-title",[t._v(t._s(t.formTitle))]),i("v-spacer"),t.item.updated_at&&!t.isMobile?i("v-subheader",[t._v("\n            Ultima modificacion: "+t._s(t.moment(t.item.updated_at).fromNow())+"\n          ")]):t._e(),t.isMobile?i("v-toolbar-items",[i("v-btn",{attrs:{dark:"",flat:""},on:{click:t.save}},[t._v("\n              Guardar\n            ")])],1):t._e()],1),i("v-card-text",[i("v-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[t._l(t.getEntityForm(t.entity,-1!==t.editedIndex),function(e){return[i("render-field",{key:"item-form-"+e,attrs:{entity:t.entity,field:e,item:t.item,"edited-index":t.editedIndex,rules:t.getFieldValidations(t.entity,e,t.item),"change-handler":function(i){return t.item[e]=i}}})]})],2)],1),t.isMobile?t._e():i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:t.close}},[t._v("\n            Cancelar\n          ")]),i("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:t.save}},[t._v("\n            Guardar\n          ")])],1)],1)],1)],1),i("div",[i("v-toolbar",{attrs:{flat:"",color:"white"}},[i("v-text-field",{attrs:{"append-icon":"search",label:"Buscar","single-line":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.getEntityHeaders(t.entity),search:t.search,items:t.getItems({entity:t.entity.apiUrl,params:{office:t.$store.state.app.selectedOffice}}),"custom-filter":t.customFilter,"no-results-text":"No se encontraron registros","rows-per-page-text":"Registros por página","rows-per-page-items":t.rowsPerPage},scopedSlots:t._u([{key:"items",fn:function(e){return[t._l(Object.keys(t.entity.field_configs.list),function(n){return i("td",{key:"item-"+e.index+"-"+n,class:{"text-xs-center":"center"===t.entity.field_configs.list[n].align,"text-xs-right":"right"===t.entity.field_configs.list[n].align,"text-xs-left":"left"===t.entity.field_configs.list[n].align},on:{click:function(i){return t.editItem(e.item)}}},[t.entity.field_configs.list[n].formatter?i(t.entity.field_configs.list[n].formatter,t._b({tag:"component"},"component",e.item,!1)):i("div",[t._v("\n            "+t._s(e.item[n])+"\n          ")])],1)}),t.entity.no_actions?t._e():i("td",{staticClass:"justify-center layout px-0"},[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(i){return t.editItem(e.item)}}},[t._v("\n            edit\n          ")]),i("v-icon",{attrs:{small:""},on:{click:function(i){return t.deleteItem(e.item)}}},[t._v("\n            delete\n          ")])],1)]}},{key:"no-data",fn:function(){return[i("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("\n          Reset\n        ")])]},proxy:!0}],null,!1,228961364)})],1)],1):t._e()},r=[],a=(i("28a5"),i("386d"),i("6b54"),i("06db"),i("a4bb")),s=i.n(a),o=i("768b"),c=(i("96cf"),i("3b8d")),l=(i("a481"),i("5176")),u=i.n(l),d=(i("7f7f"),i("cebc")),f=i("6d31"),h=i("ed08"),m=i("7f8c"),p=i("2f62"),v=i("c1df"),g=i.n(v);g.a.locale("es");var b={components:{RenderField:m["a"]},data:function(){return{search:"",dialog:!1,entity:null,editedIndex:-1,item:null,rowsPerPage:[5,10,25,{text:"Todos",value:-1}]}},computed:Object(d["a"])({formTitle:function(){return-1===this.editedIndex?"Crear ".concat(this.entity.display_name):"Editar ".concat(this.entity.display_name)},isMobile:function(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name}},Object(p["b"])("entities",["getItems"])),watch:{dialog:function(t){t||this.close(),this.$refs.form.resetValidation()}},created:function(){this.initialize()},methods:{initialize:function(){if(Object(f["g"])({url:"almacen"}))return this.entity=Object(f["d"])({url:"almacen"}),this.item=u()({},Object(f["a"])(this.entity)),void(this.$store.state.entities[this.entity.apiUrl].length||this.$store.dispatch("entities/read",{entity:this.entity.apiUrl}));this.$router.replace("/")},editItem:function(t){this.editedIndex=this.$store.state.entities[this.entity.apiUrl].indexOf(t),this.item=u()({},t),this.dialog=!0},deleteItem:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var i,n,r,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(i=this.$store.state.entities[this.entity.apiUrl].indexOf(e),!window.confirm("¿Esta seguro de eliminar este registro?")){t.next=9;break}return t.next=4,this.$store.dispatch("entities/delete",{deletedItem:i,entity:this.entity.apiUrl,item:e});case 4:n=t.sent,r=Object(o["a"])(n,2),a=r[0],s=r[1],a||this.$store.commit("app/showAlert",s);case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),close:function(){var t=this;this.dialog=!1,setTimeout(function(){t.item=u()({},Object(f["a"])(t.entity)),t.editedIndex=-1},300)},save:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,i,n,r,a,c,l,u,f,h,m=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs.form.validate()){t.next=20;break}if(!(this.editedIndex>-1)){t.next=11;break}return t.next=4,this.$store.dispatch("entities/update",{updatedItem:this.editedIndex,entity:this.entity.apiUrl,item:this.item});case 4:e=t.sent,i=Object(o["a"])(e,2),n=i[0],r=i[1],n?n.response&&n.response.data&&n.response.data.error&&(a=n.response.data,this.$store.commit("app/showAlert",Object(d["a"])({},a,{message:a.error[s()(a.error)[0]][0]}))):(this.$store.commit("app/showAlert",r),this.close()),t.next=18;break;case 11:return t.next=13,this.$store.dispatch("entities/create",{entity:this.entity.apiUrl,item:this.item});case 13:c=t.sent,l=Object(o["a"])(c,2),u=l[0],f=l[1],u?u.response&&u.response.data&&u.response.data.error&&(h=u.response.data,this.$store.commit("app/showAlert",Object(d["a"])({},h,{message:h.error[s()(h.error)[0]][0]}))):(this.$store.commit("app/showAlert",f),this.close());case 18:t.next=22;break;case 20:this.$refs.form.resetValidation(),setTimeout(function(){m.$refs.form.validate()},400);case 22:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),customFilter:function(t,e,i){var n=e.toString().toLowerCase();if(""===n.trim())return t;var r=this.entity.field_configs.search;return t.filter(function(t){return(r||s()(t)).some(function(e){return i(Object(h["b"])(t,e.split(".")),n)})})},setDefaultValues:function(){this.item.office_id=this.$store.state.app.selectedOffice.id},getEntityHeaders:f["c"],getEntityForm:f["b"],getFieldValidations:f["e"],moment:g.a}},y=b,_=i("2877"),x=i("6544"),w=i.n(x),k=i("8336"),$=i("b0af"),V=i("99d9"),I=i("12b2"),O=i("8fea"),j=i("169a"),T=i("4bd4"),B=i("132d"),S=i("9910"),A=i("e0c7"),C=i("2677"),E=i("71d9"),M=i("2a7f"),R=Object(_["a"])(y,n,r,!1,null,null,null);e["default"]=R.exports;w()(R,{VBtn:k["a"],VCard:$["a"],VCardActions:V["a"],VCardText:V["b"],VCardTitle:I["a"],VDataTable:O["a"],VDialog:j["a"],VForm:T["a"],VIcon:B["a"],VSpacer:S["a"],VSubheader:A["a"],VTextField:C["a"],VToolbar:E["a"],VToolbarItems:M["a"],VToolbarTitle:M["b"]})},"6b54":function(t,e,i){"use strict";i("3846");var n=i("cb7c"),r=i("0bfb"),a=i("9e1e"),s="toString",o=/./[s],c=function(t){i("2aba")(RegExp.prototype,s,t,!0)};i("79e5")(function(){return"/a/b"!=o.call({source:"a",flags:"b"})})?c(function(){var t=n(this);return"/".concat(t.source,"/","flags"in t?t.flags:!a&&t instanceof RegExp?r.call(t):void 0)}):o.name!=s&&c(function(){return o.call(this)})},a481:function(t,e,i){"use strict";var n=i("cb7c"),r=i("4bf8"),a=i("9def"),s=i("4588"),o=i("0390"),c=i("5f1b"),l=Math.max,u=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,m=function(t){return void 0===t?t:String(t)};i("214f")("replace",2,function(t,e,i,p){return[function(n,r){var a=t(this),s=void 0==n?void 0:n[e];return void 0!==s?s.call(n,a,r):i.call(String(a),n,r)},function(t,e){var r=p(i,t,this,e);if(r.done)return r.value;var d=n(t),f=String(this),h="function"===typeof e;h||(e=String(e));var g=d.global;if(g){var b=d.unicode;d.lastIndex=0}var y=[];while(1){var _=c(d,f);if(null===_)break;if(y.push(_),!g)break;var x=String(_[0]);""===x&&(d.lastIndex=o(f,a(d.lastIndex),b))}for(var w="",k=0,$=0;$<y.length;$++){_=y[$];for(var V=String(_[0]),I=l(u(s(_.index),f.length),0),O=[],j=1;j<_.length;j++)O.push(m(_[j]));var T=_.groups;if(h){var B=[V].concat(O,I,f);void 0!==T&&B.push(T);var S=String(e.apply(void 0,B))}else S=v(V,f,I,O,T,e);I>=k&&(w+=f.slice(k,I)+S,k=I+V.length)}return w+f.slice(k)}];function v(t,e,n,a,s,o){var c=n+t.length,l=a.length,u=h;return void 0!==s&&(s=r(s),u=f),i.call(o,u,function(i,r){var o;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(c);case"<":o=s[r.slice(1,-1)];break;default:var u=+r;if(0===u)return i;if(u>l){var f=d(u/10);return 0===f?i:f<=l?void 0===a[f-1]?r.charAt(1):a[f-1]+r.charAt(1):i}o=a[u-1]}return void 0===o?"":o})}})}}]);
//# sourceMappingURL=chunk-42f97b1a.0b15f766.js.map