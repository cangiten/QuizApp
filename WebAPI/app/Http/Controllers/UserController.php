<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
//use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    //ユーザー登録の処理
    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json('登録済みのメールアドレスです。', 400);
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    //ログイン処理
    public function login(Request $request)
    {
        $credentials = $request->json()->all();

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json('メールアドレス又はパスワードが間違っています', 400);
            }
        } catch (JWTException $e) {
            return response()->json('トークンが生成されない', 500);
        }

        return response()->json(compact('token'));
    }

    //認証確認
    public function getAuthenticatedUser()
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json('アクセス権がありません', 404);
        }
        $tests = $user->tests;
        return response()->json(compact('user'));
    }
}
