module.exports = regex = {
    service_de_production : /^[A-H]$/gm,
    poids : /^\d{1,}\.\d{1,}$/gm,
    nom_prenom : /^[A-Z]\w{1,}$/gm,
    reference : /^[0-9]{2}[A-Z][0-9]{2}[A-Z]$/gm,
    mail : /^[A-Za-z](\w|\d|\.){1,}\@[A-Za-z]{1,}\.(com|fr)$/gm
}

