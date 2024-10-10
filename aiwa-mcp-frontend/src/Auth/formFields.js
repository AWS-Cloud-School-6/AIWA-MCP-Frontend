
const formFields = {
    signIn: {
        email: {
            placeholder: 'Enter your email',
            label: 'Email'
        },
    },
    signUp: {
        name: {
            placeholder: 'Enter your name',
            order: 1
        },
        email: {
            placeholder: 'Enter your email',
            label: 'Email',
            order: 2,
        },
        password: {
            label: 'Password:',
            placeholder: 'Enter your Password:',
            order: 3,
        },
        confirm_password: {
            label: 'Confirm Password:',
            order: 4,
        }
    },
    forceNewPassword: {
        password: {
            placeholder: 'Enter your Password:',
        },
    },
    forgotPassword: {
        email: {
            label: 'Please enter your email to search for your account',
            placeholder: 'Enter your email',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Enter your Confirmation Code:',
            label: 'New Label',
            isRequired: false,
        },
        confirm_password: {
            placeholder: 'Enter your Password Please:',
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};

export default formFields;