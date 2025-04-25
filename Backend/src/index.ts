import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModle, LinkModel, UserModel } from './db';
import zod, { makeIssue } from 'zod';
// import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';
import { random } from './units';
import cors from 'cors';
import dotenv from "dotenv"

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();



mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("MongoDB Connection Error ❌:", err));



app.post('/api/v1/signup', async (req: any, res: any) => {
    console.log("Incoming request body:", req.body);
    req.body.username = req.body.username?.trim();
    req.body.password = req.body.password?.trim();
    const requireBody = zod.object({
      username: zod.string().min(3).max(10),
      password: zod.string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    });
  
    // Validate the request body
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
      return res.status(400).json({
        message: "Validation failed. Check username and password constraints.",
        errors: parseDataWithSuccess.error.errors,
      });
    }
  
    const { username, password } = parseDataWithSuccess.data;
  
    try {
      // Check if the username already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          message: 'User already exists with this username',
        });
      }
  
      // Create the user in the database
      await UserModel.create({ username, password });
  
      return res.status(201).json({
        message: "Signed up successfully",
      });
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  


app.post('/api/v1/signin', async (req :any, res : any) => {
        const {username,password}  = req.body;

        try{
            const existingUser = await UserModel.findOne({
                username,
                password
            })
            if(!existingUser){
                res.status(403).json({
                    Message : "Wrong username,password"
                })
            }

            if(existingUser){
                const token = jwt.sign({
                    id : existingUser._id,
                },process.env.JWT_SECRET as string);

                res.status(200).json({
                    message : "Logged in",
                    token
                })
            }
        }
        catch(err) {
            return res.status(500).json({
                message : "Internal server error",})
            }
        }
)

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const Link = req.body.Link;
    const Type = req.body.Type;
    console.log(Type);
    await ContentModle.create({
        Link,
        
        Type,
        
        title: req.body.title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })
    console.log("hello");
    
    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId;
    // console.log(userId);
    
    const content = await ContentModle.find({
        userId: userId
    }).populate("userId","username");

    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId = req.body.contentId;

    await ContentModle.deleteMany({
        contentId,
        // @ts-ignore
        userId : req.userId

    })

    res.json({
        message : "Content deleted",

    })
})

app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share  = req.body.share;
    // console.log(share);

    try{

    
    if(share){
        const existingLink = await LinkModel.findOne({
            // @ts-ignore
            userId :req.userId,
        });
        if(existingLink){
            res.json({
                hash : existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            // @ts-ignore
            userId : req.userId,
            hash : hash
        })

        res.json({
            hash
        })

    }


    else{
        await LinkModel.deleteOne({
            // @ts-ignore
            userId : req.userId,
        })

        res.json({
            message : "Removed Link"
        })
    }
}
catch(err){
    console.log(err);
}

})


app.get("/api/v1/brain/:shareLink",async (req,res) =>{
    const hash = req.params.shareLink;
    console.log(hash);
    

    const link  = await LinkModel.findOne({
        hash
    })
    console.log(link);
    
    if(!link){
        res.status(404).json({
            message : "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModle.findOne({
        // @ts-ignore
        userId : LinkModel.userId
    })

        const user = await UserModel.findOne({
            // @ts-ignore
            _id : link.userId
        })

        if(!user){
            res.status(411).json({
                message : "user not found, error should ideally not happen"
            })

            return;
        }

        res.json({
            username : user.username,
            content: content
        })
})

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})