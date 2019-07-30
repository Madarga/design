'use strict'

function updateListSortables(){
    $( ".card" ).sortable({
        connectWith: ".card",
        items: ":not(.nodrag)",
        placeholder: "header-placeholder ui-corner-all",
        change: function() {
                var list = $(this).closest('.card');
                var anchorBottom = $(list).find('.anchorBottom');
                $(list).append($(anchorBottom).detach());
            }
    });
    
    $('input[name="addlist"]').unbind().keyup(function(event){
        modalButton();
        deleteCard();

        var cardTitleList = [];
        var counter=0;

        if(event.keyCode == "13"){
            //if($(this.val()))     If enter is pressed, alert
            var listTitle = $(this).val();
            $(this).before('<div class="insertedcard">' + listTitle + '<button type="button" class="close btn-sm" id="deleteCard"><span class="glyphicon glyphicon-trash"></span></button><button class="close btn btn-sm float-right mr-2" id="modalbutton"><span class="glyphicon glyphicon-list-alt"></span></button></div>');
            
            var listCardTitle = $(this).val();
            cardTitleList.push(listCardTitle);

            console.log(cardTitleList);
            
            $('#modaltitle').append(cardTitleList[counter]);

            $(this).dblclick(function(){
                console.log('maclick');
                //var editText = $(this).val();
                //console.log(editText)
                //var edit = $(this).attr('contenteditabe', true);
                //$(this).focus;

                console.log(edit);
            });

            modalButton();
            deleteCard();
            
            listTitle = $(this).val('');

            counter++;

        }
    });
    
    $('textarea')
}

function deleteList(){
    $('.close#closecard').click(function(){
        console.log("Delete List");
        $(this).parentsUntil($('.oversort')).remove();
    });
}

function deleteCard(){
    $('.close#deleteCard').click(function(){
        console.log("Delete Card");
        $(this).parentsUntil($('li')).remove();
    });
}

function modalButton(){
    $('.close#modalbutton').click(function(){
        console.log("Modal Button");
        $("#myModal").modal('show');
        $('#modaltitle')
    });
}

$(document).ready(function(){
    deleteList();
    updateListSortables();
    modalButton();
    $(".oversort").sortable({items: ":not(.nodrag)", placeholder: "header-placeholder" });

    $('input[name="newlistcard"]').keyup(function(event){
        if(event.keyCode == "13"){
            var card = $(this).val();
            $(this).after('<div class="card bg-warning"><h3 class="nodrag header text-white">' + card + '<button type="button" class="close float-right" id="closecard">x</button></h3><li class="class="d-flex justify-content-between list-unstyled"><input type="text" class="nodrag anchorBottom addlist" name="addlist" placeholder="+ New Card" /></li></div>');
            $(this).val('');
            updateListSortables();
            deleteList();
        }
    });
});