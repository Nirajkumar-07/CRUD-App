import axios from "axios";

export async function Auth(prevState, formData) {
  const form = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const body = new FormData();
  body.append("username", form.username);
  body.append("password", form.password);

  try {
    const res = await axios.post("https://dummyjson.com/auth/login", body, {
      headers: { "Content-Type": "application/json" },
    });

    const storageData = {
      accessToken: res.data.accessToken,
      firstName: res.data.firstName,
      image: res.data.image,
    };

    if (res.status == 200) {
      return {
        success: true,
        data: storageData,
        message: "successfull...",
      };
    } else {
      return {
        success: false,
        message: "You provide invalid credentials.",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "You provide invalid credentials.",
      data: null,
    };
  }
}
