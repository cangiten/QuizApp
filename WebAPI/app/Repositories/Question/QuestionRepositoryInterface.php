<?php

namespace App\Repositories\Question;

interface QuestionRepositoryInterface
{
    /**
     * 質問を取得する
     *
     * @return object
     */
    public function getQuestions();

    /**
     * 質問を取得する
     *
     * @return object
     */
    public function getAnswers($questionIds);


}