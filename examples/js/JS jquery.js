$(()=>{
    // ACORDION
    $(".accordion dt").on("click", function(e) {
      //$(this).next().show();  
       //$(this).next().taggle(); 
        //$(this).next().slideDown(); 
         //$(this).next().slideToggle();     
         $(this).next().slideDown()
         .sliblings("dd").slideUp();
    });

});