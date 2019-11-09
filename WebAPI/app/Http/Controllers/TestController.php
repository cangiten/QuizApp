<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Test\TestRepositoryInterface;

//use JWTAuth
use Tymon\JWTAuth\Facades\JWTAuth;

class TestController extends Controller
{

    private $repo;
    public function __construct(TestRepositoryInterface $testRepository)
    {
        $this->repo = $testRepository;
    }

    //受験結果登録の処理
    public function create(Request $request)
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['アクセス権がありません'], 404);
        }
        
        $response = $this->repo->create($request->all());

        return response()->json('受験結果の登録に成功しました', 201);
    }
}
