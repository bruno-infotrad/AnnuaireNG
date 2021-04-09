import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = {
    username: '',
    firstname: '',
    lastname: '',
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      title: this.user.title,
      description: this.user.description
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      firstname: '',
      lastname: '',
      title: '',
      description: '',
      published: false
    };
  }

}
