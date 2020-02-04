//感觉记录器,但是感觉记录器需要有个standard。就是什么样的感觉，如何分析和以前的感觉结合起来。
//日记。自己很喜欢写的感觉要有时间保留着部分。思考的流程 
//无限可能扩展block。
//morr accurate more efficent

let _f = {
  format:{
  timestr:function(stamp,rettype){
  
        let t= stamp;
        
        let d =`${t.getFullYear(  )}-${t.getMonth(  )+1}-${t.getDate(  )}`.split( '-' );
        for( i in d ) {
          if( d[i].length<2 ){
            d[i]='0'+d[i]
          }
        }
        
        d = d.join( '-' )
       
        let s = ` ${t.getHours(  )}:${t.getMinutes(  )}:${t.getSeconds(  )}`.split( ':' )
        for( j in s ){
          if( s[j].length<2 ){
            s[j]='0'+s[j]
          }
        }
        
    
        s = s.join( ':' )
   switch ( rettype ){
          case 1:
            return d+s;
            break;
          case 2: 
            return d;
            break;
          case 3:
            return s;
            break;
        }
      }
  }
}




let _logic = {
  body:null,
  testbtn:null,
  scrollbtn:null,
  init:function(  ){
    _logic.body= document.body
  },
  test:function (  ){
     let div= document .createElement ( 'div' )
     div.classList.add( 'test-btn' )
     _logic.body.append( div )
     _logic.testbtn=div
  },
  scrollbtn: function(  ){
    let scrollbtn= document.createElement ( 'div' )
    scrollbtn.innerHTML = `<div id='scrollbtn' class = 'cbtn-f'><i class='icono-caretDownSquare'></i><div>`
    _logic.body.append( scrollbtn )
    scrollbtn.click=function(  ){
    document.body.style['display']='none'
      _logic.testbtn.innerHTML ='nsjsksjkdkdkdjdjdkkdkdkdkdk'
    }   
  }
}

window.onload=function (  ){

	let _data = {	
	"pattern":[
	//icon
		{reg:/\[sd\]/gi,cls:"icono-list f-red,icono-clock"},{reg:/\[\]/gi,cls:"icono-flag"},
		{reg:/\[x\]/gi,cls:"icono-cross f-red"},{reg:/\[y\]/gi,cls:"icono-check f-green"},{reg:/\[p\]\s/gi,cls:"icono-folder f-brown"},{reg:/\[c\]\s/gi,cls:"icono-calendar"},
		//function , blocks 才有v，t 选项,text optional
		{reg:/\[process\s+(\d{4}-\d{2}-\d{2})\s+(\d+)\s+(\d+)%(\s+\"(.+)\")?\]/gi,text:'',v:true,t:'process'},{reg:/\[mood\s+(\d{4}-\d{2}-\d{2})\s+\"(.+)\"\s+(\".+\")\s+(\".+\")\s+(\".+\")\]/gi,text:'',v:true,t:'mood'}
		//daily duration minutes
		,{reg:/\[dailyprocess\s+\"(\d{2}:\d{2}:\d{2})\"\s+(\d+)\s+(\d+)%(\s+\"(.+)\")?\]/gi,text:'',v:true,t:'dailyprocess'},],
//con:document.getElementById( "con" ),
	body:document.body
	} 
//	_data.con.innerHTML =" =  =  =  =  =  = "
	let html=_data.body.innerHTML ;
	
	// replacement components
	for (var i in _data.pattern) {
	  let text=''
	  if(_data.pattern[i].cls){
      let tmp=_data.pattern[i].cls.split( ',' );
    
      for( var j=0;j<tmp.length;j++ ){
	   	  text +="<i class = ' "+tmp[j]+"'></i> "
		  	}
		  	
		  	html=html.replace ( _data.pattern[i].reg,text)
	//_data.con.innerHTML =_data.pattern[i].reg
    	}
    	
    	if( typeof( _data.pattern[i].v )!="undefined" ){
    	
    if( _data.pattern[i].v && _data.pattern[i].t=='dailyprocess'){
      html=html.replace( _data.pattern[i].reg,function ( a,b,c,d,e,f ) {
      e = e?'备注：'+e :''
      let m= parseInt ( c )*60000
      let now = new Date(  )
      //reset b ,input b without day
     let _tmp= `${now.getFullYear()}-${now.getMonth() +1}-${now.getDate()} ${b}`
     b= _tmp
      
      let starttime = new Date( b )
      let deadline = new Date( b )
      let retstr=''
      
      deadline.setMilliseconds( deadline.getMilliseconds(  )+m );
      
    retstr= ( now > deadline)?"<i class='icono-cross f-red'></i>":"<i class = 'icono-flag f-green'></i>"
    
       return `<div class = 'b-dailyprocess'><i class = 'icono-list f-red'></i>${retstr} ${_f.format.timestr( starttime,3 )} -  ${_f.format.timestr( deadline,3 ) }⏳⌚${d}% ${e}</div>`
      })
    }	if( _data.pattern[i].v&&_data.pattern[i].t=='mood'){
    	  html=html.replace( _data.pattern[i].reg, function ( a,b,c,d,e,f ){
    	  // description ND situation nd rethink 注意文本内不可以有换行符，如需换行使用<br/>
    	    return `<div class='b-mood'>${b} <br/>@<span>${c}</span>  :   ${d}<br/> @📝  :   ${e} <br/> @🤔     :  ${f} </div>`
    	  })
    	}
    	  if ( _data.pattern[i].v&&_data.pattern[i].t=='process'){
    	  let now= new Date(  )
			  text += _data.pattern[i].text +'dnkdkdkdkdkdkkdkd'
			  html=html.replace ( _data.pattern[i].reg,function ( a,b,c,d,e,f ){
			  
			  let now = new Date(  )
			   let end  = new Date( b )
			   let retstr=''
			   if( !f ){f= ''}else{f='备注：'+f}
			            
			       end.setDate( end.getDate(  )+parseInt( c ))
			       if ( now <= end ){
			         retstr += "<i class='icono-flag f-green f-12'></i>"
			       } else if ( now > end ){
			         retstr += "<i class = 'icono-cross f-red f-12'></i>"
			       }
			    return `<div class = "mgb-12 f-grey f-12"> ${retstr} ${end.getFullYear(  )}-${(end.getMonth(  ) +1 )}-${end.getDate(  )}⏳⌚ ${d}% <br/> <span class = 'f-red'>${f}</span></div>`;
			 })
			  }  	
    	}
	}
	
	// handle extra html components
	
_data.body.innerHTML =html;


_logic.init(  )

//_logic.test(  )
//_logic.scrollbtn(  )
}