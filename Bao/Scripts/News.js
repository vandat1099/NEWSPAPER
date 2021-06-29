/// <reference path="jquery-3.4.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});
//Load data in function
function loadData() {
    $.ajax({
        url: "/News/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Avartar + '</td>';
                html += '<td>' + item.Sapo + '</td>';
                html += '<td>' + item.Description + '</td>';
                html += '<td>' + item.Category_Id + '</td>';
                html += '<td>' + item.Createdate + '</td>';
                html += '<td>' + item.ModifyDate + '</td>';
                html += '<td>' + item.Active + '</td>';
                html += '<td><a href = "#" onclick = "return getbyId(' + item.Id + ')">Edit</a>|<a href="Category/Delete?Id=' + item.Id + '">Delete</a></td >';
                html += '</tr>';
            });
            $('.tbody').html(html);
        }
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var NewsObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Avartar: $('#Avartar').val(),
        Sapo: $('#Sapo').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
        Category_Id('#Category_Id').val(),
        Createdate: $('#Createdate').val(),
        ModifyDate: $('ModifyDate').val()
    };
    $.ajax({
        url: "/News/Add",
        data: JSON.stringify(cateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Id
function getbyId(newsId) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Avartar').css('border-color', 'lightgrey');
    $('#Sapo').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Catagory_Id').css('border-color', 'lightgrey');
    $('#Createdate').css('border-color', 'lightgrey');
    $('#ModifyDate').css('border-color', 'lightgrey');
    $.ajax({
        url: "/News/getbyId/" + newsId,
        type: "GET",
        contentType: "application/json;chaset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Avartar').val(result.Avartar);
            $('#Sapo').val(result.Sapo);
            $('#Description').val(result.Description);
            $('#Active').val(result.Active);
            $('Category_Id').val(result.Category_Id);
            $('ModifyDate').val(result.ModifyDate = Date.now);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


//function for editting category's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var newsObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Avartar: $('#Avartar').val(),
        Sapo: $('#Sapo').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
        Category_Id('#Category_Id').val(),
        Createdate: $('#Createdate').val(),
        ModifyDate: $('ModifyDate').val()
    };
    $.ajax({
        url: "/News/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModel').modal('hiden');
            $('#Name').val("");
            $('#Avartar').val("");
            $('#Sapo').val("");
            $('#Description').val("");
            $('#Active').val("");
            $('#Category_Id').val("");
            $('#Cretedate').val("");
            $('#ModifyDate').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting category's record
function Delete(Id) {
    debugger
    var ans = confirm("bạn thật sự muốn xóa danh mục này?");
    if (ans) {
        $.ajax({
            url: "/News/Delete",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: {
                Id: Id
            },
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Slug').val("");
    $('#ParentId').val("");
    $('#Active').val("");
    $('#Createdate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Slug').css('border-color', 'lightgrey');
    $('#ParentId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Createdate').css('border-color', 'lightgrey');
}

//Validation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Avartar').val().trim() == "") {
        $('#Avartar').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Avartar').css('border-color', 'lightgrey');
    }
    if ($('#Sapo').val().trim() == "") {
        $('#Sapo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Sapo').css('border-color', 'lightgrey');
    }
    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    if ($('#Active').is('checked')) {
        $('#Active').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Active').css('border-color', 'lightgrey');
    }
    if ($('#Category_Id').val().trim() == "") {
        $('#Category_Id').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Category_Id').css('border-color', 'lightgrey');
    }
    if ($('#Createdate').val().trim() == "") {
        $('#Createdate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Createdate').css('border-color', 'lightgrey');
    }
    if ($('#ModifyDate').val().trim() == "") {
        $('#ModifyDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ModifyDate').css('border-color', 'lightgrey');
    }
    return isValid;
}