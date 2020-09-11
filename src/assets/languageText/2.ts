export const text = {
    logIn: {
        title: 'Prihláste sa do Geoly',
        subTitle: 'alebo použite email a heslo:',
        formEmailPlaceholder: 'Email',
        formPasswordPlaceholder: 'Heslo',
        forgotPassword: 'Zabudli ste heslo?',
        signInButton: 'Prihlásiť sa',
        signInDiscord: 'Použiť Discord účet',
        signInFacebook: 'Použiť Facebook účet',
        signInGoogle: 'Použiť Google účet',
        createAccount: 'Nemáte ešte účet?'
    },
    signUp: {
        title: 'Vytvoriť Geoly účet',
        subTitle: 'alebo vytvorte účet pomocou emailu',
        signUpFacebook: 'Použiť Facebook účet',
        signUpGoogle: 'Použiť Google účet',
        signUpDiscord: 'Použiť Discord účet',
        formEmailPlaceholder: 'Email',
        formPasswordPlaceholder: 'Heslo',
        formPasswordAgainPlaceholder: 'Potvrdenie hesla',
        formNicNamePlaceholder: 'Nick',
        signUpButton: 'Registrovať sa',
        signIn: 'Už máte účet?'
    },
    forgot: {
        title: 'Zabudli ste heslo?',
        subtitle: 'Nebojte! Zašleme Vám email, pomocou ktorého si obnovíte heslo.',
        inputEmailPlaceholder: 'Email',
        submitButton: 'Odoslať'
    },
    reset: {
        title: 'Obnovte svoje heslo',
        subTitle: 'Zadajte nové heslo a prihláste sa pomocou nových údajov!',
        inputPasswordPlaceholder: 'Heslo',
        inputConfirmPasswordPlaceholder: 'Potvrdenie hesla',
        submitButton: 'Obnoviť'
    },
    navigation: {
        map: 'Mapa',
        ranking: 'Rebríček',
        quests: 'Úlohy',
        groups: 'Skupiny',
        premium: 'Prémium',
        logIn: 'Prihlásiť sa'
    },
    ranking: {
        title: 'Rebríček',
        subtitle: 'Splňte úlohy, získajte body a umiestnite sa v rebríčku najlepších hráčov v tejto sezóne!',
        season: 'Sezóna: ',
        noData: 'Zdá sa, že žiadny hráč v tejto sezóne nezískal body'
    },
    month: {
        0: 'Január',
        1: 'Február',
        2: 'Marec',
        3: 'Apríl',
        4: 'Máj',
        5: 'Jún',
        6: 'Júl',
        7: 'August',
        8: 'September',
        9: 'Október',
        10: 'November',
        11: 'December'
    },
    mapFilter: {
        searchPlacesPlaceholder: 'Vyberte miesto..',
        placeNotFound: 'Miesto sa nenašlo',
        selectCategory: 'Vyberte kategóriu..',
        noCategoryLeft: 'Žiadne ďalšie možnosti',
        stageTypeLabel: 'Typy úloh:',
        selectStageType: 'Vyberte typy úloh..',
        noStageTypeLeft: 'Žiadne ďalšie možnosti',
        placeLabel: 'Miesto:',
        categoryLabel: 'Kategórie',
        difficultyLabel: 'Obtiažnosť:',
        reviewLabel: 'Hodnotenie:',
        unreviewLabel: 'Neohodnotené',
        findButton: 'Hľadať',
        difficulty: 'Obťiažnosť:',
        review: 'Hodnotenie:',
        success: 'Úspešnosť:',
        cancel: 'Zrušené',
        pending: 'Nedokončené',
        finish: 'Ukončené',
        showButton: 'Prejsť na úlohu'

    },
    category: {
        history: 'História',
        art: 'Umenie',
        view: 'Výhľad',
        architecture: 'Architektúra',
        nature: 'Príroda',
        culture: 'Kultúra'
    },
    stageType: {
        GO_TO_PLACE: 'Ísť na miesto',
        ANSWER_QUESTION: 'Odpovedať na otázku',
        SCAN_QR_CODE: 'Naskenovať QR kód'
    },
    iconTitle: {
        delete: 'Odstrániť',
        edit: 'Upraviť'
    },
    deleteReview: {
        title: 'Odstrániť recenziu',
        subTitle: 'Ste si istý, že chcete natrvalo odstrániť túto recenziu?',
        accept: 'Áno',
        decline: 'Nie'
    },
    editReview: {
        title: 'Upraviť recenziu',
        subTitle: 'Rozhodli ste sa upraviť rezenciu? Poďme na to!',
        editButton: 'Upraviť'
    },
    review: {
        addButton: 'Odoslať',
        addReview: 'Pridať recenziu',
        reviews: 'Recenzie',
        reviewPlaceholder: 'Bolo to skvelé!',
        signUp: 'Prihlásiť sa',
        details: 'Popis',
        report: 'Nahlásiť úlohu'
    },
    reportQuest: {
        title: 'Nahlásiť úlohu',
        subTitle: 'Našli ste niečo nevhodné? Nebojte sa, to zvládneme!',
        button: 'Nahlásiť'
    },
    reportReasons: {
        INAPPROPRIATE_DESCRIPTION: 'Nevhodný popis',
        INAPPROPRIATE_NAME: 'Nevhodný názov',
        INAPPROPRIATE_IMAGE: 'Nevhodný obrázok',
        IMPOSSIBLE_QUEST: 'Nesplnitelná úloha'
    },
    error: {
        // Login
        BAD_CREDENTIALS: 'Email alebo heslo sú nesprávne',

        // Register
        PASSWORDS_MATCH: 'Zadané heslá sa nezhodujú',
        SOMETHING_WENT_WRONG: 'Niečo sa pokazilo, skúste to znovu',
        NICKNAME_ALREADY_EXISTS: 'Zadaný Nick je už použitý',
        INVALID_PASSWORD: 'Dĺžka hesla musí byť 4-20 znakov',
        INVALID_NICKNAME_FORMAT: 'Nick môže obsahovať A-Z, a-z, 0-9 a -_.',
        INVALID_NICKNAME_LENGTH: 'Dĺžka nicku je 4 až 15 znakov',
        INVALID_EMAIL: 'Formát emailu je nesprávny',
        EMAIL_ALREADY_EXISTS: 'Emailová adresa je už použitá',

        // Forgot Password
        ACCOUNT_NOT_VERIFIED: 'Účet nie je aktivovaný',
        ACCOUNT_NOT_ACTIVE: 'Úćet nie je aktívny',

        // Reset Password
        INVALID_TOKEN: 'Token je neplatný',

        // Edit Review
        INVALID_REVIEW_TEXT_FORMAT: 'Dĺžka recenzie musí byť 1-500 znakov',
        INVALID_REVIEW_LENGTH_SIZE: 'Dĺžka recenzie musí byť 1-500 znakov',
        // Add Review
        REVIEW_ALREADY_EXIST: 'Používatel môže pridať iba jednu recenziu',
        USER_DOESNT_PLAY_QUEST: 'Používateľ môže pridať recenziu iba v prípade, ak úlohu hral',
        // Sign Up On Review
        USER_ALREADY_FINISHED_QUEST: 'Úlohu je možné dokončiť iba raz',
        USER_HAS_ACTIVE_QUEST: 'Používateľ môže mať iba jednu aktívnu úlohu',
        USER_CAN_NOT_PLAY_OWN_QUEST: 'Používateľ nemôže začať vlastnú úlohu',

        // Other
        USER_NOT_FOUND: 'Účet nenájdený',
        QUEST_NOT_FOUND: 'Úloha nenájdená',
        SELECT_REASON: 'Vyberte dôvod'
    },
    success: {
        // Register
        USER_CREATED: 'Potvrdzovací email bol odoslaný na zadanú emailovú adresu',
        // Forgot Password
        EMAIL_SENT: 'Email pre obnovu hesla bol odoslaný',
        // Reset Password
        PASSWORD_RESET: 'Vaše heslo bolo zmenené',
        // Verify
        ACCOUNT_ACTIVATED: 'Váš účet bol aktivovaný',
        // Review
        REVIEW_DELETED: 'Recenzia bola odstránená',
        REVIEW_EDITED: 'Recenzia bola upravená',
        REVIEW_ADDED: 'Recenzia bola pridaná',
        USER_SIGNED_UP_ON_QUEST: 'Boli ste prihlásený na úlohu',
        // Report
        QUEST_REPORT_CREATED: 'Úloha bola nahlásená'
    }
}
