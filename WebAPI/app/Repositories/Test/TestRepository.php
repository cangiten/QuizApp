<?php

namespace App\Repositories\Test;

use App\Models\Test;


class TestRepository implements TestRepositoryInterface
{
    protected $test;

    /**
    * @param object $test
    */
    public function __construct(Test $test)
    {
        $this->test = $test;
    }

    public function create(array $testResult){
        return $this->test->create($testResult);
    }

}