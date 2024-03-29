<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
    * Get all of the posts for the user.
    */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
    * Get all of the likes for the user
    */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
