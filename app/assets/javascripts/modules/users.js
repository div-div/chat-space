$(function(){
  function addUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;

    $("#UserSearchResult").append(html);
  }

  function addNoUser() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
  function  addChatMenber(user_name, user_id){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${user_name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${user_id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html)
  }

  $("#UserSearch__field").on("keyup", function(){
    let input = $("#UserSearch__field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users){

      $("#UserSearchResult").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          addUser(user);
        })
      } else if(users.length == 0) {
          addNoUser();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })
  $("#UserSearchResult").on('click', '.ChatMember__add', function(){
     user_name = $(this).attr("data-user-name");
     user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    addChatMenber(user_name, user_id);
  });
  $(".ChatMembers").on('click', ".ChatMember__remove", function(){
  $(this).parent().remove();
  });
})
