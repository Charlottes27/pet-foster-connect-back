// Fonction pour valider la complexité du mot de passe
// doit contenir au moins un chiffre + une majuscule + un caractere spécial + mini 8 caractères
export function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}