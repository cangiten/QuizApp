<?php

namespace App\Exceptions;

use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if($this->isHttpException($exception)) {
            return response()->json(
                $this->getJsonMessage($exception), 
                $this->getExceptionHTTPStatusCode($exception)
              );
          }

          if ($exception instanceof TokenExpiredException) {
            return response()->json(['error' => 'token_expired'], 408);
        } else if ($exception instanceof TokenInvalidException) {
            return response()->json(['error' => 'token_invalid'], 401);
        } else if ($exception instanceof JWTException) {
            return response()->json(['error' => 'token_absent'], 401);
        }
        return parent::render($request, $exception);
    }

    protected function getJsonMessage($e){
        //You may add in the code, but it's duplication
         return [
                   'status' => 'false',
                   'message' => $e->getMessage()
                ];
     }
 
     protected function getExceptionHTTPStatusCode($e){
        //Not all Exceptions have a http status code
        //We will give Error 500 if none found
         return method_exists($e, 'getStatusCode') ? 
                          $e->getStatusCode() : 500;
     }
}
