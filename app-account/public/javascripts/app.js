$(function() {

  $('.placa').mask("aaa9999").on('blur', function() {
    this.value = this.value.toUpperCase();
  })

  $('.x-number').mask("9?999999999999999");

  $('.x-money').maskMoney({thousands:'', decimal:'.'});
  
  $('.x-datetime').mask("99/99/9999 99:99");

  //data_tables();

});