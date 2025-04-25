import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-fonctionnal-symptoms',
  templateUrl: './fonctionnal-symptoms.component.html',
  styleUrls: ['./fonctionnal-symptoms.component.css']
})
export class FonctionnalSymptomsComponent implements OnInit {
  messageCommande = '';
  FunctionalSymptomsForm: FormGroup;
  patientId: number | null = null;
  patientName: string = '';
  patientLastName: string = '';
  symptomList: string[] = [
    'fever', 'diarrhea', 'cough', 'abdominalPain', 'dyspnea', 'nausea',
    'asthenia', 'arthralgia', 'nightSweats', 'headache', 'dysphagia',
    'pruritus', 'anorexia', 'insomnia', 'moodDisorders', 'rhinorrhea',
    'paresthesia', 'cramps', 'visualDisturbances', 'myalgia', 'libidoDisorders', 'otherSymptoms'
  ];
  selectedSymptoms: string[] = [];

  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Typage explicite de l'objet formControls
    let formControls: { [key: string]: FormControl } = {};
    this.symptomList.forEach(symptom => {
      formControls[symptom] = new FormControl(false); // Définir chaque case à cocher comme 'false' initialement
    });
    formControls['functionalSymptomsDate'] = new FormControl(null);
    this.FunctionalSymptomsForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('patientId');
      if (id) {
        this.patientId = +id;
        console.log('ID du patient récupéré depuis l\'URL :', this.patientId);
        this.service.findPatientById(this.patientId).subscribe(
          (patient) => {
            this.patientName = patient.firstName;
            this.patientLastName = patient.lastName;
          },
          (error) => {
            console.error('Erreur lors de la récupération du patient :', error);
          }
        );
      }
    });
  }
  get functionalSymptomsDate() { return this.FunctionalSymptomsForm.get('functionalSymptomsDate'); }

  onCheckboxChange(symptom: string): void {
    const control = this.FunctionalSymptomsForm.get(symptom); // Accède au contrôle de la case à cocher
    if (control?.value) {
      if (!this.selectedSymptoms.includes(symptom)) {
        this.selectedSymptoms.push(symptom);
      }
    } else {
      const index = this.selectedSymptoms.indexOf(symptom);
      if (index !== -1) {
        this.selectedSymptoms.splice(index, 1);
      }
    }
    console.log(this.selectedSymptoms); // Affiche les symptômes sélectionnés
  }
  isInvalidAndTouchedOrDirty(controlName: string): boolean {
    const control = this.FunctionalSymptomsForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty) ? true : false;
  }



  addNewFunctionalSymptoms(): void {
    this.FunctionalSymptomsForm.markAllAsTouched(); // Marquer tous les contrôles comme touchés pour afficher les erreurs
    if (this.FunctionalSymptomsForm.invalid) {
      console.log('Formulaire invalide !');
      return;
    }

    // Vérification si un patient est sélectionné (pas de patientId)
    if (!this.patientId) {
      console.error('Erreur : Aucun ID patient récupéré !');
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d\'ajouter les signes fonctionnels : aucun patient enregistré.
      </div>`;
      return;
    }

    // Récupération des données du formulaire
    let data = this.FunctionalSymptomsForm.value;

    // Ajouter le patientId aux données envoyées
    data = { ...data, patientId: this.patientId };

    // Vérification si la date des symptômes est présente et bien formatée
    if (!data.functionalSymptomsDate) {
      console.error('La date des symptômes est manquante !');
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        La date des symptômes est requise.
      </div>`;
      return;
    }

    // Si la date est présente, on la convertit en format Date (si nécessaire)
    if (data.functionalSymptomsDate) {
      data.functionalSymptomsDate = new Date(data.functionalSymptomsDate);
    }

    // Affichage des données envoyées pour debug
    console.log('Données envoyées:', data);

    // Appel du service pour ajouter les symptômes fonctionnels
    this.service.addFunctionalSymptoms(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);

        // Message de succès
        this.messageCommande = `<div class="alert alert-success" role="alert">
          Signes fonctionnels ajoutés avec succès !
        </div>`;

        // Redirection après un délai
        setTimeout(() => {
          this.router.navigate([`medicalfolder/listfunctionalsymptoms/${this.patientId}`]);
        }, 2000);
      },
      err => {
        console.error('Erreur:', err);

        // Message d'erreur en cas de problème serveur
        this.messageCommande = `<div class="alert alert-danger" role="alert">
          Problème de serveur ou données invalides !
        </div>`;
      }
    );
  }

}
