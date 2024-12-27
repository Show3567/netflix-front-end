import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-main-questions',
  templateUrl: './main-questions.component.html',
  styleUrls: ['./main-questions.component.scss'],
})
export class MainQuestionsComponent implements OnInit {
  panelOpenState = false;
  questionList: { title: string; description: string }[] = [
    {
      title: 'What is Netflix?',
      description:
        'Netflix is a streaming service that offers a wide variety of award-winning TV shows, ' +
        'movies, anime, documentaries, and more on thousands of internet-connected devices. ' +
        '\n' +
        '\n' +
        'You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. ' +
        "There's always something new to discover and new TV shows and movies are added every week!",
    },
    {
      title: 'How much does Netflix cost?',
      description:
        'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, ' +
        'all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts.',
    },
    {
      title: 'Where can I watch?',
      description:
        'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com ' +
        'from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, ' +
        'smartphones, tablets, streaming media players and game consoles.' +
        '\n' +
        '\n' +
        'You can also download your favorite shows with the iOS, Android, or Windows 10 app. ' +
        "Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    },
    {
      title: 'How do I cancel?',
      description:
        'Netflix is flexible. There are no pesky contracts and no commitments. ' +
        'You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    },
    {
      title: 'What can I watch on Netflix?',
      description:
        'Netflix has an extensive library of feature films, documentaries, TV shows, anime, ' +
        'award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
    },
    {
      title: 'Is Netflix good for kids?',
      description:
        'The Netflix Kids experience is included in your membership to give parents control ' +
        'while kids enjoy family-friendly TV shows and movies in their own space.' +
        '\n' +
        '\n' +
        'Kids profiles come with PIN-protected parental controls that let you restrict ' +
        'the maturity rating of content kids can watch and block specific titles you don’t want kids to see.',
    },
  ];
  form!: UntypedFormGroup;
  get email() {
    return this.form.get('email');
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(45), Validators.email],
      ],
    });
  }

  ngOnDestroy(): void {}

  onSubmit() {
    // console.log(this.form.value);
  }
}
