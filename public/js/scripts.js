window.addEventListener('DOMContentLoaded', event => {
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//Barra de busqueda de Teclers
var Buscador = $("#content-search").DataTable();

$("#search").keyup(function () {
  Buscador.search($(this).val()).draw();
  
  if($("#search").val() == ""){
    $(".content-search".fadeOut(300));
  }else{
    $(".content-search".fadeIn(300));
  }
})

