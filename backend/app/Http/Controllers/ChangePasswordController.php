<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
       return $this->getPasswordResetTableRow($request)
       ->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }
    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')
        ->where(['email'=>$request->email,'token'=>$request->resetToken]);
    }   
    private function changePassword($request)
    {
        $user=User::whereEmail($request->email)->first();
        $user->update(['password'=>$request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json([
            'data'=>'Password successfully changed'
        ],Response::HTTP_CREATED);
    }
    private function tokenNotFoundResponse()
    {
        return response()->json([
            'error'=>'Token or Email is Incorrect'
        ],Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
