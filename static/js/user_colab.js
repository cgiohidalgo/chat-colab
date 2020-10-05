//consulta();
$(function () {
  $("#chat-container")
    .parents("#main_container")
    .addClass("main_container_parent");
  $("body").css("background-color", "#f2f2f2");
  $("#task .problem").css("z-index", "0");
});

function appendChat() {
  var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
  $("#toggleIcon").toggleClass("fa fa-angle-double-down fa fa-angle-double-up");
  $("#wrapper-chat").toggleClass("toggled");

  if (isIE11) {
    if ($("#wrapper-chat").hasClass("toggled")) {
      $("#sidebar-wrapper").css("margin-left", "-268px");
    } else {
      $("#sidebar-wrapper-chat").css("margin-left", "-250px");
    }
  }
}

function consulta() {
  let url =
    "/plugins/un_colab/api/score_task_user?" +
    $.param({ course_id: "group-5", task_id: "triangle" });
  fetch(url)
    .catch((error) => console.error("ErrorS:", error))
    .then((result) => {
      console.log(result);
    });
}

function consulta2() {
  $.get(
    "/plugins/un_colab/api/score_task_user",
    {
      course_id: "group-5",
    },
    function (files) {
      console.log("entró");
    },
    "json"
  );
}
