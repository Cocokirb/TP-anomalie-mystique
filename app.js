let bugs = [
{
    id: 1711200001,
    titre: "Le CSS fantôme",
    auteur: "Alexandre",
    severite: "Critique",
    description: "La navbar disparaît uniquement les soirs de pleine lune sur Safari iOS.",
    recompense: 150
},
{
    id: 1711200002,
    titre: "Bouton de validation volant",
    auteur: "Sonia",
    severite: "Moyenne",
    description: "Le bouton se déplace de 20px vers la gauche dès qu'on essaie de le survoler avec la souris.",
    recompense: 75
},
{
    id: 1711200003,
    titre: "Faute de frappe dans le footer",
    auteur: "Thomas",
    severite: "Basse",
    description: "Mention « Tous droits réservés » écrite avec une coquille (« Tous drois réservés »).",
    recompense: 20
}
];

const listeBugs = document.querySelector("#bug-grid")
const compteurBugs = document.querySelector("#nombreBugs")
const formulaireBugs = document.querySelector("#bugsForm")

// Récuperer les valeurs des champs du formulaires
const titleInput = document.getElementById("title");
const autorInput = document.getElementById("autor");
const severiteInput = document.getElementById("severite");
const recompenseInput = document.getElementById("recompense");
const descriptionInput = document.getElementById("description");

// Récuperer les éléments pour afficher les messages d'erreur
const errorTitle = document.getElementById("error-title");
const errorAutor = document.getElementById("error-autor");
const errorSeverite = document.getElementById("error-severite");
const errorRecompense = document.getElementById("error-recompense");
const errorDescription = document.getElementById("error-description");

// Fonction d'affichage de la liste des bugs
function afficherBugs() {

    if (bugs.length === 0){
        listeBugs.innerHTML = '<p> Aucun bug présent </p>'
        return ; 
    }else{
        const texteCompteurBugs = `<p> Nombre de bugs a résoudre : ${bugs.length}</p>`
        compteurBugs.innerHTML = texteCompteurBugs
    }

    const contenuHTML = bugs.map( (bug) => {   
    
    return ` 
        <article class="bug" data-id = "${bug.id}">
            <div>
                <h3>${bug.titre}</h3>
                <span class="badge-severite severite-${bug.severite.toLowerCase()}">${bug.severite}</span>
                <p>Auteur : ${bug.auteur}</p>
                <p>Description ${bug.description}</p>
                <p class = "statut"> </p>
                <p>Récompense : ${bug.recompense}
            </div>
                <button type="button" class="delete-button">
                  Supprimer
                </button>
        </article>
    `
    })
    listeBugs.innerHTML = contenuHTML.join(" ");

    const deleteButtons = listeBugs.querySelectorAll(".delete-button")
    deleteButtons.forEach (button => {
      //Créer un listener
      button.addEventListener ( "click" , event => {
        // Récuperer l'id du film 
        const article = button.closest(".bug")
        const idBugs = parseInt(article.dataset.id)
        supprimerBugs(idBugs)
      })
    })
};

// Fonction pour réinitialisé les messages d'erreurs
function effacerErreur (){
    errorTitle.textContent = "" ;
    errorAutor.textContent = "" ;
    errorSeverite.textContent = "" ;
    errorRecompense.textContent = "" ;
    errorDescription.textContent = "" ;
}

// Fonctions de validation du formulaire
function validerFormulaire () {
    let estValide = true;

  // Validation Titre
  if(titleInput.value.trim().length < 2){
    errorTitle.textContent = "Le titre doit contenir au moins 2 caractères";
    estValide = false;
  }  

  // Validation auteur
  if(autorInput.value.trim().length < 2){
    errorAutor.textContent = "L'auteur doit contenir au moins 2 caractères";
    estValide = false;
  }  

  // Validation severite
  if(severiteInput.value === ""){
    errorSeverite.textContent = "Veuillez sélectionner une sévérité";
    estValide = false;
  }

  // Validation récompense
  if(isNaN (recompenseInput.value) || recompenseInput.value <= 5){
    errorRecompense.textContent = "La récompense doit être un nombre supérieur à 5";
    estValide = false;
  }   

  // Validation Description
  if(descriptionInput.value.trim().length < 5 ){
    errorDescription.textContent = "La description doit contenir au moins 2 caractères";
    estValide = false;
  }  

  return estValide ;                                                                                      

}

//Supprimer le films selectionné par son id 
function supprimerBugs(id){
  
  bugs = bugs.filter(function (bug) {
    return bug.id !== id;
  });
  afficherBugs();
}

formulaireBugs.addEventListener("submit" , function(event) {

    //empecher de raffraichir la page a chaque soumission du formulaire
    event.preventDefault()

    //Réinitialiser les messages d'erreur
    effacerErreur()

    //Vérifier si le formulaire est valide
    if (!validerFormulaire()) {
    return;
  }

  // Ajouter les données dans un tableau temporaire 
  const nouveauBugs = {
    id: Date.now(),
    titre: titleInput.value.trim(),
    auteur: autorInput.value.trim(),
    severite: severiteInput.value,
    description: descriptionInput.value.trim(),
    recompense: parseInt(recompenseInput.value , 10)
  }


  bugs.push(nouveauBugs)

  // Réinitialiser le formulaire
  formulaireBugs.reset()

  // Donner le nouvelle affichage des bugs
  afficherBugs()
})


// Affichage au premier chargement de la page 
afficherBugs() ;