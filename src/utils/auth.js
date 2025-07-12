export const checkCredentials = (email, password) => {
    const validEmail = "staff@clinic.com"
    const validPassword = "123456"

    return email == validEmail && password == validPassword
}