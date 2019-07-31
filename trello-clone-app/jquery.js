'use strict'
        
var counter = 0;

function sortCard(){
    var last = $("li").last();
	$("li").sortable({
        connectWith: "li",
        //cancel: last
    });
}
        
function deleteList(){
	$('.close#closecard').click(function(){
		console.log("Delete List");
		$(this).parentsUntil($('.container')).remove();
	});
}

function addCard(){
	$('#addcard').keypress(function(event){
		if(event.keyCode == "13"){
			var cardTitle = $(this).val();

            if(cardTitle == ''){
                alert("Enter Card Name!");
            }else{
                var cardTitleArray = [];
                cardTitleArray.push(cardTitle);
                $(this).before('<div class="insertedcard"><span class="cardspan">' + cardTitleArray + '</span><button type="button" class="close btn-sm" id="deleteCard"><span class="glyphicon glyphicon-trash"></span></button><button class="close btn btn-sm float-right mr-2" id="modalbutton"><span class="glyphicon glyphicon-list-alt"></span></button></div>');

                //jQuery.each(cardTitleArray, function(i, val){
                //    var arraylist = cardTitleArray.slice(counter);
                //    $('#modaltitle').append(arraylist);
                //    val = '';
                //});

                cardTitleArray.forEach(myFunction)

                function myFunction(item, index, arr){
                    $('#modaltitle').append(arr[index]);
                }

                console.log($('.cardspan').val());

                deleteList();
                deleteCard();
                openModal();
                sortCard();
                editCardTitle();
                addDescription();
                        
                cardTitle = $(this).val('');
                counter++;
            }
		}
	});
}

function editListTitle(){
    $('.ltitle').click(function(event){ 
        $(this).attr('contenteditable', 'true');
        $(this).attr('focus');

        $('.ltitle[contenteditable]').keypress(function(event){
            if(event.keyCode == "13"){
                return false;
                event.isImmediatePropagationStopped();
            }
        });
    });
}

function editCardTitle(){
    $('.cardspan').on('click', 'span', function(event){
        event.stopPropagation();
        $('#this').attr('contenteditable', 'true');
        $('#this').attr('focus');
        console.log("Edit Card Title");
    });
}

function deleteCard(){
	$('.close#deleteCard').click(function(){
		console.log("Delete Card");
		$(this).parentsUntil($('li')).remove();
	});
}

function openModal(){
	$('.close#modalbutton').click(function(){
		console.log("Modal Button");
		$("#myModal").modal('show');
		$('#modaltitle')
	});
}
        
function addDescription(){
    $('.desaddbtn').click(function(){
        var description = $('#des').val();
        console.log($('#des').val());
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
                $('container-2').append($(this).after('<div class="card bg-warning p-2 mt-5"><div class="card-title bg-warning pt-0 pb-0 d-flex justify-content-between"><h3 class="ltitle text-white">' + listTitle + '</h3><button type="button" class="close float-right" id="closecard">x</button></div><li class="list-unstyled"><input type="text" class="addlist mt-3 p-2 w-100" name="addlist" id="addcard" placeholder="+ New Card" /></li></div>'));
                listTitle = $(this).val('');
                addCard();
                deleteList();
                deleteCard();
                openModal();
                sortCard();
                $('#list').keypress(function (event) {
                    if (event.keyCode == "13") {
                        event.isImmediatePropagationStopped();
                    }
                });
                editListTitle();
            }
        }
    });
});
