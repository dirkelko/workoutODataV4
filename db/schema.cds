using { managed, sap } from '@sap/cds/common';
namespace sap.capire.workout; 

entity Exercises : managed { 
  key ID : Integer;
  name  : localized String(111);
  link  : String(100);
  type  : String(12);
}

entity WorkoutExercises : managed { 
  key ID : Integer;
  workout : Association to Workouts;
  exercise : Association to Exercises;
  duration : Integer;
  pause    : Integer;
  round   : Integer;
  exRound : Integer;
}

entity Workouts : managed { 
  key ID : Integer;
  name   : String(111);
  level  : Integer;
  for    : String(20);
  duration: Integer;
  exercises  : Association to many WorkoutExercises on exercises.workout = $self;
}

