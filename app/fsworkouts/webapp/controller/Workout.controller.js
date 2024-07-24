sap.ui.define([
	"./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("fsworkouts.controller.Workout", {

        currentExercise: 0,

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteWorkout").attachMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var workoutKey = oEvent.getParameter("arguments").key;

            //let sPath = "/Workouts" + idWorkOut;
            //let oView = this.getView();
            //oView.setBindingContext(oView.getModel("workoutsModel").getKeepAliveContext(sPath), "workoutsModel");

            this.getView().bindElement({
                path: "/Workouts" + workoutKey, 
                model: "workoutsModel",
                parameters: {
                    '$expand': { 
                        'exercises': {
                            '$select':'*',
                            '$expand':{
                                'exercise': {'$select':'*'}
                            }
                        }
                    }
                }
            });
            //let path = this.getView().getBindingContext("workoutsModel").sPath;
            //this.byId("favouriteIcon").setSrc( this.getView().getModel("workoutsModel").getProperty(path + "/favourite")? "sap-icon://heart" : "sap-icon://heart-2");
        },

        onExerciseFinished: function(oEvent){
            let exerciseID = oEvent.getParameter("exerciseID");
            console.log("Exercise finished " + exerciseID);
            this.byId("exercisesList").getItems().find(ex=>{
                return ex.data("exId") === exerciseID}).setHighlight(sap.ui.core.MessageType.Success);
        },
        onExerciseStarted: function(oEvent){
            let exerciseID = oEvent.getParameter("exerciseID");
            this.currentExercise = exerciseID;
            console.log("Exercise started " + exerciseID);
            let index = this.byId("exercisesList").getItems().findIndex(ex=>{
                return ex.data("exId") === exerciseID })
            this.byId("exercisesList").scrollToIndex(index);
            this.byId("exercisesList").getItems().find(ex=>{
                return ex.data("exId") === exerciseID }).setHighlight(sap.ui.core.MessageType.Warning);
        },


        startWorkout: async function(oContext) {
            this.byId("Timer").startClock(true);
            this.byId("startButton").setVisible(false);
            this.byId("stopButton").setVisible(true);
            this.byId("resetButton").setVisible(false);
            this.byId("continueButton").setVisible(false);
            let screenLock = await navigator.wakeLock.request('screen');
        },
        continueWorkout: function(oContext) {
            this.byId("Timer").startClock(false);
            this.byId("startButton").setVisible(false);
            this.byId("stopButton").setVisible(true);
            this.byId("resetButton").setVisible(false);
            this.byId("nextButton").setVisible(false);
            this.byId("continueButton").setVisible(false);
        },
        resetWorkout: function(oContext) {
            this.byId("Timer").resetClock();
        },


        nextExercise: function(oContext) {
            this.byId("Timer").nextExercise();
            //let exercises = this.byId("Timer").getBinding("exercises").getValue()
            let exercises = this.byId("exercisesList").getBindingContext("workoutsModel").getObject("exercises")
            let index = exercises.findIndex(ex=>ex.ID === this.currentExercise);
            let listItems = this.byId("exercisesList").getItems();
            if (index>=0 && index<exercises.length-1){
                listItems.find( li=> li.data("exId") === this.currentExercise ).setHighlight(sap.ui.core.MessageType.None);
                this.currentExercise = exercises[index+1].ID;
                listItems.find( li=>li.data("exId") === this.currentExercise ).setHighlight(sap.ui.core.MessageType.Warning);
                this.byId("exercisesList").scrollToIndex(listItems.findIndex( ex=> ex.data("exId") === this.currentExercise ));
            }else{
                this.currentExercise = exercises[0].ID;
                listItems.find( li=>li.data("exId") === this.currentExercise ).setHighlight(sap.ui.core.MessageType.Warning);
            }
            console.log("next: " + this.currentExercise);
        },

        stopWorkout: function(oContext) {
            this.byId("Timer").stopClock();
            this.byId("continueButton").setVisible(true);
            this.byId("resetButton").setVisible(true);
            this.byId("nextButton").setVisible(true);
            this.byId("stopButton").setVisible(false);
            //let sPath = this.getView().getBindingContext("workoutsModel").sPath;
            //let workout = this.getView().getModel("workoutsModel").getProperty(sPath);
        },

		getRound: function(oContext) {
			return "Round " + oContext.getProperty('round');
		},

        navToMain: function () {
            this.byId("Timer").stopClock();
            this.byId("Timer").resetClock();
            this.byId("Timer").reset();
            this.byId("startButton").setVisible(true);
            this.byId("stopButton").setVisible(false);
            this.byId("resetButton").setVisible(false);
            this.byId("nextButton").setVisible(false);
            this.byId("continueButton").setVisible(false);

            //this.getOwnerComponent().getRouter().navTo("TargetMain", {id: "test"});
            this.getOwnerComponent().getRouter().navTo("RouteMain");
        },

        handleLinkPress: function(oEvent){
            let iWorkoutIndex = this.getView().getBindingContext("workoutsModel").getProperty(this.getView().getBindingContext("workoutsModel").getPath()).id;
            let iExerciseIndex = oEvent.getSource().getBindingContext("workoutsModel").getProperty("id");        
            //let exerciseLink = oEvent.getSource().getBindingContext("workoutsModel").getProperty("link");        
			this.getOwnerComponent().getRouter().navTo("RouteVideo", {id: iWorkoutIndex, exerciseIndex: iExerciseIndex,});
        },

        setFavourite: function(){
            let path = this.getView().getBindingContext("workoutsModel").sPath;
            let isFavourite =  this.getView().getModel("workoutsModel").getProperty(path + "/favourite");
            this.getView().getModel("workoutsModel").setProperty(path + "/favourite",!isFavourite);
            this.byId("favouriteIcon").setSrc(isFavourite? "sap-icon://heart-2" : "sap-icon://heart");
            let favourites = this.getView().getModel("workoutsModel").getProperty("/workouts").filter( wo=>{ 
                return wo.favourite
            }).map( wo=>{
                return wo.id
            }); 
            localStorage.setItem("favourites", favourites);
        }

    });
});