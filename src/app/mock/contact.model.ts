export class CmContact {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  email?: string;
  friends: number[] = [];
  birthday?: Date;
  favorite?: boolean;
}

export class CmPagingContacts {
  total: number;
  contacts: CmContact[];
}
