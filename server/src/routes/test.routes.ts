import express from "express";

import {
 auth,
 AuthRequest
}
from "../middleware/auth";

const router=
express.Router();

router.get(
"/protected",
auth,
(req:AuthRequest,res)=>{

res.json({

message:
"Protected route accessed",

user:req.user

});

}
);

export default router;