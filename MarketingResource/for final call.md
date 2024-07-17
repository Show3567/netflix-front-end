1. ### why should we hire you

   I am a problem solver, a self-learner. I have almost 6 years of experience which make me a professional coder. Whenever I see something I don’t understand, I will read documentation, undstanding it and do some demos for new technologies. 

   This is an angular position, I think I am perfectly fit with this position. I have lots of experience about angular and web development that might contribute some new thoughts when the team needs some new ideas. I also work with different backend technologies such as java spring. I can quickly adopt to different team and projects with my past experience.

   Also, I am a team worker. I really enjoy being a part of a team and I am more efficient when I'm able to effectively collaborate with others. In my last position, I was able to communicate with my team to generate a creative solution and then explain it to peers in marketing and sales that lack technical knowledge.

   

2. ### Why do you choose CVS

   Cvs is one of the top-level companies in US, I am really looking forward to learn some cutting edge technology in CVS.

   Yestaday, I interviewed with you. The interviewer told me that you are planning to update your application to angular11. It sounds really interesting to me. I am also learning the micro-front-end and module federation right now. Module federation is a new technology in Angular 11.  It lets you combine separate builds to form a single application and release the front-end architecture. So we can use multiple front-end framework like react and angular in a single application.

   

   (It allows JavaScript application to dynamically import code from another application at runtime)

   

3. ### What is your short term goal

   If I get the position, first I would like to be fully responsible of my job. Collaborating with my teammate and helping the team to build something really awesome.

   As an Angular developer, I always want to become an expert of Javascript and angular.

   Learning some new techniques and keep updating myself.

4. ### What is your long term goal

   For long term goal, I want to understand more about the business logic of the company. As a front-end developer, I works across different industry. But I mainly focus on the technique part and barely care about the business logic behind the application. In the future, I want to pay more attention on the customer service and web design. I want to be a web architect in the future.

5. ### conflict

   #### with manager

   For my last project, first we are using behaviorSubject to manage the state. When the application became bigger and bigger, it is really hard to track the data flow.  The data flow can be a mess. From the perspective of developers, I thought it was time to update our application and use NGRX to manage the state. So we would have only one data flow in our application. It would became more secure and easier to manage. But our team leader disagree with me. Because we were very closed to Q2 release, and from his perspective, there was no business value to upgrade the application now. We had a session to share our thought together, came up with pros and cons. We follow the agree with disagree rule, not about who is right or wrong. It is very common. At the end, we got an agreement. We would spend two sprint to mitigrate the app in Q3.

   

   **Weakness**

   It is one of my weakness. Sometimes, I only care about the development part and do not have enough understanding about business logic.

   

   Quarter realease

   on call ---> fix bug

   

   #### with UI designer

   I had a conflict with UX designer. There was a popup that has autofocus on the Yes button. The popup was about deleting a row of transaction data in a table. For my developer standpoint, I think it is dangerous to have autofocus on Yes when dealing with deletion on important information. I then discussed this issue with my UX designer. He thought the autofocus should be put on Yes normally. It would provide better user experience.  We grouped a meeting to discuss about the pros and cons. By the end, we cancel the autofocus for security reason. It is nothing personal. We just look at things in a different perspective.  Taking perspective of others really helps me collabrate with my co-worker.

6. ### Do you familiar with agile development

   #### Have you did any peer review

   - **We use scrum and our sprint size is two weeks.**

   - **We have sprint planning meeting at the beginning of every sprint. The PO will put all the tickets into the jira backlog. Our team will go through them, seperate the user story into small task, discuss the priority and estimate the story points based the time we need to work on that,** we will also have a picture of what are the potential shippable products when the sprint ends. We have a team leader. He will take charge of the whole unit and **assign these tickets** to other UI developers. Senior developers will take up to 15 points.

     1pt – 1day | 3pt – 3 day | 5pt  –week| 8pt  – two week 

   - Basically we have the **standup meeting every day, report what we completed since the last meeting, what we are working on, anything that maybe blocked or need help.**

   - By the end of each sprint, we will have a **demo meeting with PO** to show what we have down in this sprint and **a retrospective meeting to discuss what we can impove in the future.** 

   - Then it just cycle, go over again and agian until we release our final version of product

   

   Sometimes if the business logic or requirement is no clear, we will talk to PO directly.

   For example, in my last project, we need to implement a data filter. The filter logic  is very complex and the data size is also very large. I was not clear if we need to filter the data in the whole database or just filter the data in the single page. So I had a quick talk with our PO to get a clear view about the business logic and implement it based on his requirement.

   

