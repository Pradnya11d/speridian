$(function(){
  $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') ) {
          $(this).collapse('hide');
      }
  });
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      if($(this).children('i').hasClass('fa-caret-square-o-left')){
          $(this).children('i').removeClass('fa-caret-square-o-left');
          $(this).children('i').addClass('fa-caret-square-o-right');
          //$('#brand-name-toggle').removeClass('hidden');
          //$('#brand-name').addClass('hidden');
      }
      else{
          $(this).children('i').removeClass('fa-caret-square-o-right');
          $(this).children('i').addClass('fa-caret-square-o-left');            
          //$('#brand-name').removeClass('hidden');
          //$('#brand-name-toggle').addClass('hidden');
      }
  });
  /*
  $('.sidebar-nav > .sidebar-item').on('click', function(e){
      e.preventDefault();
      console.log($(this).attr('mylocation'));
      window.location = $(this).attr('mylocation');
  });
  $('.sidebar-nav > .sidebar-subitem').on('click', function(e){
      e.preventDefault();
      console.log($(this).attr('mylocation'));
      window.location = $(this).attr('mylocation');            
  });

  $('.hiddennav > li > a').on('click', function(e){
      e.preventDefault();
      console.log($(this).attr('href'));
      window.location = $(this).attr('href');
  });
  */  
});
