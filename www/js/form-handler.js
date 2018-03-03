(function () {
var count;
var count1;
  function init(){
    $('#submitButton').click(submitButtonHandler);
  count=0;
  count1=0;
   
      
  }
  $("#addservices").click(function(){
    alert(count);
    $("#servicelist").append("<input type=\"text\" id=\"services1"+String(count)+"\" name=\"services"+String(count)+"\">");
      count++;
 });

 $("#vehicles").click(function(){
 // alert(count1);
  $("#vehicledet").append("<input type=\"text\" id=\"vehicletype1"+String(count1)+"\" name=\"vehicletype"+String(count1)+"\"   placeholder=\"Type of Vehicle\">  <input type=\"text\" id=\"vehiclemake1"+String(count1)+"\" name=\"vehiclemake"+String(count1)+"\"   placeholder=\"Make of Vehicle\"><input type=\"text\" id=\"vehicleservice1"+String(count1)+"\" name=\"vehicleservice"+String(count1)+"\"   placeholder=\"Type of Service\">");
    count1++;
});
  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');

      var string="";
      for(var i=0;i<count;++i)
      {

        string=string+","+document.getElementById("services1"+String(i)).value ;
      }
      var ans=[];
      var ansf={};
      for(var i=0;i<count1;++i)
      {
        ans[i]=JSON.stringify({type:document.getElementById("vehicletype1"+String(i)).value,
        make:document.getElementById("vehiclemake1"+String(i)).value,
        service : document.getElementById("vehicleservice1"+String(i)).value
      
      });
      }
      for(var i=0;i<count1;++i)
      {
          ansf[i]=ans[i];
      }

      alert(ansf);
      //make the AJAX call
      $.ajax({
        url: '/form',
        type: 'POST',
        data: {
          Oname: testForm.OName.value,
          SPname: testForm.SPName.value,
          Smartphone: testForm.Smartphone.value,
          pno: testForm.pno.value,
          altpno: testForm.altpno.value,
          location: testForm.location.value,
          otime: testForm.otime.value,
          ctime: testForm.ctime.value,
          estyear: testForm.estyear.value,
          services:string,
          vehicles:ansf

        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    var $data = $('#post-results-container .data');

    //reset the UI
    $data.html('');
    $('.ajaxLoader').hide();

    //update the UI with the data returned from the AJAX call 
    $.each(jsonData, function (key, val) {
      $data.append('<li><b>' +  key + '</b>'   + val + '</li>');
    });

    $('#post-results-container').fadeIn();
  };

//init on document ready
$(document).ready(init);
})();