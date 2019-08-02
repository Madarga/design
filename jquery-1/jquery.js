'use strict'

var counter = 1;

$(document).ready(function(){
    var addBtn = $("#add-btn");

    $('#todo').keypress(function (event){
        var todo = $("#todo").val();

        if(event.keyCode == "13"){
            if(todo == ''){
                alert('Insert to do!');
            }else{
                addTemplate(todo);
                todo=$('#todo').val('');
            }
        }
    });

    $(addBtn).click(function(){
        var todo = $("#todo").val();

        if(todo == ''){
            alert('Insert to do!');
        }else{
            addTemplate(todo);
            todo=$('#todo').val('');
        }    
    });
});

function addTemplate(title){
    var title;
    var template;

    template = $("#container-2").append('<li id="hover-ele'+ counter +'" class="list-unstyled border-bottom"><input type="radio" id="radio'+ counter +'"value="Radio">&nbsp<span>' + title + '&nbsp</span>'+'&nbsp<button type="button" class="delete btn btn-danger float-right" id="delete'+counter+'"value="Delete">Delete</button>&nbsp<button type="button" class="btn btn-info float-right mr-2" id="edit'+ counter +'"value="Edit">Edit</button>'+'</li>');

    $('#hover-ele' + counter).mouseover(function(){
        $(this).find('button').css("visibility","visible");
    });

    $('#hover-ele' + counter).mouseout(function(){
        $(this).find('button').css("visibility","hidden");
    });

    $('#edit' + counter).click(function(){
        var edited = $(this).prev().prev().attr('contenteditable', 'true');
        $(this).prev().prev().focus();
                        
        $(edited).keydown(function (event){
            if(event.which == "13"){
                event.preventDefault();
                $(edited).blur();
                return false;
            }
        });
    });

    $('#delete' + counter).click(function(){
        $(this).parent().remove();
    });

    $('#radio' + counter).click(function(){
        $(this).next().css({"text-decoration": "line-through", "color":"#696969"});  
    });

    counter++;
};    