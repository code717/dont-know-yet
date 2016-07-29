        Session.set("ToolRed", 0);
        Session.set("ToolGreen", 0);
        Session.set("ToolBlue", 0);


        Session.set("BackRed", 255);
        Session.set("BackGreen", 255);
        Session.set("BackBlue", 255);
        
        Session.set("ShadowRed", 0);
        Session.set("ShadowGreen", 0);
        Session.set("ShadowBlue", 0);
        
        
        Session.set("ToolWidth", 5);
        Session.set("ShadowWidth", 5);

Template.sideBar.onRendered(function() {
            $('#red, #green, #blue').slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: 0,
                slide: UpdateColor,
                change: UpdateColor



            });

            $('#red2, #green2, #blue2').slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: 255,
                slide: UpdateBack,
                change: UpdateBack



            });
            
            
            $('#red3, #green3, #blue3').slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: 0,
                slide: updShadow,
                change: updShadow



            });


            $('#width').slider({
                range: "min",
                min: 1,
                max: 50,
                value: Session.get("ToolWidth"),
                slide: updWidth,
                change: updWidth,
            });
            
             $('#cienblur').slider({
                range: "min",
                min: 1,
                max: 50,
                value: Session.get("ShadowWidth"),
                slide: updShadowWidth,
                change: updShadowWidth,
            });
            

            function UpdateColor() {
                var red = $("#red").slider("value"),
                    green = $("#green").slider("value"),
                    blue = $("#blue").slider("value");



                Session.set("ToolRed", red);
                Session.set("ToolGreen", green);
                Session.set("ToolBlue", blue);
            }


            function UpdateBack() {
                var red = $("#red2").slider("value"),
                    green = $("#green2").slider("value"),
                    blue = $("#blue2").slider("value");



                Session.set("BackRed", red);
                Session.set("BackGreen", green);
                Session.set("BackBlue", blue);
            }


            function updWidth() {
                var width=$("#width").slider("value");
                
                Session.set("ToolWidth", width);
            }

            function updShadow(){
                var red = $("#red3").slider("value"),
                    green = $("#green3").slider("value"),
                    blue = $("#blue3").slider("value");



                Session.set("ShadowRed", red);
                Session.set("ShadowGreen", green);
                Session.set("ShadowBlue", blue);
                
            }
            
            function updShadowWidth(){
                var shadowWidth=$("#cienblur").slider("value");
                
                Session.set("ShadowWidth", shadowWidth);
            }



        })



        Template.sideBar.helpers({
            hexFromRGB: function() {
                var r = Session.get("ToolRed");
                var g = Session.get("ToolGreen");
                var b = Session.get("ToolBlue");
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
            },
            hexFromRGBback: function() {
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
            },
            hexFromRGBShadow:function(){
               var r = Session.get("ShadowRed");
                var g = Session.get("ShadowGreen");
                var b = Session.get("ShadowBlue");
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
            }

        });

        Template.registerHelper("session", function(input) {
            return Session.get(input);

        });
        
        
        


        Template.sideBar.events({
            "change .toolSliders": function(event) {
                var red = $("#red").slider("value"),
                    green = $("#green").slider("value"),
                    blue = $("#blue").slider("value");

                Session.set("ToolRed", red);
                Session.set("ToolGreen", green);
                Session.set("ToolBlue", blue);



                $("#kolorn").val(red);
            },

            "click .fastColorButton": function(event) {
                var color = event.target.value;
                var colors = color.split("-");
                console.log(color);

                Session.set("ToolRed", parseInt(colors[0]));
                Session.set("ToolGreen", parseInt(colors[1]));
                Session.set("ToolBlue", parseInt(colors[2]));
                
                $('#red').slider("value", parseInt(colors[0]));
                $('#green').slider("value", parseInt(colors[1]));
                $('#blue').slider("value", parseInt(colors[2]));
            },

            "change #kolorn": function(event) {
                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("ToolRed", parseInt(colors[0], 16));
                Session.set("ToolGreen", parseInt(colors[1], 16));
                Session.set("ToolBlue", parseInt(colors[2], 16));

                $('#red').slider("value", red);
                $('#green').slider("value", green);
                $('#blue').slider("value", blue);


                $('#colorPicker').val(insertColor);
                
                
                Session.set("choosenColor", insertColor);

            },

            "change #colorPicker": function(event) {

                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("ToolRed", parseInt(colors[0], 16));
                Session.set("ToolGreen", parseInt(colors[1], 16));
                Session.set("ToolBlue", parseInt(colors[2], 16));

                $('#red').slider("value", red);
                $('#green').slider("value", green);
                $('#blue').slider("value", blue);

                $('#kolorn').val(insertColor);
            },
            
            "change #colorPickerBack":function(event){
                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("BackRed", parseInt(colors[0], 16));
                Session.set("BackGreen", parseInt(colors[1], 16));
                Session.set("BackBlue", parseInt(colors[2], 16));

                $('#red2').slider("value", red);
                $('#green2').slider("value", green);
                $('#blue2').slider("value", blue);

                $('#kolor2n').val(insertColor);
            },
            
            "change #kolor2n":function(event){
                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("BackRed", parseInt(colors[0], 16));
                Session.set("BackGreen", parseInt(colors[1], 16));
                Session.set("BackBlue", parseInt(colors[2], 16));

                $('#red2').slider("value", red);
                $('#green2').slider("value", green);
                $('#blue2').slider("value", blue);


                $('#colorPickerBack').val(insertColor);
                
                
            },
            
            "change #color3n":function(event){
                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("ShadowRed", parseInt(colors[0], 16));
                Session.set("ShadowGreen", parseInt(colors[1], 16));
                Session.set("ShadowBlue", parseInt(colors[2], 16));

                $('#red3').slider("value", red);
                $('#green3').slider("value", green);
                $('#blue3').slider("value", blue);
                
                $("#colorPickerShadow").value(insertColor);
            },
            "change #colorPickerShadow":function(event){
                var insertColor = event.target.value;

                var inColor = insertColor.replace("#", "");

                var colors = inColor.match(/.{1,2}/g);

                console.log(colors);

                var red = parseInt(colors[0], 16);
                var green = parseInt(colors[1], 16);
                var blue = parseInt(colors[2], 16)


                Session.set("ShadowRed", parseInt(colors[0], 16));
                Session.set("ShadowGreen", parseInt(colors[1], 16));
                Session.set("ShadowBlue", parseInt(colors[2], 16));

                $('#red3').slider("value", red);
                $('#green3').slider("value", green);
                $('#blue3').slider("value", blue);

                $('#color3n').val(insertColor);
            }
            

        });