import Axios from "axios";

const API_URL = `https://harmistechnology.com/admin.indianjewelley/api/`;
// const API_URL = `https://192.168.1.73/indianjewel/api/`

export default function call({ path, method, data }) {
  // const token = localStorage.getItem("accessToken");

  return new Promise((resolve, reject) => {
    Axios({
      url: API_URL + path,
      method,
      data,
    })
      .then((d) => {
        resolve(d.data);
      })
      .catch((err) => {
        let status = err?.response?.data?.status;
        if (status === 403 || status === 401 || status === 404) {
          let e = err?.response?.data;
          if (!e) return;
          reject(e);
        }
      });
    // {
    //   token
    //     ? Axios({
    //         url: API_URL + path,
    //         method,
    //         data,
    //         // headers: { Authorization: `Bearer ${token}` },
    //       })
    //         .then((d) => {
    //           resolve(d.data);
    //         })
    //         .catch((err) => {
    //           let status = err?.response?.data?.status;
    //           if (status === 403 || status === 401 || status === 404) {
    //             let e = err?.response?.data;
    //             if (!e) return;
    //             reject(e);
    //             // setTimeout(function(){window.location.href = "/login";}, 1000)
    //           }
    //         })
    //     : Axios({
    //         url: API_URL + path,
    //         method,
    //         data
    //       })
    //         .then((d) => {
    //           resolve(d.data);
    //         })
    //         .catch((err) => {
    //           let status = err?.response?.data?.status;
    //           if (status === 403 || status === 401 || status === 404) {
    //             let e = err?.response?.data;
    //             if (!e) return;
    //             reject(e);
    //             // setTimeout(function(){window.location.href = "/login";}, 1000)
    //           }
    //         });
    // }
  });
}
