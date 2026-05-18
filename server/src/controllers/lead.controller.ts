import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {

    const lead =
      await Lead.create(req.body);

    res.status(201).json(lead);

  } catch(error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }
};
export const getLeads = async (
req: Request,
res: Response
) => {

try{

const {
status,
search,
sort="latest",
page=1
}=req.query;

const query:any={};

if(status){

query.status=status;

}

if(search){

query.$or=[

{
name:{
$regex:search,
$options:"i"
}
},

{
email:{
$regex:search,
$options:"i"
}
}

];

}

const limit=10;

const skip=
(Number(page)-1)
*limit;

const sortOption:any =
sort==="oldest"
?{createdAt:1}
:{createdAt:-1};

const leads=
await Lead.find(query)
.sort(sortOption)
.skip(skip)
.limit(limit);

const total=
await Lead.countDocuments(query);

res.json({

leads,

page,

totalPages:
Math.ceil(
total/limit
)

});

}catch(error){

console.log(error);

res.status(500)
.json({
message:
"Server Error"
});

}

};
export const updateLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead =
    await Lead.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new:true
      }

    );

    res.json(
      lead
    );

  } catch(error){

    console.log(error);

    res.status(500)
    .json({
      message:
      "Server Error"
    });

  }

};

export const deleteLead = async (
  req: Request,
  res: Response
) => {

  try {

    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
      "Lead deleted"

    });

  } catch(error){

    console.log(error);

    res.status(500)
    .json({
      message:
      "Server Error"
    });

  }

};