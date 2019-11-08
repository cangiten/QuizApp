<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */
   
    //クッキーの送信およびBasic認証の許可
    'supportsCredentials' => false,
    //許可するドメイン
    'allowedOrigins' => ['*'],
    //許可するドメインを正規表現で指定
    'allowedOriginsPatterns' => [],
    //許可するヘッダー
    'allowedHeaders' => ['*'],
    //許可するメソッド
    'allowedMethods' => ['*'],
    //レスポンスに含めるカスタム HTTP ヘッダ
    'exposedHeaders' => [],
    //プリフライトリクエストの結果をキャッシュできる期間
    'maxAge' => 0,

];
