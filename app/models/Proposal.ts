import mongoose, { Schema, models, model } from "mongoose";

// Define the row schema for the table
const rowSchema = new Schema({
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  note: { type: String, default: "" },
  subtotalrow: { type: String, default: "0" },
  quantitytable: { type: String, default: "0" },
});

const otherChargesschema = new Schema({
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  note: { type: String, default: "" },
  quantityother: { type: String, default: "0" },
  subtotalother: { type: String, default: "0" },
});

const proposalSchema = new Schema(
  {
    name: { type: String },
    clientName: { type: String },
    clientPhone: { type: String },
    clientEmail: { type: String },
    clientAddress: { type: String },
    clienttitle: { type: String },

    heading: { type: String, default: "" },
    customerType: { type: String },
    projectsize: { type: String },
    consumption: { type: String },
    electricity: { type: String },
    generation: { type: String },
    Wattpeak: { type: String },
    proposalWattpeak: { type: String },
    warranty: { type: String },
    performancewarranty: { type: String },
    Invertorwarranty: { type: String },
    invertorSize: { type: String },
    quantity: { type: String },
    invertorquantity: { type: String },
    invertortype: { type: String },
    invertorPhase: { type: String },
    invertorquantitiy: { type: String },
    panelBrands: { type: [String], default: [] },
    invertorBrands: { type: [String], default: [] },
    cableBrands: { type: [String], default: [] },
    proposalStructure: { type: String },
    structureDes: { type: String },
    systemwarranty: { type: String },
    batteryBrands: { type: String },
    batterytype: { type: String },
    leadAcidSubtype: { type: String },
    batterywarranty: { type: String },
    batterysubtype: { type: String },
    batteryquantity: { type: String },
    paneltype: { type: String },
    date: { type: String },

    stage1: { type: String },
    stage2: { type: String },
    stage3: { type: String },
    stage4: { type: String },

    holder: { type: String },
    accountnumber: { type: String },
    ifsc: { type: String },
    bankname: { type: String },

    graphType: { type: String },

    balanceOfSystem: { type: String },
    ourScope: { type: String },
    customerScope: { type: String },
    termandcondition: { type: String },

    // Table rows
    rows: { type: [rowSchema], default: [] },
    otherCharge: { type: [otherChargesschema], default: [] },

    // Totals
    gst: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    // images (base64 strings)
    tableImage: { type: String },
    graphImage: { type: String },

    // Recycle Bin / Soft Delete
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

proposalSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 15 * 24 * 60 * 60 });

const Proposal = models.Proposal || model("Proposal", proposalSchema);

export default Proposal;
