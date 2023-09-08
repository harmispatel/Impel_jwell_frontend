import Call from "./Call";

const login = async (data) => {

    let d = await Call({
      path: "user-login/",
      method: "post",
      data,
    });
    return d;    
  };

  const forget = async (data) => {
    let d = await Call({
      path: `forgotPassword?${data}`,
      method: "get",
      data,
    });
    return d;
  }

  const exportObject = {login,forget}

export default exportObject
