module.exports = function (){
    // Register your event handlers in here, for example, ...
    this.after ('each','Workouts', workout => {
        if (workout.exercises === undefined){
            workout.duration = 0;
        } else {
            workout.duration = workout.exercises.reduce((a,e)=>a+parseInt(e.duration)+parseInt(e.pause),0);
        }
        //console.log('Workout ex:', workout);
    })
  }