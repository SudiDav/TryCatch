# TryCatch

This repo contains the Dotnet Club DRC app

## Development Environment setup

1. You will need an .NET SDK 5 or above and Nodejs runtime 
  - You can install [.NET SDK 5](https://dotnet.microsoft.com/download/dotnet/5.0)
  - You can get Nodejs [Nodejs](https://nodejs.org/en/)
  - Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. Running the App
<<<<<<< HEAD

  - Go to API route and run `dotnet build`, `dotnet restore` then `dotnet watch run`
  - Go to the client-app route and run `npm install` then `npm start`  - 
  - You do not have to run the migration because that has been taken care from the app level in the `Program.cs`(If the database does not exist then one will be created automatically based on the last migration and seed the database with some default data)
=======
  - Go to API route and run `dotnet build` then `dotnet watch run`
  - Go to the client-app route and run `npm install` then `npm start`  - 
  - You do not have to run the migration because that has been taken care of from the API level in the `Program.cs`
>>>>>>> develop
  
3. App Description
  This is an Event app that helps the local community to organise events for the Tech geeks community.
