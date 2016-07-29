var cv, ctx;
var boolMouseDown = false;
var xPos, yPos;
Template.mainCanvas.onRendered(function(){
    
    
    cv=$("#bloodyPaint").get(0);
	if (!cv.getContext) {
		alert("Failed");
		return;
	}
	
	ctx = cv.getContext('2d');
	if (!ctx) {
		alert("Failed");
		return;
	}
	
	
	
	
	function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        
        xPos=event.pageX;
        yPos=event.pageY
    }
    
    
    
    
});



Template.registerHelper("getBackColor", function(){
    
    var r = Session.get("BackRed");
                var g = Session.get("BackGreen");
                var b = Session.get("BackBlue");
                /*console.log("r: "+r);
                console.log("g: "+g);
                console.log("b: "+b);*/
                var hex = [
                    r.toString(16),
                    g.toString(16),
                    b.toString(16)
                ];
                $.each(hex, function(nr, val) {
                    if (val.length === 1) {
                        hex[nr] = "0" + val;
                    }
                });
                /*console.log(hex);*/
                return "#" + hex.join("").toUpperCase();
    
    
    
    
})

Template.registerHelper('displayClock', function(){
    return Session.get('curTime');
})


Template.mainCanvas.events({
    "mousedown #bloodyPaint":function(event){
        var rect = cv.getBoundingClientRect();
        console.log(rect);
        // Use event.pageX / event.pageY here
        
        
        /* xPos=event.clientX - rect.left;
        yPos=event.clientY - rect.top;*/
        xPos=event.clientX - ctx.offsetLeft;
        yPos=event.clientY - ctx.offsetTop;
            ctx.beginPath();
			ctx.lineWidth =Session.get("ToolWidth");
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.shadowBlur = "red";
			ctx.shadowColor = "red";
			ctx.moveTo(xPos,yPos);
			boolMouseDown = true;
        
    },
    
    "mousemove #bloodyPaint":function(event){
        
        var rect = cv.getBoundingClientRect();
       /* console.log(rect);*/
        
        
        xPos=event.clientX - rect.left;
        yPos=event.clientY - rect.top;
        
         /*xPos=event.clientX - ctx.offsetLeft;
        yPos=event.clientY - ctx.offsetTop;*/
        /*console.log(xPos);*/
        console.log("X:"+xPos+"  |  "+"Y:"+yPos);
        if (boolMouseDown) {
				ctx.lineTo(xPos,yPos);
				ctx.strokeStyle = Session.get("choosenColor");

				ctx.stroke();
				/*audio.addEventListener('ended', function() {
					this.currentTime = 0;
					this.play();
				}, false);
				audio.play();*/
			}
    },
    "mouseup #bloodyPaint":function(event){
        boolMouseDown=false;
    }
    
    
    
})

Template.body.helpers({
    'formatDate': function(){
        //return moment(this.date).format("h:mm:ss a");
        return Session.get('curTime');
    }
    
    
})



function displayTime(){
    var curT = moment(this.date).format("h:mm:ss a");
    //return moment(this.date).format("h:mm:ss a");
    Session.set('curTime', curT);
}
Meteor.setInterval(displayTime, 1000);