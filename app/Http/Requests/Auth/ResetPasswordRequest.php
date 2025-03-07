<?php

namespace App\Http\Requests\Auth;

use Illuminate\Validation\Rules\Password;
use Logia\Core\Validation\Support\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'token'     => 'required',
            'email'     => 'required|email',
            'password'  => [ 'required', Password::defaults() ],
        ];
    }
}
