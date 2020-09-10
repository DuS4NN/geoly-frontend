export const text = {
    logIn: {
        title: 'Sign in to Geoly',
        subTitle: 'or use your email account:',
        formEmailPlaceholder: 'Email',
        formPasswordPlaceholder: 'Password',
        forgotPassword: 'Forgot your password?',
        signInButton: 'Sign In',
        signInDiscord: 'Use Discord account',
        signInFacebook: 'Use Facebook account',
        signInGoogle: 'Use Google account',
        createAccount: 'Don\'t have an account?'
    },
    signUp: {
        title: 'Create Geoly account',
        subTitle: 'or use your email for registration:',
        signUpFacebook: 'Use Facebook account',
        signUpGoogle: 'Use Google account',
        signUpDiscord: 'Use Discord account',
        formEmailPlaceholder: 'Email',
        formPasswordPlaceholder: 'Password',
        formPasswordAgainPlaceholder: 'Confirm password',
        formNicNamePlaceholder: 'Nickname',
        signUpButton: 'Sign Up',
        signIn: 'Already have an account?'
    },
    forgot: {
        title: 'Forgot your password?',
        subTitle: 'Dont\'t worry! We\'ll send you an email with a link to reset your password.',
        inputEmailPlaceholder: 'Email',
        submitButton: 'Send'
    },
    reset: {
        title: 'Reset your password',
        subTitle: 'Type your new password and login with new credentials!',
        inputPasswordPlaceholder: 'Password',
        inputConfirmPasswordPlaceholder: 'Confirm password',
        submitButton: 'Reset'
    },
    navigation: {
        map: 'Map',
        ranking: 'Ranking',
        quests: 'Quests',
        groups: 'Groups',
        premium: 'Premium',
        logIn: 'Log In'
    },
    ranking: {
        title: 'Ranking',
        subtitle: 'Complete tasks, earn points and place in the ranking of the best players in this season!',
        season: 'Season: ',
        noData: 'No player seems to have gained a points this season'
    },
    month: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    },
    mapFilter: {
        searchPlacesPlaceholder: 'Select place..',
        placeNotFound: 'Place not found',
        selectCategory: 'Select category..',
        noCategoryLeft: 'No categories left',
        stageTypeLabel: 'Stage types:',
        selectStageType: 'Select stage types..',
        noStageTypeLeft: 'No Stage type left',
        placeLabel: 'Place:',
        categoryLabel: 'Categories:',
        difficultyLabel: 'Difficulty:',
        reviewLabel: 'Review:',
        unreviewLabel: 'Not rated:',
        findButton: 'Search',
        difficulty: 'Difficulty:',
        review: 'Review:',
        success: 'Success:',
        cancel: 'Cancel',
        pending: 'Pending',
        finish: 'Finish',
        showButton: 'Show the quest'
    },
    category: {
      history: 'History',
      art: 'Art',
      view: 'View',
      architecture: 'Architecture',
      nature: 'Nature',
      culture: 'Culture'
    },
    stageType: {
      GO_TO_PLACE: 'Go to a place',
      ANSWER_QUESTION: 'Answer a question',
      SCAN_QR_CODE: 'Scan a QR code'
    },
    iconTitle: {
        delete: 'Delete',
        edit: 'Edit'
    },
    deleteReview: {
        title: 'Delete the review',
        subTitle: 'Are you sure you want to permanently delete this review?',
        accept: 'Yes',
        decline: 'No'
    },
    error: {
        // Login
        BAD_CREDENTIALS: 'Email or password is incorrect',

        // Register
        PASSWORDS_MATCH: 'Passwords do not match',
        SOMETHING_WENT_WRONG: 'Something went wrong, please try again',
        NICKNAME_ALREADY_EXISTS: 'Nickname is already used',
        INVALID_PASSWORD: 'Password must be 4-20 characters long',
        INVALID_NICKNAME_FORMAT: 'Nickname can contain only A-Z, a-z, 0-9 and .-_',
        INVALID_NICKNAME_LENGTH: 'Nickname must be 4-20 characters long',
        INVALID_EMAIL: 'Email format is incorrect',
        EMAIL_ALREADY_EXISTS: 'Email address is already used',

        // Forgot Password
        ACCOUNT_NOT_VERIFIED: 'Account not verified',
        ACCOUNT_NOT_ACTIVE: 'Account not active',
        // Reset Password
        INVALID_TOKEN: 'Token is invalid',

        // Other
        USER_NOT_FOUND: 'Account not found',
        QUEST_NOT_FOUND: 'Quest not found'
    },
    success: {
        // Register
        USER_CREATED: 'A verification email has been sent to your email address',
        // Forgot
        EMAIL_SENT: 'An email to reset your password has been sent',
        // Reset
        PASSWORD_RESET: 'Your password has been changed',
        // Verify
        ACCOUNT_ACTIVATED: 'Your account has been verified'

    }
    // NOT_ACCEPTABLE - Nie je splnená nejaká podmienka
    // NOT_FOUND - Nenašlo sa, pravdepodobne BAD_REQUEST
    // INTERNAL_SERVER_ERROR - Chyba
    // BAD_REQUEST - Vyhodí len pri Validatore

    // NO_CONTENT - Všetko je OK ale nie sú žiadne dáta

    // OK - Vraciam dáta
    // ACCEPTED - Všetko OK ale dáta nevraciam
}
