const baseUrl = "http://localhost:5000";

export const login = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {}
};

export const register = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status == 409) {
      throw new Error("The user already registered!");
    }

    const result = await response.json();
    return result;
  } catch (error) {}
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/logout`, {
      method: "GET",
    });

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileName: any) => {
  try {
    const response = await fetch(`${baseUrl}/users/${fileName}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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

export const getOwner = async (id: any) => {
  try {
    const response = await fetch(
      `${baseUrl}/users/owner`,

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );

    if (response.status == 409) {
      throw new Error("The user already registered!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/profile`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/users/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
