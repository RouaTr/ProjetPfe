import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent {
 messageCommande = "";
  LaboratoryForm: FormGroup;
  patientId: number | null = null; // Initialisation correcte

  constructor(private service: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      medicaltestDate: new FormControl('', [Validators.required]),
      chemistrytestDate: new FormControl(''),
      cbcTestDate: new FormControl(''),
      potassium: new FormControl(''),
      serologytestDate: new FormControl(''),
      sodium: new FormControl(''),
      calcium: new FormControl(''),
      phosphorus: new FormControl(''),
      magnesium: new FormControl(''),
      urea: new FormControl(''),
      creatinine: new FormControl(''),
      alat: new FormControl(''),  // ALT
      asat: new FormControl(''),  // AST
      ggt: new FormControl(''),   // GGT
      pal: new FormControl(''),   // ALP
      directBilirubin: new FormControl(''),
      totalBilirubin: new FormControl(''),
      albumin: new FormControl(''),
      troponin: new FormControl(''),
      lipase: new FormControl(''),

      // NFS (Complete Blood Count)
      wbc: new FormControl(''),  // GB (Globules Blancs)
      neutrophilsAbs: new FormControl(''),  // GNN#
      eosinophilsAbs: new FormControl(''),  // Eo#
      rbc: new FormControl(''),  // GR
      hemoglobin: new FormControl(''),  // HGB
      hematocrit: new FormControl(''),  // HCT
      mcv: new FormControl(''),  // VGM
      mch: new FormControl(''),  // TCMH
      mchc: new FormControl(''),  // CCMH
      rdwCv: new FormControl(''),  // IDR
      platelets: new FormControl(''),  // PLT
      mpv: new FormControl(''),  // VPM
      monocytesPercentage: new FormControl(''),  // Mono%
      lymphocytesPercentage: new FormControl(''),  // Lymph%
      eosinophilsPercentage: new FormControl(''),  // Eos%
      basophilsPercentage: new FormControl(''),  // Bas%
      neutrophilsPercentage: new FormControl(''),  // PNN%
      lymphocytesAbs: new FormControl(''),  // Lymph#
      basophilsAbs: new FormControl(''),
      monocytesAbs: new FormControl(''),  // Bas#
      iono: new FormControl(''),  // Ionogramme
      vitaminD: new FormControl(''),  // Vitamine D
      urineTestStrips: new FormControl(''),  // Bandelettes urinaires
      fastingBloodGlucose: new FormControl(''),  // Glycémie à jeun

      // Lipid profile
      hdl: new FormControl(''), // HDL
      ldl: new FormControl(''), // LDL
      totalCholesterol: new FormControl(''), // Cholestérol total (CHT)
      triglycerides: new FormControl(''), // Triglycérides (TG)

      // Sérologies
      hepatitisAIgG: new FormControl(''),
      hepatitisAIgM: new FormControl(''), // Hépatite A IgM
      hepatitisBAgHbs: new FormControl(''), // Antigène HBs
      hepatitisBAntiHbc: new FormControl(''), // Anti-HBc
      hepatitisBAntiHbs: new FormControl(''), // Anti-HBs
      hepatitisC: new FormControl(''), // Hépatite C
      syphilisTpha: new FormControl(''), // Syphilis Tpha
      syphilisVdrl: new FormControl(''), // Syphilis Vdrl
      cmvIgG: new FormControl(''),
      cmvIgM: new FormControl(''), // Cytomégalovirus (CMV)
      toxoplasmosis: new FormControl(''), // Toxoplasmose
      leishmaniasis: new FormControl(''), // Leishmaniose
      tuberculinTest: new FormControl(''), // IDR à la tuberculine
      quantiferonTest: new FormControl(''), // Test au Quantiféron
      chestXRay: new FormControl(''), // Radiothorax

      // Examens complémentaires
      proctologicExam: new FormControl(''), // Examen proctologique
      viralLoad: new FormControl(''), // Charge virale
      cd4Count: new FormControl(''), // Taux de CD4
      genotypicResistanceTest: new FormControl(''),



    };

    this.LaboratoryForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    const storedId = localStorage.getItem('selectedPatientId');
    if (storedId) {
      this.patientId = parseInt(storedId, 10);
      console.log("🔹 ID du patient récupéré :", this.patientId);
    } else {
      console.error("⚠️ Aucun patient sélectionné !");
    }
  }

  get medicaltestDate() { return this.LaboratoryForm.get('medicaltestDate'); }

  addNewLaboratory() {
    console.log("Valeur du champ medicaltestDate:", this.medicaltestDate?.value);

    if (!this.patientId) {
      console.error("Erreur : Aucun ID patient récupéré !");
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Impossible d'ajouter le bilan : aucun patient enregistré.
      </div>`;
      return;
    }

    if (this.LaboratoryForm.invalid) {
      console.error("Formulaire invalide :", this.LaboratoryForm.errors);
      this.messageCommande = `<div class="alert alert-danger" role="alert">
        Veuillez remplir correctement tous les champs obligatoires.
      </div>`;
      return;
    }

    let data = this.LaboratoryForm.value;
    data = { ...data, patientId: this.patientId };

    console.log('Données envoyées:', data);

    this.service.addLaboratory(this.patientId, data).subscribe(
      res => {
        console.log('Réponse du serveur:', res);
        this.messageCommande = `<div class="alert alert-success" role="alert">
         bilan ajouté avec succès !
        </div>`;
        this.router.navigate([`/medicalfolder/listlaboratory/${this.patientId}`]);
      },
      err => {
        console.error('Erreur:', err);
        this.messageCommande = `<div class="alert alert-danger" role="alert">
          Problème de serveur ou données invalides !
        </div>`;
      }
    );
  }

}


