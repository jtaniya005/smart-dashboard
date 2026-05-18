import express from "express";

import {
 createLead,
 getLeads,
 updateLead,
 deleteLead
}
from "../controllers/lead.controller";

import {
 auth
}
from "../middleware/auth";

const router =
express.Router();

router.post(
"/",
auth,
createLead
);

router.get(
"/",
auth,
getLeads
);

router.put(
"/:id",
auth,
updateLead
);

router.delete(
"/:id",
auth,
deleteLead
);

export default router;