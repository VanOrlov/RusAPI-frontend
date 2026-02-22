export interface SignupStore {
    signupData: {
        name: string
        email: string
        password: string
        repeatPassword: string
    }
    isSignupBtnLoading: boolean
}