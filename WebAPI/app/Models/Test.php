<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',"score","timeSpent"
    ];

    /**
     * ユーザーIdに紐づくを取得する.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
