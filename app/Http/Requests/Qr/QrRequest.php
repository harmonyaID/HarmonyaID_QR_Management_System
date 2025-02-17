<?php

namespace App\Http\Requests\Qr;

use Logia\Core\Validation\Support\FormRequest;

class QrRequest extends FormRequest
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
            'name'      => ['required', 'string'],
            'qrTypeId'  => ['required', 'uuid'],
            'data'      => ['required', 'array'],
            'style'     => ['required', 'array'],
        ];
    }
}
