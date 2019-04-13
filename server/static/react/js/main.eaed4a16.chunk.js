(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{204:function(e,t,a){e.exports=a(380)},209:function(e,t,a){},376:function(e,t){},380:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(46),o=a.n(r),i=(a(209),a(36)),l=a(37),c=a(40),m=a(38),u=a(39),d=a(20),h=(a(96),a(57)),_=(a(125),a(391)),p=a(392),v=a(389),f=a(387),E=a(381),w=a(388),b=a(395),g=a(396),y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={visible:!0,loading:!1,username:"",password:"",confirm_password:"",showCreateNewAccount:!1,showLogin:!0,username_exists:!1,invalid_login:!1,validation_errors:!1,birthDay:"",birthMonth:""},a.handleChange=function(e){a.setState({validation_errors:!1}),a.setState(Object(h.a)({},e.target.name,e.target.value))},a.handleDateChange=function(e,t){var n,s=t.name,r=t.value;return a.setState((n={},Object(h.a)(n,s,r),Object(h.a)(n,"validation_errors",!1),n))},a.toggleSignUp=function(){var e;a.setState({validation_errors:!1}),e=!a.state.showCreateNewAccount,a.setState({showCreateNewAccount:!1,showLogin:!1}),e?setTimeout(function(){this.setState({showCreateNewAccount:!this.state.showCreateNewAccount})}.bind(Object(d.a)(Object(d.a)(a))),500):setTimeout(function(){this.setState({showLogin:!this.state.showLogin})}.bind(Object(d.a)(Object(d.a)(a))),500)},a.login=function(){a.props.socket.emit("login",{username:a.state.username,password:a.state.password})},a.create_account=function(){a.state.password!==a.state.confirm_password||a.state.password.length<6||""===a.state.birthDay||""===a.state.birthMonth||a.state.username.length<4?a.setState({validation_errors:!0,username_exists:!1,invalid_login:!1}):(a.setState({validation_errors:!1,username_exists:!1,invalid_login:!1}),a.props.socket.emit("create_account",{username:a.state.username,password:a.state.password,birthday:"".concat(a.state.birthMonth<10?"0":"").concat(a.state.birthMonth.toString(10),"-").concat(a.state.birthDay<10?"0":"").concat(a.state.birthDay.toString(10))}))},a.messages=function(){var e="";return a.state.validation_errors?(a.state.invalid_login?e="Your username or password is not recognized":a.state.password!==a.state.confirm_password?e="Passwords do not match":a.state.password.length<6?e="Password must have at least 6 characters":""===a.state.birthDay||""===a.state.birthMonth?e="Please enter a valid birthday":a.state.username.length<4?e="Username must have at least 4 characters":a.state.username_exists&&(e="This username is already taken"),s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(_.a,{warning:!0},s.a.createElement(_.a.Header,null,e),s.a.createElement("p",null,"Please try again."))))):s.a.createElement("div",null)},a.timePicker=function(){var e=new Array(31).fill(void 0).map(function(e,t){var a=t+1;return{key:a,text:a.toString(10),value:a}});return s.a.createElement("div",null,s.a.createElement(p.a,null,s.a.createElement(p.a.Item,{header:!0},"Birthday"),s.a.createElement(p.a.Menu,{position:"right"},s.a.createElement(v.a,{placeholder:"Month",options:[{key:"Jan",text:"January",value:1},{key:"Feb",text:"February",value:2},{key:"Mar",text:"March",value:3},{key:"Apr",text:"April",value:4},{key:"May",text:"May",value:5},{key:"Jun",text:"June",value:6},{key:"Jul",text:"July",value:7},{key:"Aug",text:"August",value:8},{key:"Sep",text:"September",value:9},{key:"Oct",text:"October",value:10},{key:"Nov",text:"November",value:11},{key:"Dec",text:"December",value:12}],name:"birthMonth",compact:!0,onChange:a.handleDateChange})),s.a.createElement(p.a.Menu,{position:"right"},s.a.createElement(v.a,{placeholder:"Day",options:e,name:"birthDay",compact:!0,onChange:a.handleDateChange}))))},a.create=function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(f.a,{fluid:!0,name:"confirm_password",onChange:a.handleChange,placeholder:"Confirm Password",type:"password"}))),s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},a.timePicker())),s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(E.a,{fluid:!0,onClick:a.create_account},"Create Account"))),s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(E.a,{fluid:!0,onClick:a.toggleSignUp},"Back to login"))))},a.normal=function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(E.a,{fluid:!0,onClick:a.login},"Login"))),s.a.createElement("div",{className:"niceMargins"},s.a.createElement("div",{className:"row"},s.a.createElement(E.a,{fluid:!0,onClick:a.toggleSignUp},"Sign up"))))},a.handleChange=a.handleChange.bind(Object(d.a)(Object(d.a)(a))),e.socket.on("username_taken",function(){console.log("username taken!"),a.setState({username_exists:!0,validation_errors:!0})}),e.socket.on("authentication_error",function(){console.log("invalid login!"),a.setState({invalid_login:!0,validation_errors:!0})}),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.showCreateNewAccount,a=e.showLogin,n=e.validation_errors;return s.a.createElement(w.a,null,s.a.createElement("div",{className:"niceMargins"},s.a.createElement(b.a.Row,null,s.a.createElement(f.a,{fluid:!0,type:"text",name:"username",onChange:this.handleChange,placeholder:"Username"}))),s.a.createElement("div",{className:"niceMargins"},s.a.createElement(b.a.Row,null,s.a.createElement(f.a,{fluid:!0,name:"password",onChange:this.handleChange,placeholder:"Password",type:"password"}))),s.a.createElement(g.a,{animation:"fade right",duration:500,visible:a},this.normal()),s.a.createElement(g.a,{animation:"fade left",duration:500,visible:t},this.create()),s.a.createElement(g.a,{animation:"fade",duration:500,visible:n},this.messages()))}}]),t}(s.a.Component),k=a(390),C=a(393),S=a(194),O=a.n(S);function j(e){return e.show_customer_info?s.a.createElement("div",null,s.a.createElement(C.a,{color:"red",size:"huge",style:{width:"100%"}},s.a.createElement(C.a.Value,null,e.new_number_of_stamps+e.customer_info.stamps),s.a.createElement(C.a.Label,null,"Current Stamps")),s.a.createElement(b.a,{columns:2},s.a.createElement(b.a.Row,null,s.a.createElement(b.a.Column,null,s.a.createElement(E.a,{size:"massive",onClick:e.redeem_stamps,disabled:e.stamps_subtracted||e.customer_info.stamps<e.redeem_value,fluid:!0},"Redeem ".concat(e.redeem_value," Stamps"))),s.a.createElement(b.a.Column,null,s.a.createElement(E.a,{size:"massive",onClick:e.add_a_stamp,fluid:!0},"Add a Stamp"))),s.a.createElement(b.a.Row,{centered:!0,columns:2},s.a.createElement(b.a.Column,null,s.a.createElement(C.a,{color:"red",size:"mini",style:{width:"100%"}},s.a.createElement(C.a.Label,null,"Last Visit"),s.a.createElement(C.a.Value,{text:!0},e.customer_info.last_visit))),s.a.createElement(b.a.Column,null,s.a.createElement(C.a,{color:"red",size:"mini",style:{width:"100%"}},s.a.createElement(C.a.Label,null,"Visits Every"),s.a.createElement(C.a.Value,{text:!0},"~".concat(Math.round(e.customer_info.average_days_between_visits)," days"))))),s.a.createElement(b.a.Row,{centered:!0,columns:1},s.a.createElement(b.a.Column,null,s.a.createElement(C.a,{color:"red",size:"mini",style:{width:"100%"}},s.a.createElement(C.a.Label,null,"Customer Since"),s.a.createElement(C.a.Value,{text:!0},e.customer_info.customer_since))))),s.a.createElement(E.a,{size:"massive",onClick:e.apply_stamps,fluid:!0},"Apply")):s.a.createElement("div",null)}var N=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={result:"no result",customer_info:{},show_scanner:!0,show_customer_info:!1,new_number_of_stamps:0,stamps_subtracted:!1,redeem_value:8},a.open_customer_info=function(){a.setState({show_scanner:!1}),setTimeout(function(){this.setState({show_customer_info:!0})}.bind(Object(d.a)(Object(d.a)(a))),500)},a.close_customer_info=function(){a.setState({show_customer_info:!1}),a.setState({show_scanner:!0})},a.handleScan=function(e){e&&a.state.show_scanner&&a.props.socket.emit("retrieve_customer_data",{username_to_retrieve:e,username_requesting:a.props.user_data.username})},a.handleError=function(e){console.error(e)},a.add_a_stamp=function(){console.log("Adding a stamp!"),a.setState({new_number_of_stamps:a.state.new_number_of_stamps+1})},a.redeem_stamps=function(){console.log("Redeeming stamps!"),a.setState({new_number_of_stamps:a.state.new_number_of_stamps-a.state.redeem_value,stamps_subtracted:!0})},a.apply_stamps=function(){console.log("Saving data..."),a.close_customer_info(),a.props.socket.emit("update_customer_stamps",{username_to_update:a.state.customer_info.username,username_requesting:a.props.user_data.username,number_of_stamps:a.state.new_number_of_stamps}),a.setState({new_number_of_stamps:0,stamps_subtracted:!1,customer_info:{}})},e.socket.on("customer_info",function(e){a.setState({customer_info:e}),console.log("got customer info!"),a.open_customer_info()}),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(g.a,{animation:"fade",duration:500,visible:this.state.show_scanner},s.a.createElement("div",null,s.a.createElement(O.a,{delay:300,onError:this.handleError,onScan:this.handleScan,style:{width:"100%"}}),s.a.createElement(k.a,{fluid:!0,header:"Aim this at a customer's QR code"}))),s.a.createElement(g.a,{animation:"fade",duration:500,visible:this.state.show_customer_info},s.a.createElement(j,{customer_info:this.state.customer_info,stamps_subtracted:this.state.stamps_subtracted,new_number_of_stamps:this.state.new_number_of_stamps,add_a_stamp:this.add_a_stamp,redeem_stamps:this.redeem_stamps,redeem_value:this.state.redeem_value,apply_stamps:this.apply_stamps,show_customer_info:this.state.show_customer_info})))}}]),t}(n.Component),x=a(345),M=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,null===this.props.user_data.rank?s.a.createElement(A,{user_data:this.props.user_data}):s.a.createElement("div",null,s.a.createElement(N,{socket:this.props.socket,user_data:this.props.user_data})))}}]),t}(n.Component);function A(e){return s.a.createElement("div",null,s.a.createElement("div",{style:{width:"85%",margin:"0 auto"}},s.a.createElement(x,{value:e.user_data.username,style:{width:"100%",height:"auto"}})),s.a.createElement(k.a,{fluid:!0,header:"Have a cashier scan this to earn or redeem points"}),s.a.createElement(C.a,{color:"red",size:"huge",style:{width:"100%"}},s.a.createElement(C.a.Value,null,e.user_data.stamps),s.a.createElement(C.a.Label,null,"Stamps Earned")))}var D=a(196),L=a.n(D)()("https://zellipsoid.ngrok.io"),z=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={authenticated:!1,show_dashboard:!1,user_data:{}},e.open_dashboard=function(){e.setState({authenticated:!0}),setTimeout(function(){this.setState({show_dashboard:!0})}.bind(Object(d.a)(Object(d.a)(e))),500)},L.on("authentication_successful",function(t){console.log("User received:"),console.log(t),e.state.user_data=t,e.open_dashboard()}),L.on("refresh_user_data",function(t){console.log("User refreshed:"),console.log(t),e.setState({user_data:t})}),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(g.a,{animation:"fade",duration:500,visible:!this.state.authenticated},s.a.createElement("div",{className:"center"},s.a.createElement(y,{socket:L}))),s.a.createElement(g.a,{animation:"fade",duration:500,visible:this.state.show_dashboard},s.a.createElement("div",{className:"center"},s.a.createElement(M,{socket:L,user_data:this.state.user_data}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},96:function(e,t,a){}},[[204,1,2]]]);
//# sourceMappingURL=main.eaed4a16.chunk.js.map