<?php

namespace App\Http\Requests\Account;

use Logia\Core\Validation\Support\FormRequest;

class CreateUsageCategoryRequest extends FormRequest
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
            'name'  => ['required', 'string'],
            'icon'  => ['required', 'string'],
        ];
    }
}
