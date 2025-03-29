import { Component } from '@angular/core';
import { Laboratory } from '../Entity/Laboratory.Entity';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../Entity/Patient.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-update-laboratory',
  templateUrl: './update-laboratory.component.html',
  styleUrls: ['./update-laboratory.component.css']
})
export class UpdateLaboratoryComponent {

 updateForm: FormGroup;
  id!: number;
  currentLaboratory!: Laboratory;
  public message!: string;
  patientId?: number; // Doit être bien défini dans la classe
  patient: Patient | null = null;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
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



    });
  }


  get medicaltestDate() { return this.updateForm.get('medicaltestDate'); }


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.service.findLaboratoryById(this.id).subscribe((laboratory) => {
      console.log("🔹 bilan récupéré depuis l'API :", laboratory);

      if (!laboratory|| !laboratory.patient) {
        console.error("⚠️ Erreur : Le bilan ou le patient est null !");
        return;
      }
      this.patient = laboratory.patient;

      this.currentLaboratory = laboratory;

      this.updateForm.patchValue({
        medicaltestDate: laboratory.medicaltestDate,
        chemistrytestDate: laboratory.chemistrytestDate,
        cbcTestDate: laboratory.cbcTestDate,
        potassium: laboratory.potassium,
        serologytestDate: laboratory.serologytestDate,
        sodium: laboratory.sodium,
        calcium: laboratory.calcium,
        phosphorus: laboratory.phosphorus,
        magnesium: laboratory.magnesium,
        urea: laboratory.urea,
        creatinine: laboratory.creatinine,
        alat: laboratory.alat,  // ALT
        asat: laboratory.asat,  // AST
        ggt: laboratory.ggt,   // GGT
        pal: laboratory.pal,   // ALP
        directBilirubin: laboratory.directBilirubin,
        totalBilirubin: laboratory.totalBilirubin,
        albumin: laboratory.albumin,
        troponin: laboratory.troponin,
        lipase: laboratory.lipase,

        // NFS (Complete Blood Count)
        wbc: laboratory.wbc,  // GB (Globules Blancs)
        neutrophilsAbs: laboratory.neutrophilsAbs,  // GNN#
        eosinophilsAbs: laboratory.eosinophilsAbs,  // Eo#
        rbc: laboratory.rbc,  // GR
        hemoglobin: laboratory.hemoglobin,  // HGB
        hematocrit: laboratory.hematocrit,  // HCT
        mcv: laboratory.mcv,  // VGM
        mch: laboratory.mch,  // TCMH
        mchc: laboratory.mchc,  // CCMH
        rdwCv: laboratory.rdwCv,  // IDR
        platelets: laboratory.platelets,  // PLT
        mpv: laboratory.mpv,  // VPM
        monocytesPercentage: laboratory.monocytesPercentage,  // Mono%
        lymphocytesPercentage: laboratory.lymphocytesPercentage,  // Lymph%
        eosinophilsPercentage: laboratory.eosinophilsPercentage,  // Eos%
        basophilsPercentage: laboratory.basophilsPercentage,  // Bas%
        neutrophilsPercentage: laboratory.neutrophilsPercentage,  // PNN%
        lymphocytesAbs: laboratory.lymphocytesAbs,  // Lymph#
        basophilsAbs: laboratory.basophilsAbs,
        monocytesAbs: laboratory.monocytesAbs,  // Bas#
        iono: laboratory.iono,  // Ionogramme
        vitaminD: laboratory.vitaminD,  // Vitamine D
        urineTestStrips: laboratory.urineTestStrips,  // Bandelettes urinaires
        fastingBloodGlucose: laboratory.fastingBloodGlucose,  // Glycémie à jeun

        // Lipid profile
        hdl: laboratory.hdl, // HDL
        ldl: laboratory.ldl, // LDL
        totalCholesterol: laboratory.totalCholesterol, // Cholestérol total (CHT)
        triglycerides: laboratory.triglycerides, // Triglycérides (TG)

        // Sérologies
        hepatitisAIgG: laboratory.hepatitisAIgG,
        hepatitisAIgM: laboratory.hepatitisAIgM, // Hépatite A IgM
        hepatitisBAgHbs: laboratory.hepatitisBAgHbs, // Antigène HBs
        hepatitisBAntiHbc: laboratory.hepatitisBAntiHbc, // Anti-HBc
        hepatitisBAntiHbs: laboratory.hepatitisBAntiHbs, // Anti-HBs
        hepatitisC: laboratory.hepatitisC, // Hépatite C
        syphilisTpha: laboratory.syphilisTpha, // Syphilis Tpha
        syphilisVdrl: laboratory.syphilisVdrl, // Syphilis Vdrl
        cmvIgG: laboratory.cmvIgG,
        cmvIgM: laboratory.cmvIgM, // Cytomégalovirus (CMV)
        toxoplasmosis: laboratory.toxoplasmosis, // Toxoplasmose
        leishmaniasis: laboratory.leishmaniasis, // Leishmaniose
        tuberculinTest: laboratory.tuberculinTest, // IDR à la tuberculine
        quantiferonTest: laboratory.quantiferonTest, // Test au Quantiféron
        chestXRay: laboratory.chestXRay, // Radiothorax

        // Examens complémentaires
        proctologicExam: laboratory.proctologicExam, // Examen proctologique
        viralLoad: laboratory.viralLoad, // Charge virale
        cd4Count: laboratory.cd4Count, // Taux de CD4
        genotypicResistanceTest: laboratory.genotypicResistanceTest,

      });

      console.log("🔹 Patient récupéré :", this.currentLaboratory.patient);
    });
  }

  logInvalidFields() {
    console.log("❌ Champs invalides dans le formulaire :");
    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control?.invalid) {
        console.log(` Champ : ${key}`);
        console.log("   ↳ Erreurs :", control.errors);
      }
    });
  }

  updateLaboratory() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      console.log("🚨 Formulaire invalide !");
      this.logInvalidFields();
      return;
    }

    if (!this.currentLaboratory?.patient) {
      console.error("🚨 Erreur : patient est undefined !");
      return;
    }

    this.patientId = this.currentLaboratory.patient.id; //  Récupération correcte de l'ID du patient

    let data = this.updateForm.value;
    let laboratory = new Laboratory();
    Object.assign(laboratory, data);
    laboratory.id = this.id;
    laboratory.patient = this.currentLaboratory;

    console.log("🔄 Données envoyées pour mise à jour :", laboratory);

    this.service.updateLaboratory(this.id, this.patientId, laboratory).subscribe({
      next: (res) => {
        console.log("✅ bilan mise à jour avec succès :", res);
        this.router.navigate(['/medicalfolder/listlaboratory', this.patientId]);
      },
      error: (err) => {
        console.error("⚠️ Erreur lors de la mise à jour :", err);
      }
    });
  }

}

