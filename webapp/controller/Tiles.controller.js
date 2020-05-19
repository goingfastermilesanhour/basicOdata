sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/core/routing/History',
	// "sap/ui/base/Event",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
],
	function (Controller, ODataModel, History, MessageToast, MessageBox) {
	"use strict";
	return Controller.extend("rg.basicOdata.controller.View1", {
		onInit: function () {
		MessageToast.show("Click twice on the back button if you want to leave this page");
		},
		// The create function triggers a POST request to
		// an OData service which was specified at creation 
		// of the OData model. 
		// The application has to specify the entity set, 
		// in which the new entity and the entity data is 
				
	onNavBack: function (oEvent) 
	{	
		var oHistory, sPreviousHash;
		oHistory = History.getInstance();
		sPreviousHash = oHistory.getPreviousHash();
		if(sPreviousHash !== undefined) {
			window.history.go(-1);
		}else{
		// var that = this;
		// var oRouter = this.getOwnerComponent().getRouter();
		// var goBack = oRouter.navTo("View1", {}, true);

			window.history.go("View1");
			MessageToast.show("Bye");
		}
		
	}
	});
}
);