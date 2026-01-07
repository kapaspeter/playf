export const defaultLocale = 'en';
export const locales = ['en', 'hu', 'ro'] as const;

export type Locale = (typeof locales)[number];

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.reservation': 'Reservation',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.participants': 'Number of Participants',
    'form.package': 'Package',
    'form.package.basic': 'Basic Playground',
    'form.package.birthday': 'Birthday Party',
    'form.package.corporate': 'Corporate Event',
    'form.submit': 'Reserve Now',
    'form.success.title': 'Thank you!',
    'form.success.message': 'Your reservation request has been received. We will contact you soon.',
    'form.error.required': 'is required',
    'form.error.email': 'Email is invalid',
    'form.error.participants': 'At least 1 participant is required',
    'form.error.participants.max': 'Maximum 10 participants allowed',
  },
  hu: {
    'nav.home': 'Főoldal',
    'nav.about': 'Rólunk',
    'nav.services': 'Szolgáltatások',
    'nav.gallery': 'Galéria',
    'nav.reservation': 'Foglalás',
    'form.name': 'Név',
    'form.email': 'Email',
    'form.phone': 'Telefonszám',
    'form.date': 'Dátum',
    'form.time': 'Időpont',
    'form.participants': 'Résztvevők száma',
    'form.package': 'Csomag',
    'form.package.basic': 'Alap játszótér',
    'form.package.birthday': 'Születésnapi parti',
    'form.package.corporate': 'Céges esemény',
    'form.submit': 'Foglalás most',
    'form.success.title': 'Köszönjük!',
    'form.success.message': 'Foglalási igényét megkaptuk. Hamarosan felvesszük Önnel a kapcsolatot.',
    'form.error.required': 'kötelező',
    'form.error.email': 'Érvénytelen email cím',
    'form.error.participants': 'Legalább 1 résztvevő szükséges',
    'form.error.participants.max': 'Maximum 10 résztvevő engedélyezett',
  },
  ro: {
    'nav.home': 'Acasă',
    'nav.about': 'Despre noi',
    'nav.services': 'Servicii',
    'nav.gallery': 'Galerie',
    'nav.reservation': 'Rezervare',
    'form.name': 'Nume',
    'form.email': 'Email',
    'form.phone': 'Telefon',
    'form.date': 'Data',
    'form.time': 'Ora',
    'form.participants': 'Număr de participanți',
    'form.package': 'Pachet',
    'form.package.basic': 'Loc de joacă de bază',
    'form.package.birthday': 'Petrecere aniversară',
    'form.package.corporate': 'Eveniment corporate',
    'form.submit': 'Rezervă acum',
    'form.success.title': 'Vă mulțumim!',
    'form.success.message': 'Cererea dumneavoastră de rezervare a fost primită. Vă vom contacta în curând.',
    'form.error.required': 'este obligatoriu',
    'form.error.email': 'Email-ul este invalid',
    'form.error.participants': 'Este necesar cel puțin 1 participant',
    'form.error.participants.max': 'Sunt allowed maximum 10 participanți',
  },
} as const;

export function getRelativeLocaleUrl(locale: string, path: string = '') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key];
  }
}
