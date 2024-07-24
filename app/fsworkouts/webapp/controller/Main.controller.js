sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
],
function (Controller, Filter) {
    "use strict";

    return Controller.extend("fsworkouts.controller.Main", {
        onInit: function () {
			//calculate overall duration of each workout;
			/*this.selectedLevel = "0";
			let oModel = this.getOwnerComponent().getModel("workoutsModel");
			let favourites = localStorage.getItem("favourites") || [];
			oModel.oData.Workouts.forEach( workout =>{
				workout.duration = Math.round(workout.exercises.reduce((a,e)=>a+parseInt(e.duration)+parseInt(e.pause),0)/60);
				workout.favourite = favourites.indexOf(workout.id) != -1;
			})*/

        },

		calcDuration: function(exercises){
			let seconds = exercises.reduce((a,e)=>a+parseInt(e.duration)+parseInt(e.pause),0);
			return Math.floor(seconds/60)+":"+("0"+seconds%60).slice(-2);
			//return Math.round(exercises.reduce((a,e)=>a+parseInt(e.duration)+parseInt(e.pause),0));
		},

		toMinutes: function(seconds){
			return Math.floor(parseInt(seconds)/60)+":"+("0"+parseInt(seconds)%60).slice(-2);
			//return Math.round(exercises.reduce((a,e)=>a+parseInt(e.duration)+parseInt(e.pause),0));
		},

        formatIconColor: function(level){
			switch (level) {
				case "1":
					return "Neutral";
				case "2":
					return "Positive";
				case "3":
					return "#4db1ff";
				case "4":
					return "Critical";
				default:
					return "white";
			}
		},
		onLevelSelect: function (oEvent) {
			var param = oEvent.getParameter("key");

				this.selectedLevel = (param == this.selectedLevel)? "0" : param;
				this.getView().byId("iconTabBar").setSelectedKey(this.selectedLevel);
				var oBinding = this.getView().byId("workoutsList").getBinding("items");
				if (param != "F"){
					oBinding.filter((this.selectedLevel == "0")? [] : [new Filter("level", "EQ", this.selectedLevel, false),new Filter("level", "EQ", 0, false)]);
				}else{
					oBinding.filter((this.selectedLevel == "0")? [] : [new Filter("favourite", "EQ", true, false)]);
				}
		},

		navToWorkout: function(oEvent) {
			let oContext = oEvent.getParameters().listItem.getBindingContext("workoutsModel");
			let sPath = oContext.getPath();
			let sKey = sPath.slice(sPath.lastIndexOf("("));

			//var iWorkoutId = oEvent.getSource().getBindingContext("workoutsModel").getProperty("ID");
			this.getOwnerComponent().getRouter().navTo("RouteWorkout", {key: sKey});
		}	


    });
});
