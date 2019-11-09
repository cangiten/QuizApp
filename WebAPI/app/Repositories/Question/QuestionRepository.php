<?php

namespace App\Repositories\Question;

use App\Models\Question;
use Illuminate\Support\Collection;


class QuestionRepository implements QuestionRepositoryInterface
{
    protected $question;

    /**
     * @param object $question
     */
    public function __construct(Question $question)
    {
        $this->question = $question;
    }

    /**
     * 質問を取得する
     *
     * @return object
     */
    public function getQuestions()
    {
        $questions = $this->question::all()->random(10);
        $random = $questions->random($questions->count());

        $jsonQuestions = new Collection();
        foreach ($random as $question) {
            $q = [
                'QnID'         => (int) $question->QnId,
                'Qn'           => $question->Qn,
                'ImageName'    => $question->ImageName == null ? '' : $question->ImageName,
                'Options'     => [
                    $question->Option1, $question->Option2, $question->Option3, $question->Option4
                ]
            ];
            $jsonQuestions->push($q);
        }
        return $jsonQuestions->shuffle()->all();
    }


    /**
     * 質問番号をもとに該当する答えを取得する
     *
     * @return object
     */
    public function getAnswers($questionIds)
    {
        $answers = $this->question::whereIn('QnId', $questionIds)
            ->pluck('Answer')
            ->toArray();
            
        //質問表示順に応じて、該当する答えをソートする
        /*
         例:  質問表示順       　　　答え取得順
                                 
         　 [0]:3 ---> 3目質問      [0]:4 ---> 1目質問の答え
            [1]:1 ---> 1目質問      [1]:2 ---> 2目質問の答え
            [2]:2 ---> 2目質問      [2]:3 ---> 3目質問の答え

            出力結果:
                [0]:4
                [1]:2
                [2]:3
        */
        $results = [];
        foreach ($questionIds as $key => $value) {
            $results[$key] = $answers[$value - 1];
        }
        return $results;
    }
}
