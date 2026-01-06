import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const genrateRefreshAndRefreshTokens =async(userId)=>{
  try{
    const user=await User.findById(userId)
    const accessToken=user.genrateAccessToken()
    const refreshToken=user.genrateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return{accessToken,refreshToken}
    
  }catch(error){
    throw new ApiError(500,"something went wrong while genrating refresh and access token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty
  //check if user already exist:username,email
  //check image,check for avatar
  //upload them to clodinary,avatar
  //create user object-crete entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar file required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.tolowercase(),
  });

  //   if(fullName===""){
  //     throw new ApiError(400,"fullname is required")
  //   }

  const createduser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  if (!createduser) {
    throw new ApiError(500, "something went wrong ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "user register sucessfully"));
});

const loginUser=asyncHandler(async(req,res)=>{
   const {email,username,password}=req.body
   if(!username||!email){
    throw new ApiError(400,"username or passsword is required")
   }
   const user=await User.findOne({
    $or:[{username},email]//using this we can find one of them  this is mongodb
   })

   if(!user){
    throw new ApiError(404,"user does not exist")
   }
  const isPasswordValid= await user.isPasswordCorrect(password);
    if(!isPasswordValid){
    throw new ApiError(404,"Invalid credentials")
   }

   const {accessToken,refreshToken} = 
   await genrateRefreshAndRefreshTokens(user._id)

   const loggedUser = await User.findById(user._id).
   select("-password -refreshToken")

   const options={
    httpOnly:true,
    secure:true
   }
   return res.status(200).cookie("accessToken",
    accessToken,options
   ).cookie("refreshToken",refreshToken,options).
   json(new ApiResponse(200,{
    user:loggedUser,accessToken
   },
  "user logged successfully"
))
})
export default { registerUser, loginUser };

