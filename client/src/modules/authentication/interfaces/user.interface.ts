export interface UserLanguage {
  name: string;
  value: string;
}

export interface UserSettings {
  language: UserLanguage;
  timezone: string;
  locale: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  ownedApps: any[];
}

// {
//     "language": {
//         "name": "English",
//         "value": "en"
//     },
//     "timezone": "Asia/Kolkata",
//     "locale": "en_US"
// }
