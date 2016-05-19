import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PracticeBuddyClientAppComponent } from '../app/practice-buddy-client.component';

beforeEachProviders(() => [PracticeBuddyClientAppComponent]);

describe('App: PracticeBuddyClient', () => {
  it('should create the app',
      inject([PracticeBuddyClientAppComponent], (app: PracticeBuddyClientAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'practice-buddy-client works!\'',
      inject([PracticeBuddyClientAppComponent], (app: PracticeBuddyClientAppComponent) => {
    expect(app.title).toEqual('practice-buddy-client works!');
  }));
});
