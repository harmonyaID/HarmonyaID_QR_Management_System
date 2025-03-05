<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Yusologia</title>

    <style type="text/css">
        body {
            font-family     : Helvetica, Arial, sans;
            color           : #494949;
            font-size       : 16px;
            background-color: rgb(234,234,234);
            margin          : 0;
            height          : 100%;
            padding         : 0 32px;
        }

        .wrapping-main {
            max-width       : 900px;
            height          : 100%;
            margin          : 0 auto;
            background-color: #fff;
        }

        .wrap-header {
            padding: 25px 30px;
        }

        .wrap-body {
            padding: 0 30px 25px;
        }

        .button {
            border-radius   : 100px;
            padding         : 13.5px 28.5px;
            color           : #ffffff !important;
            display         : inline-block;
            text-decoration : none;
            font-weight     : 600;
            line-height     : 20px;
            cursor          : pointer;
            -webkit-text-size-adjust: none;
        }

        .button-blue {
            background-color: #0056B3;
            border-top      : 1px solid #0056B3;
            border-right    : 1px solid #0056B3;
            border-bottom   : 1px solid #0056B3;
            border-left     : 1px solid #0056B3;
        }

    </style>
</head>
<body>
    <div class="wrapping-main">
        <div class="wrap-header">
            <div style="text-align: center;">
                <img 
                    src="{{ asset('images/logo/logo-whole.svg') }}"
                    height="70"
                    width="auto"
                />
            </div>
        </div>
        <div class="wrap-body">
            <h1 style="font-size: 20px; font-weight: 800; margin-bottom: 16px;">Password Reset Request</h1>
            <p>
                To reset your password, please click this button below. 
                It will expire in 60 minutes.
            </p>
            <br/><br/>
            <div style="text-align: center;">
                <a 
                    class="button button-blue"
                    href="{{ route('frontend.auth.reset-password', ['token' => $token, 'email' => $email]) }}"
                >
                    Reset Password
                </a>
            </div>
            <br/><br/>
            <p>
                If you did not request password reset, you can safely ignore this email.
            </p>
            <hr
                style="border: 0; background: #D1D1D1; height: 1px;"
            />
            <p>
                <a style="color: #0056B3; font-weight: 700;" href="{{ url('/') }}">QR Code App</a> by SynChat
            </p>
        </div>
    </div>
</body>
</html>

