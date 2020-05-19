sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/odata/v2/ODataModel',
	// "sap/ui/base/Event",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, ODataModel, MessageToast, MessageBox) {
	"use strict";
	return Controller.extend("rg.basicOdata.controller.View1", {
		// onInit: function () {
		// },
		// The create function triggers a POST request to
		// an OData service which was specified at creation 
		// of the OData model. 
		// The application has to specify the entity set, 
		// in which the new entity and the entity data is 
		// to be created.
		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Tiles");
		}, 
		onClickInfo: function (oEvent) {
			MessageBox.information("A little bit of bio", {
				title: "What I did now",
				id: "messageBoxId1",
				details: '<p><strong>About me:</strong></p>\n' +
					'<ul>' +
					'<li>Born in Romania, graduated with a MSc in Civil Engineering, Received Scolarship from Deutsche Bahn.</li>' +
					'<li>In highschool(lyceum) I was studying a real program, specializing in mathematics-informatics.</li>' +
					'<li>What I did in Germany: 2 years worked as a civil engineer in tunneling.</li>' +
					'<li>Switched towards SAP development after returning from Germany to Romania.</li>' +
					'<li>Can do ABAP, ABAP OO, Ui5. Knowledge of CRUD operations and HTTP.</li>' +
					'</ul>' +
					'<p>That is it for now. I speak both English and German as well as Romanian'
			});
		},
		onLinkedin: function (oEvent) {
			window.location.replace("https://www.linkedin.com/in/razvan-gheghe/");
		},
		onXing: function (oEvent) {
			window.location.replace("https://www.xing.com/profile/Razvan_Gheghe/cv")
		},
		onAddRow: function (oEvent) {
			MessageBox.error("Cannot add new row.", {
				title: "Error",
				details: '<p><strong>This can happen if:</strong></p>\n' +
					'<ul>' +
					'<li>The developer got another project and cannot implement the add button :D</li>' +
					'<li>A backend component is not <em>available</em></li>' +
					'<li>Underlying system is down</li>' +
					'<li>You probably do not have access to the system</li>' +
					'</ul>' +
					'<p>Get more help <a href="//www.sap.com" target="_top">here</a>.',
				contentWidth: "100px"
			});

		},
		onEditRow: function (oEvent) {
			MessageBox.error("Cannot edit row.", {
				title: "Error",
				details: '<p><strong>This can happen if:</strong></p>\n' +
					'<ul>' +
					'<li>The developer got another project and cannot implement the edit button</li>' +
					'<li>A backend component is not <em>available</em></li>' +
					'<li>Underlying system is down</li>' +
					'<li>You probably do not have access to the system</li>' +
					'</ul>' +
					'<p>Get more help <a href="//www.sap.com" target="_top">here</a>.',
				contentWidth: "100px"
			});
		},
		onDeleteRow: function (oEvent) {
			var selectedRow = oEvent.getSource().getParent().getParent().getContent()[0].getTable().getSelectedContexts()[0];
			var pathToBank = selectedRow.getPath();
			var oModel = this.getView().getModel();
			oModel.setUseBatch(false);
			oModel.oHeaders["X-Requested-With"] = "X";
			// csrf if we have token // return cu get din sap.
			oModel.remove(pathToBank, {
				success: function () {
					MessageToast.show("Bank Info Deleted!");
				},
				error: function () {
					MessageToast.show("There was an error deleting this bank information");
				},
			});
		}

	});
});