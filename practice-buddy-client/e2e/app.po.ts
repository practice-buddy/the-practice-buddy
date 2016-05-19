export class PracticeBuddyClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('practice-buddy-client-app h1')).getText();
  }
}
