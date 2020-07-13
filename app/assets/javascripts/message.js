$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-contents__box">
            <div class="chat-contents__box__top">
              <div class="chat-contents__box__top__name">
                ${message.user_name}
              </div>
              <div class="chat-contents__box__top__text">
                ${message.content}
              </div>
              <div class="chat-contents__box__top__image">
                <img class="chat-contents__box__top__image" src="${message.image}">
              </div>
            </div>
            <div class="chat-contents__box__bottom">
              <div class="chat-contents__box__bottom__date">
                ${message.created_at}
              </div>
            </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="chat-contents__box">
          <div class="chat-contents__box__top">
            <div class="chat-contents__box__top__name">
              ${message.user_name}
            </div>
            <div class="chat-contents__box__top__text">
              ${message.content}
            </div>

          </div>
          <div class="chat-contents__box__bottom">
            <div class="chat-contents__box__bottom__date">
              ${message.created_at}
            </div>
          </div>
        </div>`
      return html;
    };
  }
  $('.footer__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
        url: url, //同期通信でいう『パス』
        type: 'POST',  //同期通信でいう『HTTPメソッド』
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-contents').append(html);
      $('form')[0].reset();
      $('.chat-contents').animate({ scrollTop: $('.chat-contents')[0].scrollHeight});
      $(".footer__form__send").attr('disabled', false);
    })
    .fail(function() {
     alert("メッセージ送信に失敗しました");
    });
  })
});
