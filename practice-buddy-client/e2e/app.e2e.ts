import { PracticeBuddyClientPage } from './app.po';

describe('practice-buddy-client App', function() {
  let page: PracticeBuddyClientPage;

  beforeEach(() => {
    page = new PracticeBuddyClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('practice-buddy-client works!');
  });
});
