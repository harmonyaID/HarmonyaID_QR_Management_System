<?php

namespace App\Http\Requests\File;

use Logia\Core\Validation\Support\FormRequest;

class UploadRequest extends FormRequest
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
            'file'  => ['required', 'file'],
            'group' => ['required', 'string'],
            'toWebp'=> ['nullable', 'bool']
        ];
    }
}
