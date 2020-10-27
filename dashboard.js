
$(document).ready(() => {
    refreshTable('homol');
})


var myFonction = function (event) {
    var env = event.target.closest(".btn-left").innerHTML;
    console.log(env)
    refreshTable(env);
};

function getJdd() {

}


function refreshTable(env) {
    $("#tableau").empty();
    $.ajax({
        url: "http://localhost:1234/getRefs",
        method: 'POST',
        data: { 'env': env },
        success: function (response) {
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    var creator = response[index].creator;
                    var lastname = response[index].lastname;
                    var debit_type = response[index].debit_type;
                    var card_type = response[index].card_type;
                    var total = response[index].total;
                    var cols = '<div class="uneLigne">';
                    cols += '  <div class="Lcase w300">' + creator + '</div>';
                    cols += '  <div class="Lcase w300">' + lastname + '</div>';
                    cols += '  <div class="Lcase w300">' + debit_type + '</div>';
                    cols += '  <div class="Lcase w300">' + card_type + '</div>';
                    cols += '  <div class="Lcase w60">' + total + '</div>';
                    cols += '  <div style="padding-right: 5px; cursor: pointer;" class="Lcase w40"><img width="30px" height="30px"';
                    cols += '    src="images/dlicon.png"></div>';
                    cols += '  </div>';
                    cols += '</div>';
                    var newRow = $('<div class="globLigne">');
                    newRow.append(cols);
                    $("#tableau").append(newRow);
                }

            }
            else {
                var newRow = $('<div class="globLigne">');
                cols += '  <div class="Lcase w300">Il n\'y a pas de jeux de données ici</div>';
                newRow.append(cols);
                $("#tableau").append(newRow);
            }
        }
    })
}

