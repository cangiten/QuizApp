<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Repositories\Question\QuestionRepositoryInterface;

//use JWTAuth
use Tymon\JWTAuth\Facades\JWTAuth;

class QuestionController extends Controller
{

    private $repo;
    public function __construct(QuestionRepositoryInterface $qnRepository)
    {
        $this->repo = $qnRepository;
    }

    //質問を取得する処理
    public function getQuestions(Request $request)
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['アクセス権がありません'], 404);
        }
        $questions = $this->repo->getQuestions();
        return response()->json(compact('questions'));
    }

    //答えを取得する処理
    public function getAnswers(Request $request)
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['アクセス権がありません'], 404);
        }

        $questionIds = $request->json()->all();
        $answers = $this->repo->getAnswers($questionIds);
        return response()->json(compact('answers'));
    }

    //ユーザー登録の処理
    public function registTest(Request $request)
    {
        $user = Test::create([
            'user_id' => $request->json()->get('user_id'),
            'score' => $request->json()->get('score'),
            'timeSpent' => Hash::make($request->json()->get('timeSpent')),
        ]);

        return response()->json('受験結果の登録が成功しました', 201);
    }
}
