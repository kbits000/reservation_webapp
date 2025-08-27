import "server-only";

import UsersModel from "@/lib/database_models/users_model";
import { NewUserFormData } from "@/lib/schemas/user_registration_schema";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import {redirect} from "next/navigation";

export async function registerNewUser(newUserData: NewUserFormData) {
  try {
    await dbConnect();

    const queryResult = await UsersModel.findOne({'email': newUserData.email}).lean();
    if (queryResult != null) {
      return {
        success: false,
        message: 'Email already exists',
        emailExists: true
      };
    }
    
    const userObject = new UsersModel({
      name: newUserData.name,
      email: newUserData.email,
      // password: newUserData,
      sex: newUserData.sex,
      phone_number: newUserData.phoneNumber,
      role: 'user'
    });
    const successfullySaved = await userObject.save();

    if (successfullySaved === userObject) {
      return {
        success: true,
        message: "User has been added",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred!",
        errors: 'An unexpected error occurred!'
      };
    }

  } catch {
    return {
      success: false,
      message: "An unexpected error occurred!",
      errors: "An unexpected error occurred!"
    };
  }
}

export async function isUserRegistered(profileEmail: string) {
  try {
    await dbConnect();
    const queryResult = await UsersModel.findOne({'email': profileEmail});
    if (queryResult !=null) {
      // user is registered
      return true;
    } else {
      // user is not registered
      return false;
    }
  } catch {
    return null;
  }
}

export async function addUserProfilePicture({profileEmail, profilePicture, contentType}: {profileEmail: string; profilePicture: ReadableStream<Uint8Array<ArrayBufferLike>> | null; contentType: string | null;}) {
  try {
    await dbConnect();
    const userDocument = await UsersModel.findOne({'email': profileEmail});
    if (!userDocument) {
      console.error("User not found:", profileEmail);
      return false;
    }

    // Convert ReadableStream to Buffer before saving
    if (profilePicture) {
      const buffer = await streamToBuffer(profilePicture);
      userDocument.set("profile_picture.picture", buffer);
    }

    userDocument.set('profile_picture.content_type', contentType);
    await userDocument.save();

    // const userIsRegistered = await isUserRegistered(profileEmail);
    // if (userIsRegistered) {
    //   // add profile picture of user to database
    //   // const userIsRegistered = await UsersModel.findOne({'email': profileEmail});
    //   return true;
    // } else {
    //   return false;
    // }

    return true;
  } catch {
    return null;
  }
}

async function streamToBuffer(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function getUsers() {
  const session = await auth()
  if (!session) {
    redirect('/api/auth/signin');
  }

  try {
    await dbConnect();

    const users = await UsersModel.find({}).lean();

    // extract needed data
    const usersDataDTO = [];

    for (const user of users) {

      const account_creation_date = user.createdAt.toISOString().split("T")[0].replaceAll("-", "/");
      let userRoleInArabic = user.role;
      if (userRoleInArabic == 'user') {
        userRoleInArabic = 'مستخدم عادي';
      } else if (userRoleInArabic == 'admin') {
        userRoleInArabic = 'اداري';
      }

      let userSexInArabic = user.sex;
      if (userSexInArabic == 'male') {
        userSexInArabic = 'ذكر';
      } else if (userSexInArabic == 'female') {
        userSexInArabic = 'انثى';
      }

      usersDataDTO.push({
        username: user.name,
        email: user.email,
        phone_number: user.phone_number,
        sex: userSexInArabic,
        role: userRoleInArabic,
        account_registration_date: account_creation_date
      })
    }

    return usersDataDTO;
  } catch {
    return null;
  }
}

export async function updateUsers() {
  const session = await auth()
  if (!session) {
    throw new Error("There is an error");
  }
}

export async function deleteUsers() {
  const session = await auth()
  if (!session) {
    throw new Error("There is an error");
  }
}

export async function getUserRoleByEmail(userEmail:  string | null | undefined) {
  // TODO check if there is a need to check is client is authenticated or not
  try {
    await dbConnect();
    const userRole = await UsersModel.findOne({'email': userEmail}, 'role');
    if (userRole !== null && userRole !== undefined) {
      return userRole["role"];
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export async function getUserProfilePictureByEmail(userEmail:  string | null | undefined) {
  const session = await auth();
  if (!session) {
    throw new Error("There is an error");
  }
}

export async function getUserDataByEmail() {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }

  try {
    await dbConnect();

    const userData = await UsersModel.find({'email': session.user?.email}).lean();
    const userDataDTO = [];
    userDataDTO.push({
          'name': userData[0]['name'],
          'email': userData[0]['email'],
          'sex': userData[0]['sex'],
          'phoneNumber': userData[0]['phone_number'],
          'role': userData[0]['role'],
          'profile_picture': userData[0]['profile_picture']
      })
  } catch {
    return null;
  }
}

interface UserFullNameAndSexAndPhoneNumberDTO {
    full_name: string;
    sex: string;
    phone_number: string;
}

export async function getUserFullNameAndSexAndPhoneNumber() {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }

    try {
        await dbConnect();

        const userData = await UsersModel.findOne({'email': session.user?.email}, 'name sex phone_number').lean();
        if (!userData) {
            return null;
        }

        const userDataDTO: UserFullNameAndSexAndPhoneNumberDTO[] = [];
        userDataDTO.push({
            'full_name': userData!['name'],
            'sex': userData!['sex'],
            'phone_number': userData!['phone_number']
        });

        return userDataDTO[0];
    } catch {
        return null;
    }
}