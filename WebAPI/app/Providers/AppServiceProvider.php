<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(
            \App\Repositories\Question\QuestionRepositoryInterface::class,
            \App\Repositories\Question\QuestionRepository::class
        );
        $this->app->bind(
            \App\Repositories\Test\TestRepositoryInterface::class,
            \App\Repositories\Test\TestRepository::class
        );
    }
}
