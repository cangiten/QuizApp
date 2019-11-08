<?php

namespace App\Repositories\Test;

interface TestRepositoryInterface
{
    /**
     * 
     * @param array $user
     * @return object
     */
    public function create(array $testResult);

}