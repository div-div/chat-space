$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
          `<div class="chat-contents__box" data-message-id="${message.id}">
            <div class="chat-contents__box__top">
              <div class="chat-contents__box__top__name">
                ${message.user_name}
              </div>
              <div class="chat-contents__box__top__date">
                ${message.created_at}
              </div>
            </div>
            
            <div class="chat-contents__box__bottom">
              <div class="chat-contents__box__bottom__text">
                ${message.content}
              </div>
              <div class="chat-contents__box__bottom__image">
                <img src='${message.image}'>
              </div>
            </div>
          </div>`
      return html;
    } else {
      let html =
      `<div class="chat-contents__box" data-message-id="${message.id}">
        <div class="chat-contents__box__top">
          <div class="chat-contents__box__top__name">
            ${message.user_name}
          </div>
          <div class="chat-contents__box__top__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-contents__box__bottom">
          <div class="chat-contents__box__bottom__text">
            ${message.content}
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
  });

  // let reloadMessages = function(e) {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   let last_message_id = $('.chat-contents__box:last').data("message-id") || 0;
  //   console.log(last_message_id);
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/messages",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     console.log(messages)
  //     // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
  //     if (messages.length !== 0) {
  //       //追加するHTMLの入れ物を作る
  //       let insertHTML = '';
  //       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
  //       $.each(messages, function(i, message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       //メッセージが入ったHTMLに、入れ物ごと追加
  //       $('.chat-contents').append(insertHTML);
  //       $('.chat-contents').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  //  setInterval(reloadMessages, 7000);
});
