import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CrudService } from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: CrudService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('practitionnerRole');
    const url = state.url;

    console.log('Role détecté :', role);
    console.log('Tentative d’accès à :', url);

    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    // Définir les routes autorisées par rôle
    const accessRules: { [key: string]: string[] } = {
      medecin: [
        '/listpatient',
        '/home',
        '/medicalfolder/:id',
        '/newpatient',
       '/listdocument/:patientId',
        '/updatePatient/:id',
       '/analysetrends/:id',
        '/laboratory',
        '/observation',
        '/listobservation',
        '/medicalfolder/listobservation/updateobservation/:id',
        '/medicalfolder/listobservation/:patientId',
        '/medicalfolder/listobservation/:patientId/add',
        '/observation/:patientId',
        '/functionalsymptoms',
        '/medicalfolder/listfunctionalsymptoms/updatefunctionalsymptoms/:id',
        '/functionalsymptoms/:patientId',
        '/medicalfolder/listfunctionalsymptoms/:patientId',
        '/medicalfolder/listfunctionalsymptoms/:patientId/add',
        '/medicalhistory',
        '/medicalfolder/listmedicalhistory/updatemedicalhistory/:id',
        '/medicalfolder/listmedicalhistory/:patientId',
        '/listmedicalhistory',
        '/medicalfolder/listmedicalhistory/:patientId/add',
        '/medicalhistory/:patientId',
        '/clinicalsymptoms',
        '/medicalfolder/listclinicalsymptoms/updateclinicalsymptoms/:id',
        '/medicalfolder/listclinicalsymptoms/:patientId',
        '/listclinicalsymptoms',
        '/medicalfolder/listclinicalsymptoms/:patientId/add',
        '/clinicalsymptoms/:patientId',
        '/medicalfolder/listlaboratory/updatelaboratory/:id',
        '/medicalfolder/listlaboratory/:patientId',
        '/listlaboratory',
        '/medicalfolder/listlaboratory/:patientId/add',
        '/laboratory/:patientId',
        '/medicaltreatment',
        '/medicalfolder/listmedicaltreatment/updatemedicaltreatment/:id',
        '/medicaltreatment/:patientId',
        '/listmedicaltreatment/:patientId',
        '/listmedicaltreatment/:patientId/add',
        '/listofallpatients',
      ],
      pharmacien: [
        '/listofmedicalprescriptions',
        '/listofmedicalprescriptions/:patientId',
        '/updatetreatmentbypharmacie/:treatmentId',
      ],
      admin: [
        '/managetreatmentForm',
        '/manageaccess',

      ]
    };

    const authorizedRoutes = accessRules[role] || [];

    // Fonction pour gérer les routes dynamiques avec paramètres
    function matchRoute(routePattern: string, url: string): boolean {
      // Supprimer les éventuels query params ou fragments
      const cleanUrl = url.split('?')[0].split('#')[0].replace(/\/$/, '');

      const regex = new RegExp('^' + routePattern.replace(/:[^/]+/g, '[^/]+') + '$');
      const result = regex.test(cleanUrl);

      console.log(`⛳️ Test de "${routePattern}" avec URL "${cleanUrl}" ➤ Résultat :`, result);

      return result;
    }


    // Vérifie si l’URL demandée correspond à l’une des routes autorisées
    const isAuthorized = authorizedRoutes.some(route => matchRoute(route, url));

    if (isAuthorized) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}
