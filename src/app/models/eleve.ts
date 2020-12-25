export interface Eleve {
    id?:number;
    nom_etud:String;
    sexe_etud:String;
    prenom_etud:String;
    telephone_etud:String;
    mail_etud:String;
    date_nais_etud:Date;
    lieu_naissance_etud:String;
    cin_etud:String;
    photo_etud:String;
    niveau:{
        id?:number,
        intitule:string

    }
}

