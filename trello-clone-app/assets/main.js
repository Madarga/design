'use strict'

function sortCard(){
	$("li").sortable({
        connectWith: "li",
  });
}


function deleteList(){
	$('#closecard').click(function(){
		console.log("Delete List");
		$(this).parentsUntil($('.container-fluid')).remove();
	});
}


function addCard(){
	$('#addcard').keypress(function(event){
		if(event.keyCode == "13"){
			var cardTitle = $(this).val();
            
      if(cardTitle == ''){  
        alert("Enter Card Name!");
      }else{
        var cardTpl = `
        <div class="insertedcard d-flex" id="">
        <span class="cardspan mr-auto p-2 w-100">${cardTitle}</span>
        <input type="text" class="editedtitle" value="${cardTitle}" name="title"/>
        <button class="btn-card-link close btn btn-sm ml-1 mr-0" data-title="${cardTitle}">
        <span class="glyphicon glyphicon-list-alt"></span></button>
        <button type="button" class="close btn-sm ml-2" id="deleteCard">
        <span class="glyphicon glyphicon-trash"></span></button></div>
        `;

        $(this).before(cardTpl)
      }

      editCardTitle();
      deleteCard();
      sortCard();
      openModal();

      cardTitle = $(this).val('');
		}
	});
}


function editListTitle(){
  console.log('edit list.....');

  $('.ltitle').click(function(event){
    var editedlist = $(this).attr('contenteditable', 'true');
    $(this).attr('focus');

    $('.ltitle[contenteditable]').keypress(function(event){
      if(event.keyCode == "13"){
        $(editedlist).blur();
        console.log(editedlist.text());
        event.isImmediatePropagationStopped();
        return false;
      }
    });
  });
}


function editCardTitle(){
  $('.insertedcard').on('click', function(){
    var editc = $(this).addClass('edit');

    console.log('koko');
    
    $('.editedtitle').keypress(function(event){
      if(event.keyCode == '13'){
        var editCard = $(this).val();
        $(this).css('border', 'none');
        $(this).blur();

        $(".btn-card-link").click(function(){
          $("#myModal").modal('show');
          var newTitle = $(this).data('title');
          $(this).data('title', editCard);
          var titlec = $(this).data('title');
          console.log(titlec);
          $('#modaltitle').text(titlec);
        });
      }
    })
  }).on('click', 'button', function(event){
    event.stopPropagation();
  });
}


function deleteCard(){
	$('.close#deleteCard').click(function(){
		console.log("Delete Card");
		$(this).parentsUntil('li').remove();
	});
}


function openModal(){
	$(".btn-card-link").click(function(){
    $("#myModal").modal('show');
    var title= $(this).data('title');
    console.log(title);
    $('#modaltitle').text(title);
  });
}


$(document).ready(function () {
  addCard();
  deleteList();
  deleteCard();
  openModal();
  sortCard();

  $('#list').keypress(function (event) {
    editListTitle();
    
    if (event.keyCode == "13") {
      var listTitle = $(this).val();
            
      if (listTitle == '') {
        alert('Enter List Name!');
      }
      else {
        var newList = `
        <div class="card bg-warning p-2 mt-5 mr-5">
        <div class="card-title bg-warning pt-0 pb-0 d-flex justify-content-between">
        <h3 class="ltitle text-white">${listTitle}</h3>
        <button type="button" class="close float-right" id="closecard">x</button>
        </div><li class="list-unstyled">
        <input type="text" class="addlist mt-3 p-2 w-100" name="addlist" id="addcard" placeholder="+ New Card" /></li></div>
        `;

        $(this).after(newList);

        listTitle = $(this).val('');
        addCard();
        deleteList();
        deleteCard();
        openModal();
        sortCard();
        editListTitle();;
      }
    }
  });
});
