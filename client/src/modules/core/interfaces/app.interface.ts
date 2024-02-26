import { User } from '../../authentication/interfaces';

export type AppType = {
  id: string;
  name: string;
  owner: User;
  release: boolean;
  pageId?: string;
};

export type AppicationType = {
  id: string;
  name: string;
  owner: User;
  users: User[];
  release: boolean;
  versions: VersionType[];
};

export type VersionType = {
  createdAt: string;
  id: string;
  name: string;
  appId: string;
  released: boolean;
  defination: any;
};

// "name": "demo100",
//     "owner": {
//         "id": "1124a292-6ee7-4995-9923-b6d0e944f863",
//         "name": "Bhavya Goyal",
//         "email": "bhavyagoyal54@gmail.com"
//     },
//     "users": [
//         {
//             "id": "1124a292-6ee7-4995-9923-b6d0e944f863",
//             "name": "Bhavya Goyal",
//             "email": "bhavyagoyal54@gmail.com"
//         }
//     ],
//     "release": null,
//     "id": "f58c01ad-41d5-4480-911d-cbcbf62c571f"
