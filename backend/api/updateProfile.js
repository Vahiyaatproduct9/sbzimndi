import sb from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
export default async ({ info, photo }) => {
  console.log("running update profile-->", info, photo);
  const { name, access_token, spirit_animal, user_type, bio } = await info;
  const { data, error } = await sb.auth.getUser(access_token);
  let profile_picture;
  if (photo) {
    const { data: imgData, error: imgError } = await sbs.storage
      .from("pfp")
      .upload(`${data.user.id}.png`, photo.buffer, {
        contentType: photo.mimetype,
        upsert: true,
      });
    if (!imgError && imgData)
      profile_picture = `${process.env.supabaseUrl}/storage/v1/object/public/${imgData.fullPath}`;
    console.log("img Error --> ", imgError);
  }
  info = {
    full_name: name,
    spirit_animal,
    user_type,
    bio,
  };
  profile_picture && (info.profile_picture = profile_picture);
  const { data: publicUser, error: publicError } = await sb
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();
  let dataList = {};
  publicUser &&
    Object.keys(publicUser).forEach((key) => {
      dataList[key] = publicUser[key];
    });
  for (let key in info) {
    if (info[key] !== undefined && info[key] !== null && info[key] !== "") {
      dataList[key] = info[key];
    }
  }
  console.log("dataList-->", dataList);
  const { error: infoError } = await sbs
    .from("users")
    .upsert({
      ...dataList,
      id: data.user.id,
    })
    .eq("id", data.user.id)
    .select();
  console.log("infoError ==> ", infoError);
  if (!error && !infoError && !publicError) {
    return {
      success: true,
      message: "Profile updated Successfully!",
    };
  } else {
    console.log({
      error,
      imgError,
      infoError,
      publicError,
    });
    return {
      success: false,
      message: "Some Error Occured!",
      error,
      infoError,
      imgError,
      publicError,
    };
  }
};
