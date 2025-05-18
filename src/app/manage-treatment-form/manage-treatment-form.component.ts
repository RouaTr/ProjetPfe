import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-manage-treatment-form',
  templateUrl: './manage-treatment-form.component.html',
  styleUrls: ['./manage-treatment-form.component.css']
})
export class ManageTreatmentFormComponent {

  options: any[] = [];

  addTreatmentForm: FormGroup;
  editTreatmentForm: FormGroup;

  selectedOptionId: number | null = null;

  constructor(
    private treatmentOptionService: CrudService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadTreatmentOptions();

    this.addTreatmentForm = this.fb.group({
      treatmentName: ['']
    });

    this.editTreatmentForm = this.fb.group({
      treatmentName: ['']
    });
  }

  loadTreatmentOptions(): void {
    this.treatmentOptionService.getAllTreatmentOptions().subscribe(
      (data) => {
        this.options = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des options de traitement :', error);
      }
    );
  }

addTreatmentOption(): void {
  const newOptionName = this.addTreatmentForm.get('treatmentName')?.value?.trim();

  if (!newOptionName) {
    alert('Veuillez entrer un nom de traitement.');
    return;
  }

  const exists = this.options.some(option =>
    option.treatmentName?.toLowerCase() === newOptionName.toLowerCase()
  );

  if (exists) {
    alert('Ce nom existe déjà.');
    return;
  }

  this.treatmentOptionService.addTreatmentOption(newOptionName).subscribe(
    (response) => {
      console.log('Option de traitement ajoutée:', response);
      this.loadTreatmentOptions();
      this.addTreatmentForm.reset();
    },
    error => {
      console.error('Erreur lors de l\'ajout de l\'option de traitement', error);
    }
  );
}


  updateTreatmentOption(): void {
    const updatedOptionName = this.editTreatmentForm.get('treatmentName')?.value;
    if (this.selectedOptionId && updatedOptionName) {
      this.treatmentOptionService.updateTreatmentOption(this.selectedOptionId, updatedOptionName).subscribe(
        (response) => {
          console.log('Option modifiée avec succès', response);
          this.loadTreatmentOptions();
          this.selectedOptionId = null;
          this.editTreatmentForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'option de traitement :', error);
        }
      );
    }
  }

deleteTreatmentOption(id: number): void {
  const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce nom ?');
  if (confirmDelete) {
    this.treatmentOptionService.deleteTreatmentOption(id).subscribe(
      () => {
        console.log('Option supprimée avec succès');
        this.loadTreatmentOptions();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'option de traitement :', error);
      }
    );
  }
}

  selectOption(option: any): void {
    this.selectedOptionId = option.id;
    this.editTreatmentForm.patchValue({
      treatmentName: option.treatmentName
    });
  }
}
