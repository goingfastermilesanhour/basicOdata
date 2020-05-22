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
		// Teststestest
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
			// MessageBox.error("Cannot add new row.", {
			// 	title: "Error",
			// 	details: '<p><strong>This can happen if:</strong></p>\n' +
			// 		'<ul>' +
			// 		'<li>The developer got another project and cannot implement the add button :D</li>' +
			// 		'<li>A backend component is not <em>available</em></li>' +
			// 		'<li>Underlying system is down</li>' +
			// 		'<li>You probably do not have access to the system</li>' +
			// 		'</ul>' +
			// 		'<p>Get more help <a href="//www.sap.com" target="_top">here</a>.',
			// 	contentWidth: "100px"
			// });
			// debugger;
			if (!this.newBanksDialog) {
				this.newBanksDialog = sap.ui.xmlfragment("rg.basicOdata.view.addEditDialog", this);
			}
			this.getView().addDependent(this.newBanksDialog);
			debugger;
			var aItems = this.newBanksDialog.getContent()[0].getContent();
			var oControl = aItems[15];
			oControl.setText("Save");
			this.newBanksDialog.open();
		}, 

		handleSaveBtnBook: function (oEvent) {
			debugger;
			var bCreate = true;
			var oBank = {
				BankKey: "",
				BankName: "",
				Street: "",
				City: "",
				State: "",
				Country: "",
				BankNumber: ""
				// nrbank: 0
			};
			
			var oSimpleForm = oEvent.getSource().getParent().getParent();
			debugger;
			var aItems = oSimpleForm.getFormElements();
			
			var oControl = aItems[0].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.BankKey = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[1].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.BankName = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[2].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.Street = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[3].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.City = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[4].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.State = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[5].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.Country = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			oControl = aItems[6].getFields()[0];
			if (oControl.getValue().length !== 0) {
				oBank.BankNumber = oControl.getValue();
				oControl.setValueState("None");
			} else {
				bCreate = false;
				oControl.setValueState("Error");
			}
			
			
			this.getView().getModel().setUseBatch(false);
			this.getView().getModel().oHeaders["X-Requested-With"] = "X";
			// debugger;
			var oButtonPressed = this.newBanksDialog.getContent()[0].getContent()[15]; //the save button
			var oButtonText = oButtonPressed.getText();
			if (oButtonText === "Save") {
				if (bCreate) {
					this.getView().getModel().create("/BANKS", oBank, {
						success: function () {
							MessageToast.show("Book inserted!");
						},
						error: function () {
							MessageToast.show("Problem with inserting bank information!");
						}
					});

					this.newBanksDialog.close();
					for (var i = 0; i < aItems.length - 1; i++) {
						aItems[i].getFields()[0].setValue("");
					}
				}
			} else {
				if (bCreate) {
					var sPath = this.getView().getContent()[0].getContent()[0].getTable().getSelectedContexts()[0].getPath();
					this.getView().getModel().update(sPath, oBank, {
						success: function () {
							MessageToast.show("Bank updated!");
						},
						error: function () {
							MessageToast.show("Update error!");
						}
					});
				}
			}
		}, 
 
		handleCancelBtnPress: function (oEvent) {
			// debugger;
			var oSimpleForm = oEvent.getSource().getParent().getParent();
			var aItems = oSimpleForm.getFormElements();
			for (var i = 0; i < aItems.length - 1; i++) {
				aItems[i].getFields()[0].setValue("");
			}
			this.newBanksDialog.close();
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
		debugger;
			var selectedRow = oEvent.getSource().getParent().getParent().getContent()[2].getTable().getSelectedContexts()[0];
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


