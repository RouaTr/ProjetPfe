import { Patient } from "./Patient.Entity";

export class Laboratory{
  constructor(
    public id?: number,
    public medicaltestDate?: Date,
    public chemistrytestDate?: Date,
    public cbcTestDate?: Date,
    public serologytestDate?: Date,

    // Chemistry values
    public potassium?: number,
    public sodium?: number,
    public calcium?: number,
    public phosphorus?: number,
    public magnesium?: number,
    public urea?: number,
    public creatinine?: number,
    public alat?: number,  // ALT
    public asat?: number,  // AST
    public ggt?: number,   // GGT
    public pal?: number,   // ALP
    public directBilirubin?: number,
    public totalBilirubin?: number,
    public albumin?: number,
    public troponin?: number,
    public lipase?: number,

    // NFS (Complete Blood Count)
    public wbc?: number,  // GB (Globules Blancs)
    public neutrophilsAbs?: number,  // GNN#
    public eosinophilsAbs?: number,  // Eo#
    public rbc?: number,  // GR
    public hemoglobin?: number,  // HGB
    public hematocrit?: number,  // HCT
    public mcv?: number,  // VGM
    public mch?: number,  // TCMH
    public mchc?: number,  // CCMH
    public rdwCv?: number,  // IDR
    public platelets?: number,  // PLT
    public mpv?: number,  // VPM
    public monocytesPercentage?: number,  // Mono%
    public lymphocytesPercentage?: number,  // Lymph%
    public eosinophilsPercentage?: number,  // Eos%
    public basophilsPercentage?: number,  // Bas%
    public neutrophilsPercentage?: number,  // PNN%
    public lymphocytesAbs?: number,  // Lymph#
    public basophilsAbs?: number,
    public monocytesAbs?: number,  // Bas#
    public iono?: number,  // Ionogramme
    public vitaminD?: number,  // Vitamine D
    public urineTestStrips?: number,  // Bandelettes urinaires
    public fastingBloodGlucose?: number,  // Glycémie à jeun

    // Lipid profile
    public hdl?: number, // HDL
    public ldl?: number, // LDL
    public totalCholesterol?: number, // Cholestérol total (CHT)
    public triglycerides?: number, // Triglycérides (TG)

    // Serologies
    public hepatitisAIgG?: string,
    public hepatitisAIgM?: string, // Hépatite A Igm
    public hepatitisBAgHbs?: string, // Antigène HBs
    public hepatitisBAntiHbc?: string, // Anti-HBc
    public hepatitisBAntiHbs?: number, // Anti-HBs
    public hepatitisC?: string, // Hépatite C
    public syphilisTpha?: string, // SyphilisTpha
    public syphilisVdrl?: string, // SyphilisVdrl
    public cmvIgG?: string,
    public cmvIgM?: string, // Cytomégalovirus (CMV)
    public toxoplasmosis?: string, // Toxoplasmose
    public leishmaniasis?: string, // Leishmaniose
    public tuberculinTest?: string, // IDR à la tuberculine
    public quantiferonTest?: string, // Test au Quantiféron
    public chestXRay?: string, // Radiothorax

    // Complementary exams
    public proctologicExam?: string, // Examen proctologique
    public viralLoad?: number, // Charge virale
    public cd4Count?: number, // Taux de CD4
    public genotypicResistanceTest?: string,  // Resistance test

    // Relation with Patient
    public patient?: Patient
  ) {}
}
