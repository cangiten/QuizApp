<?php

namespace App\Repositories\Test;

interface TestRepositoryInterface
{
    /**
     * 受験結果を登録する
     * @param array $testResult
     * @return object
     */
    public function create(array $testResult);

}