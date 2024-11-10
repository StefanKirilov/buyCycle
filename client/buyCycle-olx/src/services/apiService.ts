const baseUrl = "http://localhost:5000";

export const uploadFile = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/upload`, {
      method: "POST",
      // credentials: "include",
      // headers: {
      //     'Content-Type': 'multipart/form-data',
      // },
      // body: JSON.stringify(data)
      credentials: "include",
      body: data,
    });

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
    // return response;
  } catch (error) {
    console.log(error);
  }
};

export const createBike = async (form: any, images: any, email: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form, images, email }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCycles = async () => {
  try {
    const response = await fetch(`${baseUrl}/cycles`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getOneCycle = async (id: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const like = async (id: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles/${id}/like`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const unlike = async (id: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles/${id}/unlike`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const del = async (id: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const edit = async (id: any, cycle: any) => {
  try {
    const response = await fetch(`${baseUrl}/cycles/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cycle),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
