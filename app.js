const bugs = [
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

function afficherBugs() {

    if (bugs.length === 0){
        listeBugs.innerHTML = '<p> Aucun bug présent </p>'
        return ; 
    }

    const contenuHTML = bugs.map( (bug) => {   
    return ` 
        <article class="bug" data-id = "${bug.id}">
            <div>
                <h3>${bug.titre}</h3>
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
};

afficherBugs() ;