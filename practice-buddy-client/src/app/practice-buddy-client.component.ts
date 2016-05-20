import { Component } from '@angular/core';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { ExecuteComponent } from './+execute';
import { ManageComponent } from './+manage';

@Component({
  moduleId: module.id,
  selector: 'practice-buddy-client-app',
  templateUrl: 'practice-buddy-client.component.html',
  styleUrls: ['practice-buddy-client.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/execute', component: ExecuteComponent},
  {path: '/manage', component: ManageComponent}
])
export class PracticeBuddyClientAppComponent {
  title = 'practice-buddy-client works!';
}
