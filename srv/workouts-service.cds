using { sap.capire.workout as my } from '../db/schema';
service WorkoutService @(path:'/browse') { 

  @readonly entity Workouts as projection on my.Workouts {*} 
  excluding { createdBy, modifiedBy };

  @readonly entity Exercises as projection on my.Exercises {*} 
  excluding { createdBy, modifiedBy };

  @readonly entity WorkoutExercises as projection on my.WorkoutExercises {*} 
  excluding { createdBy, modifiedBy };

}