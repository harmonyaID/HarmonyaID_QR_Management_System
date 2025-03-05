<?php

namespace App\Http\Requests\Misc;

use Logia\Core\Validation\Support\FormRequest;

class FaqRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'question'  => ['required', 'string'],
            'answer'    => ['required', 'string'],
        ];
    }
}
