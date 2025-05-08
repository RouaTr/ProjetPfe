import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { MedicalDocument } from '../Entity/MedicalDocument.Entity';

@Component({
  selector: 'app-display-filenet-documents',
  templateUrl: './display-filenet-documents.component.html',
  styleUrls: ['./display-filenet-documents.component.css']
})
export class DisplayFilenetDocumentsComponent implements OnInit {
  documents: MedicalDocument[] = [];
  bilans: MedicalDocument[] = [];
  ordonnances: MedicalDocument[] = [];
  public saveDate?: Date;
  constructor(
    private route: ActivatedRoute,
    private service: CrudService
  ) {}

  ngOnInit(): void {
    const patientId = +this.route.snapshot.paramMap.get('patientId');
    console.log('🩺 ID patient dans URL :', patientId);

    if (patientId) {
      this.loadDocumentsForPatient(patientId);
    } else {
      console.warn('⚠️ Aucun patientId trouvé dans l’URL');
    }
  }

  loadDocumentsForPatient(patientId: number): void {
    this.service.getDocumentsByPatientId(patientId).subscribe(
      docs => {
        console.log('📁 Documents reçus du backend :', docs);
        this.documents = docs;
        this.bilans = docs.filter(doc => doc.type.toLowerCase() === 'bilan');
        this.ordonnances = docs.filter(doc =>
          doc.type?.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === 'ordonnance'
        );
      },
      error => {
        console.error('❌ Erreur de chargement des documents :', error);
      }
    );
  }

  downloadDocument(fileNetId: string): void {
    const url = `http://localhost:8081/api/filenet/download/${fileNetId}`;
    window.open(url, '_blank');
  }
}
