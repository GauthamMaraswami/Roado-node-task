(function () {
var count;
var count1;
var countofvehicles;
var countofservices;
var searchele;
var latsearch;
var longsearch;
var dist;
  function init()
  {
    $('#submitButton').click(submitButtonHandler);
    count=0;
    count1=0; 
    $('#Delete_Record').fadeOut();
    $('#Update_Record').fadeOut();
    $('#addvehicleupdate').fadeOut();
    $('#addservicesupdate').fadeOut();
    $('#submitupdate').fadeOut();
   }
  
  $("#searchforentry").click(function()
  {
    $('#update_details_container').fadeOut();
    searchele=parseInt(document.getElementById('search').value);
    $.ajax({
      url: '/search',
      type: 'post',
      data:{ 
        query:searchele
      },
      success: 
        getSuccessHandler
    });
  });

  $("#searchservice").click(function()
  {
    latsearch=document.getElementById('latitudesearch').value;
    longsearch=document.getElementById('longitudesearch').value;
    dist=document.getElementById('distancelocal').value;
    $.ajax({
      url: '/searchlocality',
      type: 'post',
      data:{ 
        latsearch:latsearch,
        longsearch:longsearch,
        dist:dist
      },
      success:
      Searchresult
    });
  });
  
  $("#Delete_Record").click(function(){
    $('#post-results-container1').fadeOut();
    $('#update_details_container').fadeOut();
    $('#Delete_Record').fadeOut();
    $('#Update_Record').fadeOut();
    searchele=parseInt(document.getElementById('search').value);
    $.ajax({
      url: '/delete',
      type: 'post',
      data:{ 
        query:searchele
      },
    });
    alert("successful");
    //alert(searchele);*/
  });

var json_for_update;
  $("#Update_Record").click(function(){
   updateContainer();
  });

  $("#addservices").click(function(){
    $("#servicelist").append("<input type=\"text\" id=\"services1"+String(count)+"\" name=\"services"+String(count)+"\">");
      count++;
 });

 $("#vehicles").click(function(){
  $("#vehicledet").append("<input type=\"text\" id=\"vehicletype1"+String(count1)+"\" name=\"vehicletype"+String(count1)+"\"   placeholder=\"Type of Vehicle\">  <input type=\"text\" id=\"vehiclemake1"+String(count1)+"\" name=\"vehiclemake"+String(count1)+"\"   placeholder=\"Make of Vehicle\"><input type=\"text\" id=\"vehicleservice1"+String(count1)+"\" name=\"vehicleservice"+String(count1)+"\"   placeholder=\"Type of Service\">");
    count1++;
});


$("#addvehicleupdate").click(function(){
  $("#updatevehicles").append("<input type=\"text\" id=\"vehicletype2"+String(countofvehicles)+"\" name=\"vehicletype"+String(countofvehicles)+"\"   placeholder=\"Type of Vehicle\">  <input type=\"text\" id=\"vehiclemake2"+String(countofvehicles)+"\" name=\"vehiclemake"+String(countofvehicles)+"\"   placeholder=\"Make of Vehicle\"><input type=\"text\" id=\"vehicleservice2"+String(countofvehicles)+"\" name=\"vehicleservice"+String(countofvehicles)+"\"   placeholder=\"Type of Service\">");
  ++countofvehicles;
 });

 $("#addservicesupdate").click(function(){
  $("#updateservices").append('<input type="text" id="services1'+String(countofservices)+'" placeholder="Type of service" name="services'+String(countofservices)+'"> ');
  ++countofservices;
 });
 $("#submitupdate").click(function(){
      $('#post-results-container1').fadeOut();
      $('#update_details_container').fadeOut();
      var servicesjson=[];
      var updateForm = document.getElementById('updateForm');
      for(var i=0;i<countofservices;++i)
      {
        servicesjson[i]=JSON.stringify({service:document.getElementById("services1"+String(i)).value });
      }
      var ans=[];
      var ansf={};
      for(var i=0;i<countofvehicles;++i)
      {
        ans[i]=JSON.stringify({type:document.getElementById("vehicletype2"+String(i)).value,
        make:document.getElementById("vehiclemake2"+String(i)).value,
        service : document.getElementById("vehicleservice2"+String(i)).value
      
      });
      }
      for(var i=0;i<countofvehicles;++i)
      {
          ansf[i]=ans[i];
      }
      var position=[];
    position[0]=parseFloat(document.getElementById("location1").value);
    position[1]=parseFloat(document.getElementById("location2").value);
      alert(document.getElementById("Oname").value);
      //make the AJAX call
      $.ajax({
        url: '/update',
        type: 'POST',
        data: {
          id: searchele,
          Oname: document.getElementById("Oname").value,
          SPname: document.getElementById("SPname").value,
          Smartphone: document.getElementById("Smartphone").value,
          pno: document.getElementById("pno").value,
          altpno: document.getElementById("altpno").value,
          location1: document.getElementById("location1").value,
          location2: document.getElementById("location2").value,
          position:position,
          otime: document.getElementById("otime").value,
          ctime: document.getElementById("ctime").value,
          estyear: document.getElementById("estyear").value,
          countofservices:countofservices,
          services:servicesjson,
          countofvehicles:countofvehicles,
          vehicles:ansf
          }
      });
 });


  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');
      evt.preventDefault();
      evt.stopPropagation();
      $('#post-results-container').fadeOut();
      $('#post-results-container1').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');
      var servicesjson=[];
      for(var i=0;i<count;++i)
      {
        servicesjson[i]=JSON.stringify({service:document.getElementById("services1"+String(i)).value });
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
      var position=[];
      position[0]=parseFloat(document.getElementById("location1").value);
      position[1]=parseFloat(document.getElementById("location2").value);
      $.ajax({
        url: '/form',
        type: 'POST',
        data: {
          Oname: testForm.OName.value,
          SPname: testForm.SPName.value,
          Smartphone: testForm.Smartphone.value,
          pno: testForm.pno.value,
          altpno: testForm.altpno.value,
          location1: testForm.location1.value,
          location2: testForm.location2.value,
          position:position,
          otime: testForm.otime.value,
          ctime: testForm.ctime.value,
          estyear: testForm.estyear.value,
          services:servicesjson,
          countofvehicles:count1,
          countofservices:count,
          vehicles:ansf
        },
        success: postSuccessHandler
      });
  }
  function postSuccessHandler (jsonData) {
    var $data = $('#post-results-container .data');
    $data.html('');
    $('.ajaxLoader').hide();
    $.each(jsonData, function (key, val) {
      $data.append('<li><b>' +  key + '</b>'   + val + '</li>');
    });
    $('#post-results-container').fadeIn();
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

function updateContainer () {
  $('#post-results-container1').fadeOut();
  $('#addvehicleupdate').fadeIn();
  $('#addservicesupdate').fadeIn();
  $('#submitupdate').fadeIn();
  var jsonData= json_for_update;
  var $data = $('#update_details_container .data');
  $data.html('');
  $.each(jsonData, function (key, val) {
    if(key=="_id"||key=="position")
    {

    }
    else if(key=="countofvehicles")
    {
      countofvehicles=val;
    }
    else if(key=="countofservices")
    {
      countofservices=val;
    }
    else if(key=="services")
    {
      alert(countofservices);
      $data.append('<div id="updateservices">');
      for(var i=0;i<countofservices;++i)
      {
        var servicess=JSON.parse(val[i]);
        alert(servicess.service);
          $data.append('<input type="text" id="services1'+String(i)+'" placeholder="Type of service" name="services'+String(i)+'" value="'+servicess.service+'"> ');
         }
      $data.append('</div>');
    }
    else if(key=="vehicles")
    {
      $data.append('<div id="updatevehicles">');
      for(var i=0;i<countofvehicles;++i)
      {
        var vehicles1=JSON.parse(val[i]);
          $data.append('<input type="text" id="vehicletype2'+String(i)+'" name="vehicletype'+String(i)+'" placeholder="Type of Vehicle " value="'+vehicles1.type+'"   >  ');
          $data.append('<input type="text" id="vehiclemake2'+String(i)+'" name="vehiclemake'+String(i)+'" placeholder="Make of Vehicle " value="'+vehicles1.make+'"   >  ');
          $data.append('<input type="text" id="vehicleservice2'+String(i)+'" name="vehicleservice'+String(i)+'" placeholder="Type of Service " value="'+vehicles1.service+'"   >  ');
      }
      $data.append('</div>');     
    }
  else{
    $data.append('<label>'+key+':</label><input type="text" id= "'+key+'"name="'+key+'" value="'+val+'">');
    }
  });
  $('#update_details_container').fadeIn();
};


function Searchresult (jsonData) {
  var $data = $('#searchResult .data');
$data.append('<p>Here is the data you searched:</p>');
  $data.html('');
  $('.ajaxLoader').hide();
  $.each(jsonData, function (key, val) {
    $data.append('<li><label>' +  key + ':'   + val + '</label></li>');
  });
};
  function getSuccessHandler (jsonData) {
    $('#Delete_Record').fadeIn();
    $('#Update_Record').fadeIn();
    json_for_update=jsonData;
    var $data = $('#post-results-container1 .data');
   $data.html('');
   $data.append('<p>Here is the data found:</p>');
   if(isEmpty(jsonData))
    {
      $data.append('<li>empty</li>');
    }
  else{
    $.each(jsonData, function (key, val) {
      $data.append('<li><label>' +  key + ':    '   + val + '</label></li>');
    
    });
  }
    $('#post-results-container1').fadeIn();

  };
$(document).ready(init);
})();