7. ### How could you update yourself

   My company provides a monthly **mentor session** , each developer provides new things or new technology to each other. Also, I will always update myself when I want to solve some problem. Do some research first, figure out what is the trendy solution for a problem. Then I will dive into it, watch tutorial videos, read documentation, and build demo with it. 

8. ### Have you ever blocked by you co-woker

   When I was blocked by my co-worker. 

   First, I will leave a comment on jira, point out the block to our team. Let the team leader and my co-woker know the situation.

   Then I will try to find a solution by myself. 

   I remembered once I finished my feature and I was not able to test it because of the back-end delay. Our back-end developers were pretty busy at that time and they were doing their best. I did not want to put too many pressure on them. What I did is getting the data structure from backend developers and hard coding some demo data by using fake.js. I used  **JSON server** to create a demo service to see if my UI can fetch and post data correctly. And at the end of the sprint, the backend was still not finished, so I just present the UI with demo data. 

   If I really can not find a solution, I will informed my manager about the situation and to see if we can re-estimate the time.

9. ### Do you have any backend experience

   I worked 80% on front-end and 20% on back-end. 

   In my last project, I was hired as angular developer, so I mainlly focus on front-end. I worked very closely with back-end team to discuss about the api structure, what technique we can use to optimizing the perfomance and so on. 

   I also work very closely with our UI to talk about the data structure and make sure I fully understand the mock up.

   I always want to dive deep into backend and become a full stack developer some day. 

10. ### Have you ever used docker before

    I know Docker is a Container technology. Our team discussed about using docker to implement micro service before, but we did not use it. They hold a **mentor section** to show us a demo and introduce how to use docker. I am still learning it. I am willing to dive deeper if we need to use it.

    Besides, our team use Travis CI to do the test and deploy the code.

    Travis CI builds can run and build Docker images, and can also push images to Docker repositories or other remote storage.

    To use Docker add the settings to your `.travis.yml`.

    

    Travis CI is that it runs your program's tests every time you commit to GitHub (this can be configured in many ways, and you can always disable builds on some branches). The point of this is that you can often discover very quickly if your commit broke something, and fix it before it becomes a problem. I would recommend running Travis CI on every GitHub repo that you have unit tests in and is using a programming language supported by Travis CI. Since setting up Travis CI is very easy, I don't normally see a good reason not to use it, unless you don't care if you have passing tests in your program or not. Feel free to leave a comment if you have any more questions. You can read more about Travis C

    

11. ### Accessibility 

    Our company do has the ADA team to test the accessibility of our applications. I was assigned to fix some bugs about the Accessibility. 

    You know, **screenreaders** must read out all the navigation links before getting to the main site content. And in the application, we have almost 7 navigation links and 40 sub-links at the top of the home page. A sighted user can jump visually past these links and begin reading the main content of the page. 

    But it would take **one minute for screen reader** to read out all the links. In order to improve the user experience for disable users, I added a **Skip navigation links provided before menu items**. It  allowed users to skip the navigation and go directly to an anchor point, usually at where the main content begins. 

    

12. ### internationalization and localization

    l10n: **Localization** is the process of **building versions of your app** for different locales, including extracting text for translation into different languages, and formatting data for particular locales. A locale identifies a region (such as a country) in which people speak a particular language or language variant.

    i18n: **Internationalization** is the design and development of a product, application or document content that ***enables*** easy localization for target audiences that vary in culture, region, or language.

    g11n: **Globalization** is the interaction of people, governments, and companies on a global scale. In business terms, globalization is the process of taking a business global to expand markets beyond national borders. This includes conducting research, developing strategies, planning, internationalization, localization, and translation of products, services, and/or content, as well as quality assessment.

    

13. ### testing

    I used Jasmine and Karma to do the unit testing when I fixed a bug or finished a new feature.

    For end-2-end test, our QA team take charge of it by using Cypress. Since cypress is using Javascript, I help our QA setting the environment. It is very interesting for me.

    I am willing to diving deep into it anytime.

14. ### How do you deal with deadline/can not fit the requirement

    I always post a comment into jira if I meet any problems. Let my team leader and co-worker knows the situation I am facing right now. If I really can not finish it on time, I will communicate with my team leader to explain the reason and re-estimate the time. 

    

    If I have no clue about a ticket, I will do some research first.

    If I can not find a solution by myself, I usually ask expert for guildance. 

    

15. ### academic

    I got my master degree on Dec 2020. I worked full-time with CPT and took some cources at the same time.