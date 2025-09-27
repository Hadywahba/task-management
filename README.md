Title: Task Management App 
Description:-
A simple and efficient task management application built with **React**, **TypeScript**, and **React Query**.  
This app allows users to create, update, delete, and filter tasks by categories, as well as change the status of each task.

Features:-
1-Add new task
2-Edit existing task
3-Delete tasks
4-Filter tasks by category
5-Pagination for browsing tasks across multiple pages 
6-Change task status (completed / pending)
7-Display loading state before data and images are fully loaded  
8-Responsive categories view: shown as **tabs** on large screens and as a **dropdown** on small screens 
9-Dynamic task details page: clicking a task navigates to its own dedicated page
10-Confirmation modal before deleting a task to prevent accidental deletions 
11-Hover effects on buttons for better interactivity

Setup & Installation :-
1-Clone the repository:  
   git clone https://github.com/Hadywahba/task-management.git
   cd task-management
 
2-Install dependencies:
 npm install

3-Run the development server:
npm run dev

4-Build for production:
npm run build

Tech Stack:-
1-React
2-TypeScript
3-Tailwind CSS
4-React Query
5-Zustand
6-axios

Component Architecture :-
1-components/feature : Reusable UI components ( Modals , TaskCard , CategoryCard , DeleteModal , TaskImage )
2-components/ui : Reusable form inputs.
3-components/erros : Error boundaries & error messages.
4-components/layouts : Footer, shared layout components.
5-components/loaders : Loading spinners & PageLoader.
6-lib/ : Utilities (Axios instance).
7-types/ : TypeScript interfaces & types.
8-styles/ : Global CSS or Tailwind overrides.
9-store/ : State management (Zustand)
10-routes/ : App routing configuration.
11-pages/ : Application pages (Tasks,TaskDetails, NotFound).


