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
                var cardTitleArray = [];
                var desArray = [];
                cardTitleArray.push(cardTitle);
                
                for(var i=0; i<cardTitleArray.length; i++){
                    $(this).before('<div class="insertedcard d-flex" id="cardId'+ i +'"><span id="cardspanid'+ i +'" class="cardspan mr-auto p-2 w-100">' + cardTitleArray[i] + '</span><button class="close btn btn-sm ml-1 mr-0" id="modalbutton'+ i +'"><span class="glyphicon glyphicon-list-alt"></span></button><button type="button" class="close btn-sm ml-2" id="deleteCard"><span class="glyphicon glyphicon-trash"></span></button></div>');
                    
                    console.log(cardTitleArray[i]);

                    $('#modaltitle').text(cardTitleArray[i]);

            
                    $('.close#modalbutton' + i).click(function(){
                        $("#myModal").modal('show');
                        
                        $('#modaltitle').text(cardTitleArray[i]); //murag tama man ni naevent, dile lang gyud siya magappend

                        $('.desaddbtn').click(function(){
                            var description = $('#des').val();
                            desArray.push($('#des').val());
                            console.log(desArray[i]);
                        });
                    });

                    cardTitle = $(this).val('');
                }

                deleteList();
                deleteCard();
                sortCard();
                editCardTitle();
                addDescription();
                        
                cardTitle = $(this).val('');
                counter++;
            }
		}
	});
}


function getDescription(){
    var getd = $('#des').text();
    console.log(getd);
}


function editListTitle(){
    $('.ltitle').click(function(event){ 
        var editedlist = $(this).attr('contenteditable', 'true');
        $(this).attr('focus');

        $('.ltitle[contenteditable]').keypress(function(event){
            if(event.keyCode == "13"){
                $(editedlist).blur();
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
	$('.close#modalbutton' + counter).click(function(){
        console.log("Modal Button");
        $("#myModal").modal('show');
        Description();
        counter++;
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
                $('container-2').append($(this).after('<div class="card bg-warning p-2 mt-5 mr-5"><div class="card-title bg-warning pt-0 pb-0 d-flex justify-content-between"><h3 class="ltitle text-white">' + listTitle + '</h3><button type="button" class="close float-right" id="closecard">x</button></div><li class="list-unstyled"><input type="text" class="addlist mt-3 p-2 w-100" name="addlist" id="addcard" placeholder="+ New Card" /></li></div>'));
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
                editListTitle();;
            }
        }
    });
});
