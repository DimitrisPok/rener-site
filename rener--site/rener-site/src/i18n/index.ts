import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        about: "ABOUT US",
        solutions: "SOLUTIONS", 
        contact: "CONTACT",
        careers: "CAREERS"
      },
      hero: {
        title: "RENER ENERGY",
        subtitle: "Energy Management System Services",
        cta: "Learn More"
      },
      about: {
        title: "ABOUT US",
        subtitle: "Leading the way in renewable energy solutions",
        description: "RENER ENERGY SA, a subsidiary of the KTISTOR Group, specializes in providing comprehensive energy management software systems solutions.\n\nOur goal is to offer excellence in the energy management sector, providing innovative solutions that meet the modern challenges of the energy market.\n\nRENER ENERGY SA aims to create long-term trust relationships with its partners and clients, providing reliable solutions supported by a team of specialized professionals, dedicated to the continuous provision of innovation and quality.",
        team: "Specialized Team",
        certified: "Certified Solutions", 
        innovation: "Innovative Technology",
        support: "24/7 Support"
      },
      solutions: {
        title: "ACTIVITIES",
        subtitle: "RENER ENERGY SA is an innovative technology company in the energy sector, specializing in software solutions and consulting services for Renewable Energy Sources and CHPS.",
        scadaPv: {
          title: "SCADA Software for PV",
          description: "Advanced Supervisory Control and Data Acquisition system for PV stations."
        },
        scadaEmsBess: {
          title: "SCADA and EMS Software for BESS",
          description: "Advanced Supervisory Control and Data Acquisition and Energy Management Systems for storage stations."
        },
        nexus: {
          title: "NEXUS Platform",
          description: "Unified platform for monitoring and control of PV stations and CHPS."
        },
        monitoring: {
          title: "Remote monitoring and control of RES Stations by DEDDIE",
          description: "Comprehensive solution covering the requirements for remote control of Photovoltaic Stations according to DEDDIE specifications."
        },
        interestForm: {
          button: "Express Interest",
          title: "INTEREST FORM FOR EMS / SCADA CHPS",
          sectionCompany: "A. Company Information",
          sectionPark: "B. Park Information",
          companyName: "Company name",
          contactPerson: "Contact person",
          email: "Email",
          phone: "Phone",
          parkType: "Type (Standalone/Hybrid)",
          location: "Location",
          powerMw: "Power (MW)",
          capacityMwh: "Capacity (MWh)",
          connectionTerms: "Connection Terms (YES/NO)",
          comments: "Additional Information/Comments",
          submit: "Submit Interest Form",
          close: "Close",
          typeOptions: {
            standalone: "Standalone",
            hybrid: "Hybrid"
          },
          connectionOptions: {
            yes: "YES",
            no: "NO"
          },
          successMessage: "Your interest form has been submitted successfully.",
          sending: "Sending...",
          errorMessage: "An error occurred while sending the form. Please try again."
        }
      },
      contact: {
        title: "CONTACT",
        address: "Address",
        phones: "Phones",
        email: "Email",
        form: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message", 
          send: "Send Message",
          successMessage: "Your message has been sent successfully! We will contact you as soon as possible.",
          errorMessage: "An error occurred while sending. Please try again.",
          requiredFields: "Please fill in all fields.",
          invalidEmail: "Please enter a valid email address."
        }
      },
      careers: {
        title: "CAREERS",
        pageTitle: "Careers at RENER ENERGY",
        subtitle: "Join our team and help shape the future of renewable energy",
        backToJobs: "Back to Jobs",
        applyNow: "Apply Now",
        whyWorkWithUs: {
          title: "Why Work With Us",
          continuousTraining: {
            title: "Continuous Training",
            description: "We invest in your growth with continuous training and certifications in the latest technologies"
          },
          flexibleSchedule: {
            title: "Flexible Schedule", 
            description: "We provide flexible working hours and remote work opportunities for better work-life balance"
          },
          innovativeProjects: {
            title: "Innovative Projects",
            description: "Participate in cutting-edge renewable energy projects that shape the future"
          }
        },
        availablePositions: "Available Positions",
        viewDetails: "View Details",
        applicationProcess: {
          title: "Application Process",
          step1: {
            title: "Apply",
            description: "Send us your CV for the position that interests you"
          },
          step2: {
            title: "Screening",
            description: "Initial evaluation by our HR team"
          },
          step3: {
            title: "Interview",
            description: "Technical interview with team leads"
          },
          step4: {
            title: "Offer",
            description: "Job offer and onboarding"
          }
        },
        questions: {
          title: "Have Questions?",
          description: "Contact us for more information about available positions",
          contact: "Contact"
        },
        footer: {
          copyright: "© 2024 RENER ENERGY SA. All rights reserved. | Member of KTISTOR Group",
          backToHome: "← Back to Home"
        },
        jobDetail: {
          backToJobs: "Back to Positions",
          jobDescription: "Job Description"
        },
        jobs: {
          electricalEngineer: {
            title: "Electrical Engineer",
            shortDescription: "We are looking for an Electrical Engineer to support RES and CHPS projects. Experience in power systems and renewable energy will be highly appreciated.",
            fullDescription: "RENER ENERGY is looking for an Electrical Engineer to strengthen our technical team.\n\nMain Responsibilities:\n• Study and design of Photovoltaic Stations\n• Analysis and optimization of power systems\n• Support of CHPS technical specifications\n• Cooperation with DEDDIE for interconnection requirements\n• Technical support for existing projects\n\nRequired Qualifications:\n• Degree in Electrical Engineering or Computer Engineering\n• 3-5 years of experience in power systems\n• Knowledge of AutoCAD and design software\n• Experience with PV design software\n• Knowledge of Grid Code and interconnection regulations\n\nBenefits:\n• Competitive salary according to experience\n• Hybrid work (3 days office, 2 remote)\n• Professional development opportunities\n• Participation in innovative RES projects",
            skills: ["Power Systems", "AutoCAD", "PV Design", "Grid Code"]
          },
          softwareEngineer: {
            title: "Software Engineer", 
            shortDescription: "Experienced Software Engineer wanted for SCADA systems development and energy management platforms. Experience in C#, .NET, and databases required.",
            fullDescription: "RENER ENERGY is looking for an experienced Software Engineer to join our software development team.\n\nMain Responsibilities:\n• Development and maintenance of SCADA systems for Photovoltaic Stations\n• Design and implementation of Energy Management Systems (EMS)\n• Collaboration with the team for developing advanced prediction algorithms\n• Code review and mentoring of team members\n• Participation in architectural design of new projects\n\nRequired Qualifications:\n• Degree in Computer Science or related field\n• 5+ years of experience in C# and .NET Framework/Core\n• Experience with SQL Server and databases\n• Knowledge of SCADA systems will be highly appreciated\n• English at communication level\n\nBenefits:\n• Competitive salary\n• Flexible working hours\n• Remote work opportunity\n• Private health insurance\n• Continuous training and development",
            skills: ["C#", ".NET", "SQL Server", "SCADA"]
          }
        },
        tags: {
          fullTime: "Full-time",
          partTime: "Part-time", 
          remote: "Remote",
          hybrid: "Hybrid",
          onSite: "On-site",
          midLevel: "Mid-level",
          entryLevel: "Entry-level"
        },
        form: {
          name: "Full Name",
          email: "Email",
          phone: "Phone",
          position: "Position of Interest",
          cv: "Upload CV (PDF only, max 10MB)",
          message: "Cover Letter",
          send: "Submit Application",
          title: "Apply for Position",
          subtitle: "Fill in your details and we will contact you as soon as possible.",
          dragDropCv: "Drag and drop your CV here",
          clickToSelect: "or click to select file (PDF only, max 10MB)",
          cvWillBeSaved: "Your CV will be stored securely and reviewed by our team.",
          requiredFields: "Please fill in all required fields.",
          successMessage: "Your application has been sent successfully! We will contact you as soon as possible. Note: Your CV has been saved and will be reviewed.",
          errorMessage: "An error occurred while sending. Please try again.",
          fileUpload: {
            label: "CV (PDF) *",
            dragHere: "Drag and drop your CV here",
            clickToSelect: "or click to select file (PDF only, max 10MB)",
            fileSelected: "CV selected",
            clickToChange: "Click to change file",
            removeFile: "Remove file",
            pdfOnlyError: "Please select only PDF files for your CV.",
            fileTooLargeError: "File is too large. Please select a file smaller than 10MB."
          }
        }
      },
      footer: {
        subtitle: "Energy Management System Services",
        links: "Links",
        about: "About Us",
        solutions: "Solutions", 
        contact: "Contact",
        careers: "Careers",
        contactInfo: "Contact",
        address1: "Adrianeiou 32, 11525",
        address2: "Neo Psychiko, Athens",
        phone: "Tel: 2106748239",
        mobile: "Mob: 6970067029",
        copyright: "© 2024 RENER ENERGY SA. All rights reserved."
      }
    }
  },
  el: {
    translation: {
      nav: {
        about: "ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ",
        solutions: "ΛΥΣΕΙΣ",
        contact: "ΕΠΙΚΟΙΝΩΝΙΑ", 
        careers: "ΚΑΡΙΕΡΕΣ"
      },
      hero: {
        title: "RENER ENERGY",
        subtitle: "Energy Management System Services",
        cta: "Μάθετε Περισσότερα"
      },
      about: {
        title: "ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ",
        subtitle: "Πρωτοπορούμε στις λύσεις ανανεώσιμης ενέργειας",
        description: "Η RENER ENERGY SA, μέλος του Ομίλου ΚΤΙΣΤΩΡ, εξειδικεύεται στην παροχή ολοκληρωμένων λύσεων energy management software systems.\n\nΣτόχος μας είναι να προσφέρουμε στον τομέα της διαχείρισης ενέργειας, παρέχοντας καινοτόμες λύσεις που ανταποκρίνονται στις σύγχρονες προκλήσεις της αγοράς ενέργειας.\n\nΗ RENER ENERGY SA στοχεύει στη δημιουργία μακροχρόνιων σχέσεων εμπιστοσύνης με τους συνεργάτες και τους πελάτες της, παρέχοντας αξιόπιστες λύσεις που υποστηρίζονται από μια ομάδα εξειδικευμένων επαγγελματιών, αφοσιωμένων στη συνεχή παροχή καινοτομίας και ποιότητας.",
        team: "Εξειδικευμένη Ομάδα",
        certified: "Πιστοποιημένες Λύσεις",
        innovation: "Καινοτόμα Τεχνολογία", 
        support: "24/7 Υποστήριξη"
      },
      solutions: {
        title: "ΔΡΑΣΤΗΡΙΟΠΟΙΗΣΗ",
        subtitle: "Η RENER ENERGY SA είναι μια καινοτόμος εταιρεία τεχνολογίας στον ενεργειακό τομέα, με εξειδίκευση στις λύσεις λογισμικού και τις συμβουλευτικές υπηρεσίες για Ανανεώσιμες Πηγές Ενέργειας και ΣΑΗΕ.",
        scadaPv: {
          title: "Λογισμικό SCADA για PV",
          description: "Προηγμένο σύστημα Supervisory Control and Data Acquisition για ΦΒ σταθμούς."
        },
        scadaEmsBess: {
          title: "Λογισμικό SCADA και EMS για BESS",
          description: "Προηγμένα συστήματα Supervisory Control and Data Acquisition και Energy Management Systems για σταθμούς αποθήκευσης"
        },
        nexus: {
          title: "Πλατφόρμα NEXUS",
          description: "Ενοποιημένη πλατφόρμα για την παρακολούθηση και έλεγχο ΦΒ σταθμών και ΣΑΗΕ."
        },
        monitoring: {
          title: "Τηλεποπτεία και έλεγχος Σταθμών ΑΠΕ από τον ΔΕΔΔΗΕ",
          description: "Ολοκληρωμένη λύση που καλύπτει τις απαιτήσεις τηλεχειρισμού Φωτοβολταϊκών Σταθμών σύμφωνα με τις προδιαγραφές του ΔΕΔΔΗΕ."
        },
        interestForm: {
          button: "Εκδήλωση Ενδιαφέροντος",
          title: "ΦΟΡΜΑ ΕΝΔΙΑΦΕΡΟΝΤΟΣ ΓΙΑ EMS / SCADA ΣΑΗΕ",
          sectionCompany: "Α. Στοιχεία Εταιρείας",
          sectionPark: "Β. Στοιχεία Πάρκου",
          companyName: "Επωνυμία εταιρείας",
          contactPerson: "Υπεύθυνος Επικοινωνίας",
          email: "Email",
          phone: "Τηλέφωνο",
          parkType: "Τύπος (Standalone/Hybrid)",
          location: "Θέση",
          powerMw: "Ισχύς (MW)",
          capacityMwh: "Χωρητικότητα (MWh)",
          connectionTerms: "Όροι Σύνδεσης (ΝΑΙ/ΟΧΙ)",
          comments: "Πρόσθετες Πληροφορίας/Σχόλια",
          submit: "Αποστολή Φόρμας Ενδιαφέροντος",
          close: "Κλείσιμο",
          typeOptions: {
            standalone: "Standalone",
            hybrid: "Hybrid"
          },
          connectionOptions: {
            yes: "ΝΑΙ",
            no: "ΟΧΙ"
          },
          successMessage: "Η φόρμα ενδιαφέροντος υποβλήθηκε επιτυχώς.",
          sending: "Αποστολή...",
          errorMessage: "Προέκυψε σφάλμα κατά την αποστολή της φόρμας. Παρακαλώ δοκιμάστε ξανά."
        }
      },
      contact: {
        title: "ΕΠΙΚΟΙΝΩΝΙΑ",
        address: "Διεύθυνση",
        phones: "Τηλέφωνα",
        email: "Email",
        form: {
          name: "Όνομα",
          email: "Email",
          subject: "Θέμα",
          message: "Μήνυμα", 
          send: "Αποστολή Μηνύματος",
          successMessage: "Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
          errorMessage: "Προέκυψε σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.",
          requiredFields: "Παρακαλώ συμπληρώστε όλα τα πεδία.",
          invalidEmail: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email."
        }
      },
      careers: {
        title: "ΚΑΡΙΕΡΕΣ",
        pageTitle: "Καριέρες στη RENER ENERGY",
        subtitle: "Ενταχθείτε στην ομάδα μας και βοηθήστε να διαμορφώσουμε το μέλλον της ανανεώσιμης ενέργειας",
        backToJobs: "Επιστροφή στις Θέσεις",
        applyNow: "Κάντε Αίτηση",
        whyWorkWithUs: {
          title: "Γιατί να Εργαστείτε Μαζί Μας",
          continuousTraining: {
            title: "Συνεχής Εκπαίδευση",
            description: "Επενδύουμε στην εξέλιξή σας με συνεχείς εκπαιδεύσεις και πιστοποιήσεις στις νεότερες τεχνολογίες"
          },
          flexibleSchedule: {
            title: "Ευέλικτο Ωράριο",
            description: "Παρέχουμε ευέλικτο ωράριο εργασίας και δυνατότητες εργασίας από το σπίτι για καλύτερη ισορροπία ζωής-εργασίας"
          },
          innovativeProjects: {
            title: "Καινοτόμα Έργα",
            description: "Συμμετοχή σε πρωτοποριακά έργα ανανεώσιμης ενέργειας που διαμορφώνουν το μέλλον"
          }
        },
        availablePositions: "Διαθέσιμες Θέσεις",
        viewDetails: "Λεπτομέρειες",
        applicationProcess: {
          title: "Διαδικασία Αίτησης",
          step1: {
            title: "Αίτηση",
            description: "Στείλτε το βιογραφικό σας για τη θέση που σας ενδιαφέρει"
          },
          step2: {
            title: "Screening",
            description: "Αρχική αξιολόγηση από την ομάδα HR"
          },
          step3: {
            title: "Συνέντευξη",
            description: "Τεχνική συνέντευξη με τους team leads"
          },
          step4: {
            title: "Προσφορά",
            description: "Προσφορά εργασίας και onboarding"
          }
        },
        questions: {
          title: "Έχετε Ερωτήσεις;",
          description: "Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες σχετικά με τις διαθέσιμες θέσεις",
          contact: "Επικοινωνία"
        },
        footer: {
          copyright: "© 2024 RENER ENERGY SA. Όλα τα δικαιώματα διατηρούνται. | Μέλος του Ομίλου ΚΤΙΣΤΩΡ",
          backToHome: "← Επιστροφή στην Αρχική"
        },
        jobDetail: {
          backToJobs: "Επιστροφή στις Θέσεις",
          jobDescription: "Περιγραφή Θέσης"
        },
        jobs: {
          electricalEngineer: {
            title: "Ηλεκτρολόγος Μηχανικός",
            shortDescription: "Αναζητούμε Ηλεκτρολόγο Μηχανικό για την υποστήριξη έργων ΑΠΕ και ΣΑΗΕ. Εμπειρία σε power systems και renewable energy θα εκτιμηθεί ιδιαίτερα.",
            fullDescription: "Η RENER ENERGY αναζητά έναν Ηλεκτρολόγο Μηχανικό για την ενίσχυση της τεχνικής μας ομάδας.\n\nΚύριες Αρμοδιότητες:\n• Μελέτη και σχεδιασμός Φωτοβολταϊκών Σταθμών\n• Ανάλυση και βελτιστοποίηση power systems\n• Υποστήριξη τεχνικών προδιαγραφών ΣΑΗΕ\n• Συνεργασία με τον ΔΕΔΔΗΕ για απαιτήσεις διασύνδεσης\n• Τεχνική υποστήριξη σε υπάρχοντα έργα\n\nΑπαιτούμενα Προσόντα:\n• Πτυχίο Ηλεκτρολόγου Μηχανικού ή Μηχανικού Η/Υ και Πληροφορικής\n• 3-5 χρόνια εμπειρίας σε power systems\n• Γνώση AutoCAD και σχεδιαστικών προγραμμάτων\n• Εμπειρία με PV design software\n• Γνώση Grid Code και κανονισμών διασύνδεσης\n\nΠαροχές:\n• Ανταγωνιστικός μισθός ανάλογα με την εμπειρία\n• Hybrid εργασία (3 ημέρες γραφείο, 2 remote)\n• Δυνατότητες επαγγελματικής εξέλιξης\n• Συμμετοχή σε καινοτόμα έργα ΑΠΕ",
            skills: ["Power Systems", "AutoCAD", "PV Design", "Grid Code"]
          },
          softwareEngineer: {
            title: "Software Engineer",
            shortDescription: "Ζητείται έμπειρος Software Engineer για ανάπτυξη SCADA συστημάτων και energy management platforms. Απαιτείται εμπειρία σε C#, .NET, και βάσεις δεδομένων.",
            fullDescription: "Η RENER ENERGY αναζητά έναν έμπειρο Software Engineer για να ενταχθεί στην ομάδα ανάπτυξης λογισμικού μας.\n\nΚύριες Αρμοδιότητες:\n• Ανάπτυξη και συντήρηση SCADA συστημάτων για Φωτοβολταϊκούς Σταθμούς\n• Σχεδιασμός και υλοποίηση Energy Management Systems (EMS)\n• Συνεργασία με την ομάδα για την ανάπτυξη προηγμένων αλγορίθμων πρόβλεψης\n• Code review και mentoring μελών της ομάδας\n• Συμμετοχή στον αρχιτεκτονικό σχεδιασμό νέων projects\n\nΑπαιτούμενα Προσόντα:\n• Πτυχίο στην Πληροφορική ή συναφές πεδίο\n• 5+ χρόνια εμπειρίας σε C# και .NET Framework/Core\n• Εμπειρία με SQL Server και βάσεις δεδομένων\n• Γνώση SCADA συστημάτων θα εκτιμηθεί ιδιαίτερα\n• Αγγλικά σε επίπεδο επικοινωνίας\n\nΠαροχές:\n• Ανταγωνιστικός μισθός\n• Ευέλικτο ωράριο εργασίας\n• Δυνατότητα remote εργασίας\n• Ιδιωτική ασφάλεια υγείας\n• Συνεχής εκπαίδευση και ανάπτυξη",
            skills: ["C#", ".NET", "SQL Server", "SCADA"]
          }
        },
        tags: {
          fullTime: "Πλήρης Απασχόληση",
          partTime: "Μερική Απασχόληση",
          remote: "Εξ' Αποστάσεως",
          hybrid: "Hybrid",
          onSite: "Στο Γραφείο",
          midLevel: "Μεσαίο Επίπεδο",
          entryLevel: "Εισαγωγικό Επίπεδο"
        },
        form: {
          name: "Πλήρες Όνομα",
          email: "Email",
          phone: "Τηλέφωνο",
          position: "Θέση Ενδιαφέροντος",
          cv: "Ανέβασμα CV (μόνο PDF, μέγιστο 10MB)",
          message: "Συνοδευτική Επιστολή",
          send: "Υποβολή Αίτησης",
          title: "Αίτηση για τη θέση",
          subtitle: "Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
          dragDropCv: "Σύρετε το βιογραφικό εδώ",
          clickToSelect: "ή κάντε κλικ για να επιλέξετε αρχείο (PDF μόνο, μέγιστο 10MB)",
          cvWillBeSaved: "Το βιογραφικό σας θα αποθηκευτεί με ασφάλεια και θα εξεταστεί από την ομάδα μας.",
          requiredFields: "Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία.",
          successMessage: "Η αίτησή σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό. Σημείωση: Το βιογραφικό σας αποθηκεύτηκε και θα το εξετάσουμε.",
          errorMessage: "Προέκυψε σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.",
          fileUpload: {
            label: "Βιογραφικό (PDF) *",
            dragHere: "Σύρετε και αφήστε το βιογραφικό σας εδώ",
            clickToSelect: "ή κάντε κλικ για επιλογή αρχείου (μόνο PDF, μέγιστο 10MB)",
            fileSelected: "Βιογραφικό επιλέχθηκε",
            clickToChange: "Κάντε κλικ για αλλαγή αρχείου",
            removeFile: "Αφαίρεση αρχείου",
            pdfOnlyError: "Παρακαλώ επιλέξτε μόνο αρχεία PDF για το βιογραφικό σας.",
            fileTooLargeError: "Το αρχείο είναι πολύ μεγάλο. Παρακαλώ επιλέξτε αρχείο μικρότερο από 10MB."
          }
        }
      },
      footer: {
        subtitle: "Energy Management System Services",
        links: "Σύνδεσμοι",
        about: "Σχετικά με εμάς",
        solutions: "Λύσεις", 
        contact: "Επικοινωνία",
        careers: "Καριέρες",
        contactInfo: "Επικοινωνία",
        address1: "Αδριανείου 32, 11525",
        address2: "Νέο Ψυχικό, Αθήνα",
        phone: "Τηλ: 2106748239",
        mobile: "Κιν: 6970067029",
        copyright: "© 2024 RENER ENERGY SA. Όλα τα δικαιώματα διατηρούνται."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'el', // Default to Greek
    lng: 'el', // Default language
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;