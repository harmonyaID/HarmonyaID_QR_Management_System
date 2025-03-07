<?php

namespace App\Http\Requests\Qr;

use Logia\Core\Validation\Support\FormRequest;

class QrTypeRequest extends FormRequest
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
            'name'          => ['required', 'string'],
            'icon'          => ['required', 'string'],
            'dataTypeId'    => ['required', 'numeric'],
            'description'   => ['nullable', 'string'],
            'isDynamic'     => ['nullable', 'boolean'],
        ];
    }
}
