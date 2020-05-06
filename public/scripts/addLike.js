function like(e) {
    $.ajax({
        type: 'POST',
        url: "/home/like",
        data: { id: e, },
        success: function (data) {
            //alert("Curtiu! " + e);
            location.reload();
        },
        erro: function (ex) {
            alert('Falha ao curtir post!' + ex);
        }
    });
}