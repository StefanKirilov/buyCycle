const baseUrl = 'http://localhost:5000';


export const uploadFile = async (data: any) => { 
    try {
        const response = await fetch(`${baseUrl}/upload`,
            {
                method: "POST",
                // credentials: "include",
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // body: JSON.stringify(data)
                credentials: "include",
                body: data
            }
        );

        if (response.status === 204) {
            return {};
        };

        const result = await response.json();
    
        if (!response.ok) {
            throw result;
        }
        
        return result;
        // return response;
    } catch (error) {
        console.log(error);
    }
}


  export const createBike = async (data: any) => {
    try {
        const response = await fetch(`${baseUrl}/users/order`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }

}