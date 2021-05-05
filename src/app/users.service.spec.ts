import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  class UserData {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const dummyUsers: UserData[] = [
      {
        name: 'test',
        username: 'test',
        email: 'test',
        phone: 'test',
        website: 'test'
      }
    ];

    service.getData().subscribe((users: UserData[]) => {
      expect(users.length).toBe(1);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    console.log(req.request.method);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  // TODO: Write test by using `httpMock`
});
