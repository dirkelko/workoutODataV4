sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'lrworkouts/test/integration/FirstJourney',
		'lrworkouts/test/integration/pages/WorkoutsList',
		'lrworkouts/test/integration/pages/WorkoutsObjectPage',
		'lrworkouts/test/integration/pages/WorkoutExercisesObjectPage'
    ],
    function(JourneyRunner, opaJourney, WorkoutsList, WorkoutsObjectPage, WorkoutExercisesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('lrworkouts') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheWorkoutsList: WorkoutsList,
					onTheWorkoutsObjectPage: WorkoutsObjectPage,
					onTheWorkoutExercisesObjectPage: WorkoutExercisesObjectPage
                }
            },
            opaJourney.run
        );
    }
);