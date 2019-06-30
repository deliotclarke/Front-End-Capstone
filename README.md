# Resolute
### Your app on track

***
##### The Resolute app is a solution to task management for anyone planning a solo project or for those who just want to better organize their time. A place to come when working to add/edit/remove tasks, encourage workflow, and keep track of completed tasks. 
***

### Goals For The User:
1. Create an easy-to-use place for the user to come to track project tasks
2. Encourage workflow by utilizing the Pomodoro Method integrated with the user’s task list
3. A simple and sleek UI to minimize distraction
4. Mobile design to remove yet another thing that would be taking up space on the desktop

### Technologies:
1. Create-React-App
2. Firebase Auth
3. Firebase Storage
4. Firebase Database
4. Reactstrap
5. JSON Server (prior to switching to Firebase Database)

### Features:
User Authentication<br>
Pomodoro Timer<br>
Task List w/ Full CRUD<br>
User Profiles w/ Optional Image Upload<br>
Mobile First<br>

### Stretch Goals:
Github Sign-in<br>
Integration with Task List and Github Projects (Is it even possible? Who knows?)<br>
Tasks will appear with the timer so the user knows what they’re working on at the time<br>
Notes Area<br>
Inspiration Area (would include: dribbble API for random inspiration pictures and a theme assistant)<br>
Browser version<br>
Encouraging quotes on screen load<br>
A place for the user to see completed tasks<br>
Deployment through Firebase<br>
<br>
## How to Use Resolute

#####  First, the Pomodoro Technique, this technique is used by many to encourage consistent workflow. Here's one approach:

1. Decide on the task, or tasks, to be done.
2. Set the pomodoro timer (traditionally to 25 minutes).
3. Work on the task/tasks.
4. When the timer ends, put a checkmark on a piece of paper (we keep track of this for you with your Pomo Counter).
5. If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.
6. After four pomodoros, take a longer break (15–30 minutes), then go to step 1.
###### Note: on logout, the users Pomo Count will be reset, but total pomodoros will be saved to view in the profile section

#####  Next, our miniature version of the Kanban Board. You'll have three sections/boards. To Do, In Progress, Done. Here's some suggestions for use:

 - Create tasks using the green Plus button. The form allows you to title the task, add notes and place the task on whatever board you choose.
- Whichever tasks you place into In Progress, will appear on your timer screen for ease of use.
- At anytime you can move your tasks or edit them by pressing the Elipsis button on each tasks card.
- If you decide you'd like to remove a task entirely, just click the title of as many as you'd like to delete and press the red X button. Any task that has turned red and striked out will be removed permanently, so feel free to track finished tasks by leaving them on your Done board.
###### Note from the developer: If you plan to pull this repo down to use on your local machine keep in mind that Resolute is a mobile-only application. For continuity, it's suggested that you use VSCode and Google Chrome with the DevTools open in mobile view. It is also suggested to use the deployed version in the same way or on a mobile-device.

### Resolute was deployed through firebase, to use simply [click here](https://fecapstone-eliot.firebaseapp.com/ "Resolute")
